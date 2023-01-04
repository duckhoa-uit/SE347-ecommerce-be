const Product = require('../model/product');
const User = require('../model/user');
const Review = require('../model/review');
const getPagination = require('../helper/getPagination');
const cloudinary = require('../config/cloudinary');

const path = require('path');
const { blurhashEncode } = require('../helper/blurhash');
const review = require('../model/review');
const order = require('../model/order');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

class ProductController {
  createProduct = async (req, res) => {
    try {
      const newProduct = new Product({ ...req.body });
      const savedProduct = await newProduct.save();

      return res.json({
        data: savedProduct,
        errorCode: 0,
        message: 'Create product successfully',
      });
    } catch (error) {
      return res.json({
        data: undefined,
        errorCode: 500,
        message: error,
      });
    }
  };

  updateProduct = async (req, res) => {
    console.log('req.files', req.files, req.body);
    try {
      const object = { ...req.body };
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(updatedProduct);
      const response = {
        data: updatedProduct,
        errorCode: 0,
        message: 'Update product successfully',
      };
      return res.json(response);
    } catch (err) {
      console.log(
        '🚀 ~ file: ProductController.js:112 ~ ProductController ~ updateProduct= ~ err',
        err
      );
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  restoreProduct = async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, {
        $set: { deleted: false, deletedAt: null },
      });
      const response = {
        errorCode: 0,
        message: 'Restore successfully',
      };
      return res.json(response);
    } catch (err) {
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  deleteProduct = async (req, res) => {
    console.log('Come here', req.params.id);
    try {
      // await Product.findByIdAndUpdate(req.params.id, {
      //   $set: { deleted: true, deletedAt: Date.now() },
      // });
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: { deleted: true, deletedAt: Date.now() },
        },
        { new: true }
      );
      console.log('Come here', updatedProduct);

      const response = {
        errorCode: 0,
        message: 'The product has been put in the trash...',
      };
      return res.json(response);
    } catch (err) {
      console.log('Error', err);

      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  destroyProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      const response = {
        errorCode: 0,
        message: 'Product has been deleted...',
      };
      return res.json(response);
    } catch (err) {
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  readProduct = async (req, res) => {
    try {
      let reviews = await Review.find({
        productId: req.params.id,
        deleted: false,
      }).sort({
        createdAt: 'desc',
      });
      const promises = reviews.map(async (rv) => {
        const user = await User.findOne({ _id: rv._doc.userId });
        return user
          ? {
              ...rv._doc,
              sender: user._doc,
            }
          : rv._doc;
      });
      reviews = await Promise.all(promises);

      const product = await Product.findById(req.params.id);

      let hasBought = false;
      if (req.user) {
        const orders = await order
          .find({
            userId: req.user.id,
            deleted: false,
          })
          .sort({
            createdAt: 'desc',
          });
        const productIds = orders.reduce(
          (prev, curr) => [...prev, ...curr._doc.products.map((product) => product.productId)],
          []
        );
        if (productIds.includes(req.params.id)) hasBought = true;
      }
      const response = {
        data: { ...product._doc, reviews, hasBought },
        errorCode: 0,
        message: 'Success',
      };
      return res.json(response);
    } catch (err) {
      console.log(
        '🚀 ~ file: ProductController.js:164 ~ ProductController ~ readProduct= ~ err',
        err
      );
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };

  readAllProductCategory = async (req, res) => {
    try {
      let data;
      let filter = {};
      const { page, pageSize, minPrice, maxPrice, category, orderBy, search, inStock } = req.query;
      let condition = category
        ? {
            categories: {
              $in: [category],
            },
            price: {
              $gte: minPrice || 0,
              $lt: maxPrice || 1000,
            },
            deleted: false,
          }
        : {
            price: {
              $gte: minPrice || 0,
              $lt: maxPrice || 1000,
            },
            deleted: false,
          };
      let qSearch = {
        title: {
          $regex: new RegExp(search, 'i') || '',
        },
      };
      condition = search ? { ...condition, ...qSearch } : condition;

      if (orderBy) {
        let arraySort = orderBy.split('-');
        filter = {
          [arraySort[0]]: arraySort[1],
        };
      }

      const { limit, offset } = getPagination(page, pageSize);

      if (inStock === 'true') {
        console.log('Come here true');
        data = await Product.paginate(
          {
            ...condition,
            quantity: {
              $gte: 1,
            },
          },
          {
            offset,
            limit,
            sort: filter,
          }
        );
      } else if (inStock === 'false') {
        data = await Product.paginate(
          {
            ...condition,
            quantity: 0,
          },
          {
            offset,
            limit,
            sort: filter,
          }
        );
      } else {
        data = await Product.paginate(condition, {
          offset,
          limit,
          sort: filter,
        });
      }

      let products = data.docs;

      let pagination = {
        totalItems: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        category: category,
        pageSize: +pageSize || 3,
      };
      const response = {
        data: products,
        pagination: pagination,
        errorCode: 0,
        message: 'Success',
      };
      return res.json(response);
    } catch (err) {
      console.log(
        '🚀 ~ file: ProductController.js:232 ~ ProductController ~ readAllProductCategory= ~ err',
        err
      );
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  readAllProduct = async (req, res) => {
    try {
      let data;
      const { page, pageSize } = req.query;
      const { limit, offset } = getPagination(page, pageSize);
      data = await Product.paginate({}, { offset, limit });
      let products = data.docs;
      let pagination = {
        totalItems: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        pageSize: +pageSize || 3,
      };
      const response = {
        data: products,
        pagination: pagination,
        errorCode: 0,
        message: 'Success',
      };
      return res.json(response);
    } catch (err) {
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
}

module.exports = new ProductController();

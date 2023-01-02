const Review = require('../model/review');
const Product = require('../model/product');

class ReviewController {
  create = async (req, res) => {
    req.body = {
      ...req.body,
      userId: req.user.id,
    };
    const newReview = new Review(req.body);
    try {
      const savedReview = await newReview.save();
      const response = {
        data: savedReview,
        errorCode: 0,
        message: 'Create review successfully',
      };
      return res.json(response);
    } catch (err) {
      console.log('🚀 ~ file: ReviewController.js:20 ~ ReviewController ~ create= ~ err', err);
      const response = {
        errorCode: 500,
        message: 'Something went wrong, please try again',
      };
      return res.json(response);
    }
  };
  update = async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const response = {
        data: updatedReview,
        errorCode: 0,
        message: 'Update review successfully',
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
  delete = async (req, res) => {
    try {
      await Review.findByIdAndUpdate(req.params.id, {
        $set: { deleted: true, deletedAt: Date.now() },
      });
      const response = {
        errorCode: 0,
        message: 'The review has been put in the trash...',
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
  readAll = async (req, res) => {
    try {
      const reviews = await Review.find();
      const response = {
        data: reviews,
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

module.exports = new ReviewController();

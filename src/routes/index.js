const userRoute = require('./user');
const authRoute = require('./auth');
const cartRoute = require('./cart');
const orderRoute = require('./order');
const productRoute = require('./product');
const mediaRoute = require('./media');
const categoryRoute = require('./category');
const supplierRoute = require('./supplier');
const purchaseOrderRoute = require('./purchaseOrder');
const reviewRoute = require('./review');

const initRouter = (app) => {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/products', productRoute);
  app.use('/api/media', mediaRoute);
  app.use('/api/carts', cartRoute);
  app.use('/api/orders', orderRoute);
  app.use('/api/categories', categoryRoute);
  app.use('/api/suppliers', supplierRoute);
  app.use('/api/purchase-orders', purchaseOrderRoute);
  app.use('/api/reviews', reviewRoute);
  app.use('/', (req, res) => {
    return res.json({ status: 'OK' });
  });
};

module.exports = initRouter;

const Router = require('express');
const meaningRoutes = require('./examples/Meaning.routes');
const filterRoutes = require('./examples/Filter.routes');
const categoryRoutes = require('./examples/Category.routes');
const compilationRoutes = require('./examples/Compilation.routes');
const menuRoutes = require('./examples/Menu.routes');
const addressRoutes = require('./examples/Address.routes');
const productRoutes = require('./examples/Product.routes');
const collectionRoutes = require('./examples/Collection.routes');
const recordRoutes = require('./examples/Record.routes');

const routes = new Router();

routes.use('/meaning', meaningRoutes);
routes.use('/filter', filterRoutes);
routes.use('/category', categoryRoutes);
routes.use('/compilation', compilationRoutes);
routes.use('/menu', menuRoutes);
routes.use('/address', addressRoutes);
routes.use('/product', productRoutes);
routes.use('/collection', collectionRoutes);
routes.use('/record', recordRoutes);

module.exports = routes;
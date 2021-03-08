const Product = require('../models/product.model');

exports.getProducts = async (request) => Product.find(request.query).select('-_id -__v');

exports.getProduct = async (request) => Product.findOne({ sku: request.params.sku }).select('-_id -__v');

exports.newProduct = async (request) => {
  await new Product(request.body).save();
};

exports.deleteProducts = async (request) => ((await Product
  .deleteMany(request.query)).deletedCount > 0 ? 200 : 404);

exports.deleteProduct = async (request) => ((await Product.deleteOne({
  sku: request.params.sku,
})).deletedCount > 0 ? 200 : 404);

exports.replace = async (request) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await Product.findOneAndReplace({ sku }, product, {
    upsert: true,
  });
};

exports.update = async (request) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  return Product
    .findOneAndUpdate({ sku }, product, {
      new: true,
    })
    .select('-_id -__v');
};

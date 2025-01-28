const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
  'mongodb://localhost:27017/Products?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  
  const result = []
  try {
    result = await createdProduct.save();
  } catch (error) {
    return res.json({
      message: 'Could not store data.',
      error: error
    });
  };
  console.log(typeof createdProduct._id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;

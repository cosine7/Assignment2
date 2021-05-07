const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();
const user = require('./models/user.model');
const product = require('./models/product.model');
const router = require('./routes/routes');

app.use(BodyParser.json());
app.use('/product', router.new(product, 'sku'));
app.use('/user', router.new(user, 'ssn'));
require('dotenv').config();

(async () => {
  await Mongoose.connect(process.env.MONGODB_CONNECTION_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();

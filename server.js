const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();
const mongodbURL = require('fs');
const product = require('./routes/product.routes');
const user = require('./routes/user.routes');

app.use(BodyParser.json());
app.use(product);
app.use(user);

mongodbURL.readFile('mongodbURL.txt', (err, data) => {
  if (err) throw err;

  (async () => {
    await Mongoose.connect(data.toString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(8000);
  })();
});

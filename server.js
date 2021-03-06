const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const mongodbURL = require('fs');
const Product = require('./models/product');
const User = require('./models/user');

const app = Express();

app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
      || e.stack.includes('ValidationError')
      || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

app.get('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Product.find(request.query).select('-_id -__v'));
  });
});

app.get('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.post('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new Product(request.body).save();
    response.sendStatus(201);
  });
});

app.delete('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/products/:sku', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await doActionThatMightFailValidation(request, response, async () => {
    await Product.findOneAndReplace({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
});

app.patch('/products/:sku', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Product
      .findOneAndUpdate({ sku }, product, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
});

// User section
app.get('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.find(request.query).select('-_id -__v'));
  });
});

app.get('/users/:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.findOne({ ssn: request.params.ssn }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.post('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
});

app.delete('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteOne({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/users/:ssn', async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    await User.findOneAndReplace({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
});

app.patch('/users/:ssn', async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await User
      .findOneAndUpdate({ ssn }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
});

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

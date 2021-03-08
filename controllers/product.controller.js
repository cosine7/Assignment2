const ProductService = require('../services/product.service');

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

exports.getProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await ProductService.getProducts(request));
  });
};

exports.getProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.getProduct(request);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.newProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.newProduct(request);
    response.sendStatus(201);
  });
};

exports.deleteProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(await ProductService.deleteProducts(request));
  });
};

exports.deleteProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(await ProductService.deleteProduct(request));
  });
};

exports.replace = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.replace(request);
    response.sendStatus(200);
  });
};

exports.update = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await ProductService.update(request);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

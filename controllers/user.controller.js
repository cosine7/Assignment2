const UserService = require('../services/user.service');

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

exports.getUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await UserService.getUsers(request));
  });
};

exports.getUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await UserService.getUser(request);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.newUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await UserService.newUser(request);
    response.sendStatus(201);
  });
};

exports.deleteUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(await UserService.deleteUsers(request));
  });
};

exports.deleteUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(await UserService.deleteUser(request));
  });
};

exports.replace = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await UserService.replace(request);
    response.sendStatus(200);
  });
};

exports.update = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await UserService.update(request);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

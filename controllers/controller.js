const Service = require('../services/service');

const validation = async (request, response, action) => {
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

module.exports = class Controller {
  constructor(model, identifier) {
    this.service = new Service(model);

    this.getAll = async (request, response) => {
      await validation(request, response, async () => {
        response.json(await this.service.getAll(request.query));
      });
    };

    this.getOne = async (request, response) => {
      await validation(request, response, async () => {
        const getResult = await this.service.getOne({ [identifier]: request.params[identifier] });
        if (getResult != null) {
          response.json(getResult);
        } else {
          response.sendStatus(404);
        }
      });
    };

    this.new = async (request, response) => {
      await validation(request, response, async () => {
        await this.service.new(request.body);
        response.sendStatus(201);
      });
    };

    this.deleteAll = async (request, response) => {
      await validation(request, response, async () => {
        response.sendStatus(await this.service.deleteAll(request.query) > 0 ? 200 : 404);
      });
    };

    this.deleteOne = async (request, response) => {
      await validation(request, response, async () => {
        response.sendStatus(await this.service.deleteOne(
          { [identifier]: request.params[identifier] },
        ) > 0 ? 200 : 404);
      });
    };

    this.replace = async (request, response) => {
      await validation(request, response, async () => {
        const value = request.params[identifier];
        const content = request.body;
        content[identifier] = value;
        await this.service.replace({ [identifier]: value }, content);
        response.sendStatus(200);
      });
    };

    this.update = async (request, response) => {
      await validation(request, response, async () => {
        const value = request.params[identifier];
        const content = request.body;
        delete content[identifier];
        const patchResult = await this.service.update({ [identifier]: value }, content);
        if (patchResult != null) {
          response.json(patchResult);
        } else {
          response.sendStatus(404);
        }
      });
    };
  }
};

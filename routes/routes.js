const express = require('express');
const Controller = require('../controllers/controller');

module.exports.new = (model, identifier) => {
  const controller = new Controller(model, identifier);
  const router = express.Router();

  router.get('/', controller.getAll);
  router.get(`/:${identifier}`, controller.getOne);
  router.post('/', controller.new);
  router.delete('/', controller.deleteAll);
  router.delete(`/:${identifier}`, controller.deleteOne);
  router.put(`/:${identifier}`, controller.replace);
  router.patch(`/:${identifier}`, controller.update);

  return router;
};

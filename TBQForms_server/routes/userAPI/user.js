'use strict';

const {getUserDataController, checkValidationController} =
require('../../controllers/user.controllers');

module.exports = (fastify, opts, done) => {
  fastify.get('/api/user/getUserData', getUserDataController);
  fastify.get('/api/user/checkValidation', checkValidationController);
  done();
};

'use strict';

const {signUpController} = require('../../controllers/signUp.controller');

module.exports = (fastify, opts, done) => {
  fastify.post('/api/auth/signUp', signUpController);
  done();
};

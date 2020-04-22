'use strict';

const {signInController} = require('../../controllers/signIn.controller');

module.exports = (fastify, opts, done) => {
  fastify.post('/api/auth/signIn', signInController);
  done();
};

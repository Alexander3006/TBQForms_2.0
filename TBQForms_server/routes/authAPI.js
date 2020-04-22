'use strict';

module.exports = (fastify, opts, done) => {
  fastify.register(require('./authAPI/signIn'));
  fastify.register(require('./authAPI/signUp'));
  done();
};

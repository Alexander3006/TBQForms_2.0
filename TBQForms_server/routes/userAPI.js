'use strict';

module.exports = (fastify, opts, done) => {
  fastify.register(require('./userAPI/user'));
  done();
};

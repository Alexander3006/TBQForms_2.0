'use strict';

module.exports = (fastify, opts, done) => {
  fastify.register(require('./formAPI/qForm'));
  fastify.register(require('./formAPI/aForm'));
  done();
};

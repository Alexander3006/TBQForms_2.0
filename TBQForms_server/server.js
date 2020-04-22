'use strict';

const fastify = require('fastify')({logger: true});
const cors = require('fastify-cors');

require('dotenv').config();

// for test
fastify.register(cors, {
  origin: '*',
  methods: ['POST', 'GET'],
});

fastify.register(require('./routes/authAPI'));
fastify.register(require('./routes/userAPI'));
fastify.register(require('./routes/formAPI'));

fastify.listen(process.env.PORT, process.env.HOST, (err, address) => {
  if (err) console.dir(err);
  else console.dir(address);
});

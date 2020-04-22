'use strict';
const {createFormController, deleteFormController, getUserFormsController, getFormController} =
require('../../controllers/qForm.controllers');

module.exports = (fastify, opts, done) => {
  fastify.post('/api/form/createForm', createFormController);
  fastify.get('/api/form/deleteForm/:formId', deleteFormController);
  fastify.get('/api/form/getUserForms', getUserFormsController);
  fastify.get('/api/form/getForm/:formId', getFormController);
  done();
};

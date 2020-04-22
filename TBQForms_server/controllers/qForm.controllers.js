'use string';

const {validateToken} = require('../services/token.service');
const {writeQuestionForm, deleteQuestionForm, getUserForms, getFormById} =
require('../services/qForm.service');

const notExist = {
  success: false,
  message: 'Token does not exist',
};

const notValid = {
  success: false,
  message: 'The token is not valid',
};

module.exports = {
  createFormController: async (request, response) => {
    const token = request.headers['x-access-token'];
    const qForm = request.body;
    if (token) {
      const {success, decode} = await validateToken(token);
      if (success) {
        const feedback = await writeQuestionForm(qForm, decode.email);
        response.send(feedback);
      } else {
        response.send(notValid);
      }
    } else {
      response.send(notExist);
    }
  },


  deleteFormController: async (request, response) => {
    const token = request.headers['x-access-token'];
    const {formId} = request.params;
    if (token) {
      const {success, decode} = await validateToken(token);
      if (success) {
        const {email} = decode;
        const feedback = await deleteQuestionForm(formId, email);
        response.send(feedback);
      } else {
        response.send(notValid);
      }
    } else {
      response.send(notExist);
    }
  },

  getUserFormsController: async (request, response) => {
    const token = request.headers['x-access-token'];
    if (token) {
      const {success, decode} = await validateToken(token);
      if (success) {
        const forms = await getUserForms(decode);
        response.send({
          success: true,
          forms,
        });
      } else {
        response.send(notValid);
      }
    } else {
      response.send(notExist);
    }
  },

  getFormController: async (request, response) => {
    const token = request.headers['x-access-token'];
    let {success, decode} = await validateToken(token);
    if (!success) decode = {email: ''};
    const {formId} = request.params;
    const {access, qForm} = await getFormById(formId, decode);
    if (access) {
      response.send({
        success: true,
        data: qForm,
      });
    } else {
      response.send({
        success: false,
        message: 'The form does not exist or you do not have access',
      });
    }
  },
};

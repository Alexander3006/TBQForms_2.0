'use strict';

const {validateToken} = require('../services/token.service');
const {getUserData} = require('../services/user.service');

const notExist = {
  success: false,
  message: 'Token does not exist',
};

const notValid = {
  success: false,
  message: 'The token is not valid',
};

module.exports = {

  getUserDataController: async (request, response) => {
    const token = request.headers['x-access-token'];
    if (token) {
      const {success, decode} = await validateToken(token);
      if (success) {
        const userData = await getUserData(decode);
        response.send({
          success: true,
          data: userData,
        });
      } else {
        response.send(notValid);
      }
    } else {
      response.send(notExist);
    }
  },

  checkValidationController: async (request, response) => {
    const token = request.headers['x-access-token'];
    if (token) {
      const {success} = await validateToken(token);
      if (success) {
        response.send({
          success: true,
          message: '',
        });
      } else {
        response.send(notValid);
      }
    } else {
      response.send(notExist);
    }
  },
};

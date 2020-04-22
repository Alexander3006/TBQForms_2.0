'use strict';

const {createAccessToken, validateUserPassword} = require('../services/token.service');

module.exports = {
  signInController: async (request, response) => {
    const {email, password} = request.body;
    const passwordValid = await validateUserPassword(email, password);
    if (passwordValid) {
      const token = await createAccessToken(email);
      if (token) {
        response.send({
          success: true,
          message: 'Signed in to your account',
          token,
        });
      } else {
        response.send({
          success: false,
          message: 'Failed to create token',
        });
      }
    } else {
      response.send({
        success: false,
        message: 'Wrong email or password',
      });
    }
  },
};

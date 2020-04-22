'use strict';

const {createUser, validateUserForm} = require('../services/user.service');

module.exports = {
  signUpController: async (request, response) => {
    const {body: userForm} = request;
    try {
      const {isValid, feedback} = await validateUserForm(userForm);
      if (isValid) {
        await createUser(userForm);
        response.send({
          success: true,
          message: 'Congratulations, you have been registered',
          errors: {},
        });
      } else {
        response.send({
          success: false,
          message: 'Registration failed',
          errors: feedback,
        });
      }
    } catch (err) {
      response.send({
        success: false,
        message: 'Error',
        errors: err,
      });
    }
  },
};

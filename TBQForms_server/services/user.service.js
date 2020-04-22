'use strict';

const {createUser, checkUniqueEmail, getUserDataById} = require('../repositories/user.repository');
const {generateSalt, getHash, validateSignUpForm} = require('../logic/authorization');

module.exports = {

  createUser: async (userForm) => {
    userForm.salt = generateSalt();
    userForm.password = getHash(userForm.password, userForm.salt);
    await createUser(userForm);
    return;
  },

  validateUserForm: async (userForm) => {
    const emailUnique = await checkUniqueEmail(userForm.email);
    const feedback = Object.assign({}, validateSignUpForm(userForm), {emailUnique});
    const isValid = Object.values(feedback)
        .reduce((acc, cur) => acc && cur, true);
    return {isValid, feedback};
  },

  getUserData: async (decode) => {
    const {userId} = decode;
    const userData = await getUserDataById(userId);
    return userData;
  },
};

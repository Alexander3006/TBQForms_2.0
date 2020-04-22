'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const self = module.exports = {

  generateSalt: () => {
    return crypto.randomBytes(8).toString('hex');
  },

  getHash: (password, salt) => {
    return crypto.createHash('sha256')
        .update(password + salt)
        .digest('hex');
  },

  validateSignUpForm: (form) => {
    const {email, password, name, surname, age, phoneNumber} = form;
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return {
      validEmail: emailRegEx.test(email),
      validPassword: password.length >= 6,
      validName: name.length > 0,
      validSurname: surname.length > 0,
      validAge: age >= 16 && age < 150,
      validPhoneNumber: phoneRegEx.test(phoneNumber),
    };
  },

  generateToken: (userData) => {
    return jwt.sign(userData, process.env.SECRET_KEY);
  },

  validatePassword: (password, hash, salt) => {
    const userHash = self.getHash(password, salt);
    return userHash === hash;
  },

  decodeToken: (token, callback) => {
    jwt.verify(token, process.env.SECRET_KEY, callback);
  },
};

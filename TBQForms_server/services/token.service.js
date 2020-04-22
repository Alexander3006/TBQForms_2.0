'use strict';

const {getDataForToken, getPassword} = require('../repositories/token.repository');
const {validatePassword, generateToken, decodeToken} = require('../logic/authorization');

module.exports = {
  createAccessToken: async (email) => {
    const userData = await getDataForToken(email);
    const token = generateToken(userData);
    return token;
  },

  validateUserPassword: async (email, password) => {
    const data = await getPassword(email);
    if (data) {
      const {password: hash, salt} = data;
      const isValid = validatePassword(password, hash, salt);
      return isValid;
    } else {
      return false;
    }
  },

  validateToken: async (token) => {
    const errorMessage = {
      success: false,
      decode: {},
    };
    return new Promise((resolve, reject)=>
      decodeToken(token, async (err, decode) => {
        if (err) {
          resolve(errorMessage);
        } else {
          resolve({
            success: true,
            decode,
          });
        }
      }),
    );
  },


};

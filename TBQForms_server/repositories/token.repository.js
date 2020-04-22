'use strict';

const db = require('../config/db.config');

module.exports = {
  getDataForToken: async (email) => {
    const sql = `SELECT 
        RTRIM("email") as "email",
        "userId",
        RTRIM("userName") as "userName",
        RTRIM("surname") as "surname",
        "phoneNumber"
        FROM "Users" 
        WHERE "email"=$1`;
    const {rows} = await db.query(sql, [email]);
    return rows[0];
  },

  getPassword: async (email) => {
    const sql = `SELECT "password",
        "salt" 
        FROM "Authentication" WHERE "email"=$1`;
    const {rows} = await db.query(sql, [email]);
    return rows[0];
  },
};

'use strict';

const db = require('../config/db.config');

module.exports = {
  createUser: async (userObject) => {
    const {email, password, salt, name, surname, age, phoneNumber} = userObject;
    const sql = `INSERT INTO "Users" ("email", "userName", "surname", "age", "phoneNumber") 
    VALUES ($1, $2, $3, $4, $5)`;
    const sqlPassword = `INSERT INTO "Authentication" ("email", "password", "salt")
    VALUES ($1, $2, $3);`;
    try {
      await db.query(sql, [email, name, surname, age, phoneNumber]);
      await db.query(sqlPassword, [email, password, salt]);
    } catch (err) {
      console.dir(err);
    }
  },

  checkUniqueEmail: async (email) => {
    const sql = 'SELECT * from "Users" WHERE "email"=$1';
    const {rows} = await db.query(sql, [email]);
    return rows.length == 0;
  },

  getUserDataByEmail: async (email) => {
    const sql = `SELECT 
    RTRIM("userName") as "userName", 
    RTRIM("surname") as "surname", 
    "age", 
    RTRIM("phoneNumber") as "phoneNumber", 
    RTRIM("status") as "status"  
    FROM "Users" WHERE "email"=$1`;
    const {rows} = await db.query(sql, [email]);
    return rows[0];
  },

  getUserDataById: async (id) => {
    const sql = `SELECT 
    RTRIM("userName") as "userName", 
    RTRIM("surname") as "surname", 
    "age", 
    RTRIM("phoneNumber") as "phoneNumber", 
    RTRIM("status") as "status"  
    FROM "Users" WHERE "userId"=$1`;
    const {rows} = await db.query(sql, [id]);
    return rows[0];
  },
};

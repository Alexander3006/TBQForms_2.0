'use strict';

const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
(async () => {
  await pool.query(await require('fs').promises
  .readFile('./init_database/TBQForms.sql', 'utf-8'));
  console.dir(await require('fs').promises
  .readFile('./init_database/TBQForms.sql', 'utf-8'))
})();

module.exports = pool;

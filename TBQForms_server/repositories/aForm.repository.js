'use strict';

const db = require('../config/db.config');

module.exports = {

  writeAnswerForm: async (questionFormId, email = null) => {
    const sql = `INSERT INTO "AnswerForms" ("email", "qFormId")
        VALUES($1, $2) RETURNING "aFormId"`;
    const {rows} = await db.query(sql, [email, questionFormId]);
    return rows[0].aFormId;
  },

  writeAnswer: async (aFormId, questionId, pAnswerId = null, answerText = null) => {
    const sql = `INSERT INTO "UserAnswers" ("aFormId", "questionId", "pAnswerId", "answerText")
        VALUES($1, $2, $3, $4)`;
    await db.query(sql, [aFormId, questionId, pAnswerId, answerText]);
    return;
  },

  deleteAnswerForm: async (aFormId) => {
    const sql = `DELETE FROM "AnswerForms" WHERE "aFormId" = $1`;
    await db.query(sql, [aFormId]);
    return;
  },

  getPossibleAnswerStatics: async (pAnswerId, questionId) => {
    const sql = `SELECT "pAnswerId",
    "questionId",
    COUNT(*)::INTEGER as "numberOfAnswer"
    FROM "UserAnswers"
    WHERE "pAnswerId" = $1 
    GROUP BY "pAnswerId", "questionId"`;
    const {rows} = await db.query(sql, [pAnswerId]);
    const data = rows[0];
    if (data) {
      return rows[0];
    } else {
      return {
        questionId,
        pAnswerId,
        numberOfAnswer: 0,
      };
    }
  },

  getAllOpenAnswer: async (questionId) => {
    const sql = `SELECT "answerText"
    FROM "UserAnswers" 
    WHERE "questionId" = $1`;
    const {rows} = await db.query(sql, [questionId]);
    return {
      questionId,
      answers: rows,
    };
  },
};

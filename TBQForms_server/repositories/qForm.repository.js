'use strict';

const db = require('../config/db.config');

module.exports = {
  writeQuestionForm: async (email, accessType, formName, formAbout, allowedUsers = null) => {
    const sql = `INSERT INTO "QuestionForms" 
          ("email", "accessType", "allowedUsers", "formName", "formAbout")
          VALUES ($1, $2, $3, $4, $5) RETURNING "qFormId"`;
    const {rows} = await db.query(sql, [email, accessType, allowedUsers, formName, formAbout]);
    return rows[0].qFormId;
  },

  writeQuestion: async (qFormId, questionType, questionText, allowShowResult) => {
    const sql = `INSERT INTO "Questions" 
      ("qFormId", "questionType", "questionText", "allowShowResult")
      VALUES ($1, $2, $3, $4) RETURNING "questionId"`;
    const {rows} = await db.query(sql, [qFormId, questionType, questionText, allowShowResult]);
    return rows[0].questionId;
  },

  writePossibleAnswer: async (questionId, answerText, author = null) => {
    const sql = `INSERT INTO "PossibleAnswers" ("questionId", "author", "pAnswerText")
        VALUES ($1, $2,  $3)`;
    await db.query(sql, [questionId, author, answerText]);
    return;
  },

  deleteForm: async (qFormId) => {
    const sql = `DELETE FROM "QuestionForms" WHERE "qFormId"=$1`;
    await db.query(sql, [qFormId]);
    return;
  },

  getQuestionForm: async (qFormId) => {
    const sql = `SELECT RTRIM("email") as "email",
      RTRIM("accessType") as "accessType",
      "allowedUsers",
      RTRIM("formName") as "formName",
      "formAbout"
      FROM "QuestionForms"
      WHERE "qFormId" = $1`;
    const {rows} = await db.query(sql, [qFormId]);
    return rows[0];
  },

  getQuestions: async (qFormId) => {
    const sql = `SELECT "questionId",
      RTRIM("questionType") as "questionType",
      "questionText", 
      "allowShowResult"
      from "Questions"
      WHERE "qFormId" = $1`;
    const {rows: questions} = await db.query(sql, [qFormId]);
    return questions;
  },

  getPossibleAnswers: async (questionId) => {
    const sql = `SELECT RTRIM("author") as "author",
      "pAnswerId",
      "pAnswerText" from "PossibleAnswers"
      WHERE "questionId" = $1`;
    const {rows: possibleAnswers} = await db.query(sql, [questionId]);
    return possibleAnswers;
  },

  getQuestion: async (questionId) => {
    const sql = `SELECT "questionId",
    RTRIM("questionType") as "questionType",
    "questionText", 
    "allowShowResult"
    from "Questions"
    WHERE "questionId" = $1`;
    const {rows} = await db.query(sql, [questionId]);
    return rows[0];
  },

  getUserFormsByEmail: async (email) => {
    const sql = `SELECT 
      RTRIM("formName") as "formName",
      RTRIM("formAbout") as "formAbout",
      "qFormId"
      FROM "QuestionForms"
      WHERE "email" = $1`;
    const {rows} = await db.query(sql, [email]);
    return rows;
  },
};


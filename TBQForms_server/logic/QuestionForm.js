'use strict';

const LimitedForm = require('./qForm/LimitedForm');
const OpenForm = require('./qForm/OpenForm');

module.exports = class QuestionForm {
  static createQuestionForm(questionForm) {
    const {accessType} = questionForm;
    if (accessType === 'open') {
      return new OpenForm(questionForm);
    };
    if (accessType === 'limited') {
      return new LimitedForm(questionForm);
    }
  }


  static validateQuestionForm(questionForm) {
    const {accessType, allowedUsers, questions} = questionForm;
    const feedback = {
      formAccessType: !!accessType,
      formAllowedUsers: Array.isArray(allowedUsers) || allowedUsers === null,
      questions: (() => {
        const questionIsArray = Array.isArray(questions);
        return questionIsArray?questions
            .reduce((acc, question)=>{
              const {qType, qText, answers, allowShowResult} = question;
              const isBool = typeof allowShowResult === 'boolean';
              return !!qType && !!qText && !! Array.isArray(answers) && isBool && acc;
            }, true):false;
      })(),
    };
    const isValid = Object.values(feedback)
        .reduce((acc, cur) => acc && cur, true);
    return {isValid, feedback};
  }
};

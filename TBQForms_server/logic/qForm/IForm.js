'use strict';

const QuestionFactory = require('../Questions/QuestionFactory');

module.exports = class IForm {
  constructor(qForm) {
    const {email, accessType, allowedUsers, formName, formAbout} =
        qForm;
    this.formName = formName;
    this.formAbout = formAbout;
    this.accessType = accessType;
    this.email = email;
    this.allowedUsers = allowedUsers;
    this.questions = [];
  }

  checkAccess() {
    throw Error(`This is abstarct method`);
  }

  checkAccessToAnswers(email) {
    return email === this.email;
  }

  addQuestion(question_data) {
    const question = QuestionFactory.createQuestion(question_data);
    this.questions.push(question);
    return question;
  }

  validateAnswerForm(answers) {
    const feedback = this.questions.reduce((acc, question) => {
      const answer = answers.find((answer) => {
        return question.questionId === answer.questionId;
      });
      if (answer) {
        const isValid = question.validateAnswer(answer);
        return acc && isValid;
      } else return false;
    }, true);
    if (feedback) {
      return feedback && this.questions.length === answers.length;
    } else {
      return false;
    }
  }
};

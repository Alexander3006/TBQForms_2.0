'use strict';

module.exports = class IQuestion {
  constructor(question) {
    const {questionId, questionType, questionText,
      allowShowResult} = question;
    this.questionId = questionId;
    this.questionType = questionType;
    this.questionText = questionText;
    this.allowShowResult = allowShowResult;
  }

  addAnswer() {
    throw new Error('This is abstract method');
  }

  validateAnswer() {
    throw new Error('This is abstract method');
  }

  checkAccessToAnswers() {
    return false;
  }
};

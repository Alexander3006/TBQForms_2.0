'use strict';

const IQuestion = require('./IQuestion');
const Answer = require('../Answer/Answer');

module.exports = class OneOfManyQuestion extends IQuestion {
  constructor(question) {
    super(question);
    this.answers = [];
  }

  addAnswer(answer) {
    const possibleAnswer = new Answer(answer);
    this.answers.push(possibleAnswer);
    return;
  }

  validateAnswer(answer) {
    const {possibleAnswerId} = answer;
    if (possibleAnswerId) {
      const validIds = this.answers.map((answer) => answer.pAnswerId);
      return validIds.includes(possibleAnswerId);
    } else {
      return false;
    }
  }


  checkAccessToAnswers() {
    return this.allowShowResult;
  }
};

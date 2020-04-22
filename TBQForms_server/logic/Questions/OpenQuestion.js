'use strict';

const IQuestion = require('./IQuestion');

module.exports = class OpenQuestion extends IQuestion {
  constructor(question) {
    super(question);
  }

  addAnswer() {
    return true;
  }

  validateAnswer(answer) {
    const {answerText} = answer;
    if (answerText) {
      return answerText.length > 0;
    } else {
      return false;
    }
  }
};

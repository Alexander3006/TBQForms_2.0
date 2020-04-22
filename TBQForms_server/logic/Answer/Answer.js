'use strict';

module.exports = class Answer {
  constructor(answer) {
    const {author, pAnswerId, pAnswerText} = answer;
    this.author = author;
    this.pAnswerId = pAnswerId;
    this.pAnswerText = pAnswerText;
  }
};

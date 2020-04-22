'use strict';

const OneOfManyQuestion = require('./OneOfManyQuestion');
const OpenQuestion = require('./OpenQuestion');

module.exports = class QuestionFactory {
  static createQuestion(question) {
    const {questionType} = question;
    if (questionType === 'Open') {
      return new OpenQuestion(question);
    } else if (questionType === 'OneOfMany') {
      return new OneOfManyQuestion(question);
    } else {
      throw new Error('This type of question does not exist');
    }
  }
};

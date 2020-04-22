'use strict';

const {writeAnswerFormController, getAnswerStatisticsController,
  getAllAnswersStatisticsController} =
require('../../controllers/aForm.controller');

module.exports = (fastify, opts, done) => {
  fastify.post('/api/form/writeAnswerForm/:formId', writeAnswerFormController);
  fastify.get('/api/form/getAnswerStatistics/:questionId', getAnswerStatisticsController);
  fastify.get('/api/form/getAllAnswersStatistics/:formId', getAllAnswersStatisticsController);
  done();
};

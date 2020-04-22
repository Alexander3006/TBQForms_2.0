'use strict';

const {writeAnswerForm, getAnswerStatistics, getAllAnswersInForm} = require('../services/aForm.service');
const {validateToken} = require('../services/token.service');

module.exports = {
  writeAnswerFormController: async (request, response) => {
    const token = request.headers['x-access-token'];
    let {success, decode} = await validateToken(token);
    if (!success) decode = {email: ''};
    const {answers} = request.body;
    const {formId} = request.params;
    const feedback = await writeAnswerForm(formId, decode, answers);
    response.send(feedback);
  },

  getAnswerStatisticsController: async (request, response) => {
    const {questionId} = request.params;
    const statistics = await getAnswerStatistics(questionId);
    response.send(statistics);
  },

  getAllAnswersStatisticsController: async (request, response) => {
    const token = request.headers['x-access-token'];
    const {formId} = request.params;
    if (token) {
      const {success, decode} = await validateToken(token);
      if (success) {
        const aFormStatistics = await getAllAnswersInForm(formId, decode);
        response.send(aFormStatistics);
      } else {
        response.send({
          success: false,
          message: 'Not enough permissions to view answers',
        });
      }
    } else {
      response.send({
        success: false,
        message: 'Not enough permissions to view answers',
      });
    }
  },
};

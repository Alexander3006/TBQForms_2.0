'use strict';

const {getFormById} = require('./qForm.service');
const {writeAnswerForm, writeAnswer, deleteAnswerForm,
  getPossibleAnswerStatics, getAllOpenAnswer} =
require('../repositories/aForm.repository');
const {getPossibleAnswers, getQuestion} =
require('../repositories/qForm.repository');
const QuestionFactory = require('../logic/Questions/QuestionFactory');

module.exports = {

  writeAnswerForm: async (formId, decode, answerForm) => {
    const {email} = decode;
    const {access, qForm} = await getFormById(formId, decode);
    if (access) {
      const valid = qForm.validateAnswerForm(answerForm);
      if (valid) {
        const aFormId = await writeAnswerForm(formId, email);
        return await Promise.all(answerForm.map((answer)=> {
          const {questionId, possibleAnswerId, answerText} = answer;
          return writeAnswer(aFormId, questionId, possibleAnswerId, answerText);
        })).then(()=> {
          return {
            success: true,
            message: 'Answers are recorded',
          };
        }).catch(async (err) => {
          console.dir(err);
          await deleteAnswerForm(aFormId);
          return {
            success: false,
            message: 'Error recording responses',
          };
        });
      } else {
        return {
          success: false,
          message: 'The answer form is not valid',
        };
      }
    } else {
      return {
        success: false,
        message: 'Not enough permissions to access the form',
      };
    }
  },


  getAnswerStatistics: async (questionId) => {
    const question_data = await getQuestion(questionId);
    if (question_data) {
      const question = QuestionFactory.createQuestion(question_data);
      const access = question.checkAccessToAnswers();
      if (access) {
        const answers = await getPossibleAnswers(questionId);
        const statistics = await Promise.all(answers.map((answer) => {
          const {pAnswerId} = answer;
          return getPossibleAnswerStatics(pAnswerId, questionId);
        }));
        return {
          success: true,
          statistics,
        };
      } else {
        return {
          success: false,
          message: 'Not enough permissions to view answers',
        };
      }
    } else {
      return {
        success: false,
        message: 'There is no question',
      };
    }
  },


  getAllAnswersInForm: async (formId, decode) => {
    const {email} = decode;
    const {qForm} = await getFormById(formId, decode);
    const access = qForm.checkAccessToAnswers(email);
    if (access) {
      const allAnswers = await Promise.all(qForm.questions.reduce((acc, question) => {
        if (question.answers) {
          const answersStatistics = question.answers.map((answer) => {
            return getPossibleAnswerStatics(answer.pAnswerId, question.questionId);
          });
          return [...acc, ...answersStatistics];
        } else {
          return [...acc, getAllOpenAnswer(question.questionId)];
        }
      }, []),
      );

      const question = Array.from(qForm.questions)
      const aFormStatistics = question.map(question => {
        const answerStatistics = allAnswers.filter(answer => answer.questionId === question.questionId)
        return Object.assign({}, question, {answerStatistics})
      }) 
      
      return {
        success: true,
        formName: qForm.formName,
        formAbout: qForm.formAbout,
        aFormStatistics,
      };
    } else {
      return {
        success: false,
        message: 'Not enough permissions to view answers',
      };
    }
  },

};

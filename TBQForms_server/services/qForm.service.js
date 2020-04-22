'use strict';

const {validateQuestionForm, createQuestionForm} = require('../logic/QuestionForm');
const {writeQuestionForm, writeQuestion, writePossibleAnswer,
  deleteForm, getQuestionForm, getUserFormsByEmail, getQuestions,
  getPossibleAnswers} =
require('../repositories/qForm.repository');

module.exports = {
  writeQuestionForm: async (questionForm, email) => {
    const {isValid, feedback} = validateQuestionForm(questionForm);
    if (isValid) {
      const {accessType, allowedUsers, formName, formAbout, questions} = questionForm;
      const qFormId = await writeQuestionForm(email, accessType, formName, formAbout, allowedUsers);
      return await Promise.all(questions.map((question)=>{
        const {qType, qText, allowShowResult} = question;
        return writeQuestion(qFormId, qType, qText, allowShowResult);
      }))
          .then((questionIds)=>{
            const allAnswers = questionIds.map((questionId, index)=> {
              const {answers} = questions[index];
              answers.map((answer) => {
                const {aText} = answer;
                return writePossibleAnswer(questionId, aText);
              });
            });
            return Promise.all(allAnswers);
          })
          .then(()=>{
            return ({
              success: true,
              message: 'Survey form created successfully',
            });
          })
          .catch(async (err) => {
            await deleteForm(qFormId);
            return ({
              success: false,
              message: 'Survey form not created',
            });
          });
    } else {
      return {
        success: false,
        message: 'The form is not valid',
        errors: feedback,
      };
    }
  },

  deleteQuestionForm: async (qFormId, email) => {
    try {
      const {email: author} = await getQuestionForm(qFormId);
      if (email === author) {
        await deleteForm(qFormId);
        return {
          success: true,
          message: 'The form has been deleted',
        };
      } else {
        return {
          success: false,
          message: 'You do not have permissions',
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Uninstallation failed form',
      };
    }
  },

  getUserForms: async (decode) => {
    const {email} = decode;
    const forms = await getUserFormsByEmail(email);
    return forms;
  },

  getFormById: async (formId, decode) => {
    const {email} = decode;
    const qForm_data = await getQuestionForm(formId);
    const qForm = createQuestionForm(qForm_data);
    const access = qForm.checkAccess(email);
    if (access) {
      const questions_data = await getQuestions(formId);
      const questions = questions_data.map((question) => {
        return qForm.addQuestion(question);
      });
      const answers_data = await Promise.all(questions
          .map((question)=>getPossibleAnswers(question.questionId),
          ));
      questions.map((question, index) => {
        answers_data[index]
            .map((answer) => question.addAnswer(answer));
      });
      return {
        access: true,
        qForm,
      };
    } else {
      return {
        access: false,
        qForm: {},
      };
    }
  },
};

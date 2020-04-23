'use strict';

import {Answer} from './Answer';
import {OpenAnswer} from './OpenAnswer';
import {OneOfManyAnswer} from './OneOfManyAnswer';
import {QuestionResponse} from './serverResponseInterfaces/QuestionResponse';
import {AnswerResponse} from './serverResponseInterfaces/AnswerResponse';
import {QuestionFormResponse} from './serverResponseInterfaces/FormResponse';


const QuestionTypes: {[index:string]:Function} = {
  'Open': (id: number, questionText:string)=> new OpenAnswer(id, questionText),
  'OneOfMany': (id: number, questionText:string, answers: Array<AnswerResponse>, allowShowResult: boolean) => {
    return new OneOfManyAnswer(id, questionText, answers, allowShowResult);
  },
};

export class AnswerForm {
    public formName: string;
    public formAbout: string;
    private answers: Array<Answer>;
    private formId: number;

    constructor(formId: number, questionForm:QuestionFormResponse) {
      this.formId = formId;
      const {formName, formAbout, questions} = questionForm;
      this.formName = formName;
      this.formAbout = formAbout;
      this.answers = [];
      questions.map((question) => {
        this.addAnswer(question);
      });
    }

    private addAnswer(question: QuestionResponse):Answer {
      const {questionId, questionType, questionText, answers, allowShowResult} = question;
      if (QuestionTypes.hasOwnProperty(questionType)) {
        const answer = QuestionTypes[questionType](questionId, questionText, answers, allowShowResult);
        this.answers.push(answer);
        return answer;
      } else {
        throw new Error('This type of question is not supported');
      }
    }

    public getAnswerForm():Object {
      const answers = this.answers.map((answer) => {
        return answer.getAnswer();
      });
      return {
        formId: this.formId,
        answers,
      };
    }
}

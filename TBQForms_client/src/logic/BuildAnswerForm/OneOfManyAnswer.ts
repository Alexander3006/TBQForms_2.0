'use strict';

import {Answer} from './Answer';
import {AnswerResponse} from './serverResponseInterfaces/AnswerResponse';

export class OneOfManyAnswer extends Answer {
    protected possibleAnswerId: number;
    protected answerText: string;
    protected allowShowResult: boolean;
    private possibleAnswers: Array<AnswerResponse>;

    constructor(questionId: number, questionText:string, answers:Array<AnswerResponse>, allowShowResult: boolean) {
      super(questionId, questionText, 'OneOfMany');
      this.possibleAnswerId = -1;
      this.answerText = '';
      this.possibleAnswers = answers;
      this.allowShowResult = allowShowResult;
    }

    public setAnswerText(text: string): void {
      throw new Error('You can not give your answer, choose one of many');
    }

    public setAnswerId(id: number): void {
      const isValidAnswer = this.possibleAnswers
          .map((answer)=> answer.pAnswerId)
          .includes(id);
      if (isValidAnswer) {
        this.possibleAnswerId = id;
      } else {
        throw Error('There is no such answer');
      }
    }

    public getAnswer(): void | Object {
      if (this.possibleAnswerId !== -1) {
        return {
          questionId: this.questionId,
          possibleAnswerId: this.possibleAnswerId,
        };
      } else {
        throw new Error('You did not answer the question');
      }
    }
}

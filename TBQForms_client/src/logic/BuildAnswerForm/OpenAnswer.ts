'use strict';

import {Answer} from './Answer';

export class OpenAnswer extends Answer {
    protected possibleAnswerId: null;
    protected answerText: string;

    constructor(questionId: number, questionText:string) {
      super(questionId, questionText, 'Open');
      this.possibleAnswerId = null;
      this.answerText = '';
    }

    public setAnswerId(id: number): void {
      throw new Error('Unable to select answer option in open question');
    }

    public setAnswerText(text: string): void {
      this.answerText = text;
    }

    public getAnswer(): void | Object {
      if (this.answerText.length > 1) {
        return {
          questionId: this.questionId,
          answerText: this.answerText,
        };
      } else {
        throw new Error('You did not answer the question');
      }
    }
}

'use strict';

import {Question} from './Question';
import {IAnswer} from './interfaces/IAnswer';
import {Answer} from './Answer';

export class QuestionOneOfMany extends Question {
    protected qType: string = 'OneOfMany';
    constructor() {
      super();
    }

    public addAnswer(): IAnswer {
      const answer = new Answer();
      this.answers.push(answer);
      return answer;
    }

    public deleteAnswer(answer: IAnswer): null {
      const index = this.answers.indexOf(answer);
      if(index > -1) {
        this.answers.splice(index, 1)
      }
      return null;
    }

  }


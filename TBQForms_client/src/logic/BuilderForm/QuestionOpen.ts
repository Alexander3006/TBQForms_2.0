'use strict';

import {Question} from './Question';


export class QuestionOpen extends Question {
    protected qType: string = 'Open';
    constructor() {
      super();
    }

    addAnswer(): null {
      throw new Error(`This type of question does not
        support ready-made answers`);
      return null;
    }

    deleteAnswer() : Error {
      return new Error ('No answers');
    } 
}

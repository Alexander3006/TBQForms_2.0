'use strict';

import {IQuestion} from './interfaces/IQuestion';
import {IAnswer} from './interfaces/IAnswer';

export abstract class Question implements IQuestion {
    qText: string;
    answers: Array<IAnswer>;
    private allowShowResult: boolean;

    protected abstract qType: string;
    public abstract addAnswer(): IAnswer | null;
    public abstract deleteAnswer(answer: IAnswer): Error | null; 

    constructor() {
      this.qText = '';
      this.answers = [];
      this.allowShowResult = false;
    }

    public changeText(qText: string):void {
      this.qText = qText;
      return;
    }

    public changeShowResult(flag: boolean):void {
      this.allowShowResult = flag;
      return;
    }
}


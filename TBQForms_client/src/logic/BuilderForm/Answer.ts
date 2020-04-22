'use strict';

import {IAnswer} from './interfaces/IAnswer';

export class Answer implements IAnswer {
    aText: string;

    constructor() {
      this.aText = '';
    }

    public changeText(aText: string):void {
      this.aText = aText;
      return;
    }
}

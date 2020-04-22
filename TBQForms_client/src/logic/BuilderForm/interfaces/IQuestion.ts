'use strict';

import {IAnswer} from './IAnswer';

export interface IQuestion {
    qText: string;
    answers: Array<IAnswer>;

    addAnswer(): IAnswer | null;
    deleteAnswer(answer?: IAnswer): Error | null;
    changeText(qText: string): void;
  }

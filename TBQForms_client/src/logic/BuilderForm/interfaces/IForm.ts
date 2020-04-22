'use strict';

import {IQuestion} from './IQuestion';

export interface IForm {
    formName: string;
    formAbout: string;
    accessType: string;
    allowedUsers: Array<string> | null;

    questions: Array<IQuestion>;

    addQuestion(qType: string): IQuestion;
    deleteQuestion(question: IQuestion):void;

    changeFormName(fText: string): void;
    changeFormAbout(fText: string): void;
    changeAccessType(fAccessType: string): void;
    addAllowedUser(allowedEmail: string): void;
    deleteAllowedUser(email: string): void;
  }

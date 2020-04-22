'use strict';

import {IForm} from './interfaces/IForm';
import {IQuestion} from './interfaces/IQuestion';
import {QuestionOneOfMany} from './QuestionOneOfMany';
import {QuestionOpen} from './QuestionOpen';

export class Form implements IForm {
    formName:string;
    formAbout: string;
    accessType: string;
    allowedUsers: Array<string> | null;
    questions: Array<IQuestion>;

    constructor() {
      this.formName = 'New Form';
      this.formAbout = 'About Form';
      this.accessType = 'open';
      this.questions = [];
      this.allowedUsers = null;
    }

    public addQuestion(questionType:string): IQuestion {
      let question;
      if (questionType === 'Open') {
        question = new QuestionOpen();
      } else if (questionType == 'OneOfMany') {
        question = new QuestionOneOfMany();
      }
      if (question) {
        this.questions.push(question);
      } else {
        throw new Error('Nonexistent question type');
      }
      return question;
    }

    public deleteQuestion(question:IQuestion): void {
      const index = this.questions.indexOf(question);
      if (index > -1) {
        this.questions.splice(index, 1);
      }
      return;
    }

    public changeFormName(fName:string):void {
      this.formName = fName;
      return;
    }

    public changeFormAbout(fAbout: string):void {
      this.formAbout = fAbout;
      return;
    }

    public changeAccessType(fAccessType: string):void {
      if (fAccessType == 'limited') {
        this.accessType = fAccessType;
        this.allowedUsers = [];
      }
      if (fAccessType == 'open') {
        this.accessType = fAccessType;
        this.allowedUsers = null;
      }
      return;
    }

    public addAllowedUser(email: string):void {
      if (this.allowedUsers) {
        this.allowedUsers.push(email);
      }
    }

    public deleteAllowedUser(email: string): void {
      if (this.allowedUsers) {
        const index = this.allowedUsers.indexOf(email);
        if (index > -1) {
          this.allowedUsers.splice(index, 1);
        }
      }
      return;
    }
}

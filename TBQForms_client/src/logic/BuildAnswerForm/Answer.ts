'use strict';

export abstract class Answer {
    protected questionId: number;
    protected questionText: string;
    protected questionType: string;
    protected abstract answerText: string;
    protected abstract possibleAnswerId: number | null;

    constructor(questionId:number, questionText:string, questionType: string) {
      this.questionId = questionId;
      this.questionText = questionText;
      this.questionType = questionType;
    }

    public abstract setAnswerId(id: number): void;
    public abstract setAnswerText(text: string): void;
    public abstract getAnswer():void | Object;
}

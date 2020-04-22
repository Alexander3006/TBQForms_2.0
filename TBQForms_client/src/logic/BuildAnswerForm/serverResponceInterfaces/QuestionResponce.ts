import {AnswerResponce} from './AnswerResponce';


export interface QuestionResponce {
    questionType: string;
    questionText: string;
    questionId: number;
    answers: Array<AnswerResponce>;
    allowShowResult: boolean;
}

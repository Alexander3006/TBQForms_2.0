import {AnswerResponse} from './AnswerResponse';


export interface QuestionResponse {
    questionType: string;
    questionText: string;
    questionId: number;
    answers: Array<AnswerResponse>;
    allowShowResult: boolean;
}

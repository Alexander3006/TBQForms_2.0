import {QuestionResponse} from './QuestionResponse';

export interface QuestionFormResponse {
    formName: string;
    formAbout: string;
    questions: Array<QuestionResponse>
}

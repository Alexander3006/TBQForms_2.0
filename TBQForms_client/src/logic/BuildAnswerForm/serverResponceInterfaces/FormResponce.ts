import {QuestionResponce} from './QuestionResponce';

export interface QuestionFormResponce {
    formName: string;
    formAbout: string;
    questions: Array<QuestionResponce>
}

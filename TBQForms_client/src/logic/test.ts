'use strict';
import {Form} from './BuilderForm/Form';

const form = new Form();

form.changeAccessType('limited');
form.changeFormAbout('It is TestForm');
form.changeFormName('First TBQForm');

form.addAllowedUser('testEmail1');
form.addAllowedUser('testEmail2');
form.addAllowedUser('testEmail3');

form.deleteAllowedUser('testEmail3');

const questionOpen = form.addQuestion('Open');
const questionOneOfMany = form.addQuestion('OneOfMany');
const questionOneOfMany2 = form.addQuestion('OneOfMany');

questionOpen.changeText('What is your name?');

questionOneOfMany.changeText('Who are you?');
questionOneOfMany.addAnswer().changeText('male');
questionOneOfMany.addAnswer().changeText('female');

form.deleteQuestion(questionOneOfMany2);

console.dir(JSON.stringify(form));

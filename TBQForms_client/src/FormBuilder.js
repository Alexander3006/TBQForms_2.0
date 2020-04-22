'use strict';

import React from 'react';
import {Form} from './logic/BuilderForm/Form';
import FormEditor from './Components/FormEditor';
import './styles/formBuilder.css';

import OneOfManyQEditor from './Components/OneOfManyQEditor';
import OpenAnswerQEditor from './Components/OpenAnswerQEditor';
import MainHeader from './Components/MainHeader';

export class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: new Form(),
      typeQuestionEditor: null,
      questionEditors: [],
    };
    this.qEditors = {
      'One of many': 'OneOfMany',
      'Open answer': 'Open',
    };
  }

  async componentDidMount() {
    const warning = 'Form will not be created, you are not authorized';
    const token = localStorage.getItem('token');
    if (token) {
      const resource = localStorage.getItem('resource');
      const response = await fetch(`${resource}/api/user/checkValidation`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });
      const {success} = await response.json();
      if (!success) alert(warning);
    } else {
      alert(warning);
    }
  }

  deleteQuestion(question) {
    this.setState((state) => {
      const index = state.questionsEditors.indexOf(question);
      if (index > -1) {
        return state.splice(index, 1);
      } else {
        return state;
      }
    });
    this.state.form.deleteQuestion(question);
    return;
  }

  addQuestionEditor() {
    const qType = document.getElementById('questionType').value;
    const question = this.state.form.addQuestion(this.qEditors[qType]);
    this.setState((state) => state.questionEditors.push(question));
    return;
  }

  async sendForm() {
    console.dir(this.state.form);
    const JsonForm = JSON.stringify(this.state.form);
    const resourse = localStorage.getItem('resource');
    const response = await fetch(`${resourse}/api/form/createForm`, {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JsonForm,
    });
    const resJson = await response.json();
    if (!resJson.success) {
      const {message, errors} = resJson;
      alert(message);
    } else {
      window.location.replace('main');
    }
  }

  render() {
    return (
      <div className="formBuilder">
        <MainHeader/>
        <FormEditor form={this.state.form} />

        <div className="questionCreator">
          <select id="questionType" className="questionType">
            <option>One of many</option>
            <option>Open answer</option>
          </select>
          <button onClick={this.addQuestionEditor.bind(this)} className="addQuestion">+</button>
        </div>
        {this.state.questionEditors.map((editor, index) => {
          if (editor.qType === 'Open') {
            return <OpenAnswerQEditor question={editor} key={index}/>;
          } else if (editor.qType === 'OneOfMany') {
            return <OneOfManyQEditor question={editor} key={index}/>;
          }
        })}

        <button id="sendForm" onClick={this.sendForm.bind(this)}>Send</button>
      </div>
    );
  }
}

export default FormBuilder;

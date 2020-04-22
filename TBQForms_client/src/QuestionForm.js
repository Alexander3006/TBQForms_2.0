import React from 'react';

import MainHeader from './Components/MainHeader';
import OpenAnswerQuestion from './Components/OpenAnswerQuestion';
import OneOfManyQuestion from './Components/OneOfManyQuestion';
import AuthHeader from './Components/AuthHeader';
import './styles/questionForm.css';

import {AnswerForm} from './logic/BuildAnswerForm/AnswerForm';


class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formId: window.location.pathname.split('/').pop(),
      answerForm: {
        formName: 'Not Found',
        formAbout: 'Not Found',
        answers: [],
      },
    };
  }

  async sendAnswerForm() {
    const {formId} = this.state;
    const resource = localStorage.getItem('resource');
    let answerForm;
    try {
      answerForm = this.state.answerForm.getAnswerForm();
    } catch (error) {
      alert(error);
      return;
    }
    const responce = await fetch(`${resource}/api/form/writeAnswerForm/${formId}`, {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerForm),
    });
    const {success, message} = await responce.json();
    if (success) {
      alert(message);
      console.dir(message);
      // add location.assign();
    } else {
      alert(message);
    }
  }

  async componentDidMount() {
    const {formId} = this.state;
    if (formId) {
      const resource = localStorage.getItem('resource');
      const response = await fetch(`${resource}/api/form/getForm/${formId}`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      const JsonData = await response.json();
      if (JsonData.success) {
        this.setState({answerForm: new AnswerForm(formId, JsonData.data)});
      } else {
        alert('The form does not exist or you do not have access');
      }
    } else {
      alert('We handle routing ourselves, don’t touch the URL');
    }
  }

  render() {
    return (<div>
      {(localStorage.getItem('token')) == null? <AuthHeader/>: <MainHeader/>}
      <div className="questionForm">
        <div className="formAboutBlock">
          <p className="fName">{this.state.answerForm.formName}</p>
          <p className="fAbout">{this.state.answerForm.formAbout}</p>
        </div>
        {this.state.answerForm.answers.map((answer, index) =>{
          if (answer.questionType === 'Open') {
            return <OpenAnswerQuestion key={index} answer={answer}/>;
          } else if (answer.questionType === 'OneOfMany') {
            return <OneOfManyQuestion key={index} answer={answer}/>;
          }
        })}
        <button onClick={this.sendAnswerForm.bind(this)} id="sendAnswers">Send Answers</button>
      </div>
    </div>

    );
  }
}


export default QuestionForm;

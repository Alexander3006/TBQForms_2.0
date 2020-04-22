'use strict';

import React from 'react';

import MainHeader from './Components/MainHeader';
import OpenAnswerStat from './Components/OpenAnswerStat';
import OneOfManyStat from './Components/OneOfManyStat';

import './styles/answerStatistics.css';

class AnswerStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formId: window.location.pathname.split('/').pop(),
      statForm: {
        formName: 'Not ound',
        formAbout: 'Not Found',
        aFormStatistics: [],

      },
    };
  }

  async componentDidMount() {
    const {formId} = this.state;
    if (formId) {
      const resource = localStorage.getItem('resource');
      const response = await fetch(`${resource}/api/form/getAllAnswersStatistics/${formId}`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const JsonData = await response.json();
      if (JsonData.success) {
        const {formName, formAbout, aFormStatistics} = JsonData;
        this.setState({statForm: {formName, formAbout, aFormStatistics}});

        console.dir(aFormStatistics);
      } else {
        alert(JsonData.message);
      }
    } else {
      alert('We handle routing ourselves, don’t touch the URL');
    }
  }

  render() {
    return (
      <div>
        <MainHeader/>
        <div className="statForm">
          <div className="formAboutBlock">
            <p className="fName">{this.state.statForm.formName}</p>
            <p className="fAbout">{this.state.statForm.formAbout}</p>
          </div>
          {this.state.statForm.aFormStatistics.map((question) => {
            const {questionType: t} = question;
            if ('Open' === t) return <OpenAnswerStat question={question}/>;
            if ('OneOfMany' === t) return <OneOfManyStat question={question}/>;
          })}
        </div>
      </div>

    );
  }
}


export default AnswerStatistics;

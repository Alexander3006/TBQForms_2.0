'use strict';

import React from 'react';

import '../styles/openAnswerStat.css';

class OpenAnswerStat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="OpenAnswerStat">
        <p className="questionText">{this.props.question.questionText}</p>
        <hr/>
        <div className="allAnswers">
          {this.props.question.answerStatistics[0].answers.map((answer, index) => {
            return <p key={index}>{`${++index}: ${answer.answerText}`}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default OpenAnswerStat;

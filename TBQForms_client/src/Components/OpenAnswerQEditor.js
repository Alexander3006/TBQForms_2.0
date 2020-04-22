'use strict';

import React from 'react';
import '../styles/oneOfManyQEditor.css';


class OpenAnswerQEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  changeQuestionText(event) {
    const text = event.target.value;
    this.props.question.changeText(text);
  }

  render() {
    return (
      <div className="questionEditor">
        <div className="questionBox">
          <textarea onChange={this.changeQuestionText.bind(this)} placeholder="Question text" rows="1"></textarea>
        </div>
      </div>
    );
  }
}

export default OpenAnswerQEditor;

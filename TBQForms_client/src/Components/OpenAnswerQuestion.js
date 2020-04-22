import React from 'react';
import '../styles/question.css';


class OpenAnswerQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  changeAnswer(event) {
    const answerText = event.target.value;
    this.props.answer.setAnswerText(answerText);
    return;
  }

  render() {
    return (
      <div className="question">
        <p>{this.props.answer.questionText}</p>
        <hr/>
        <textarea onChange={this.changeAnswer.bind(this)} name="answer" rows="3" placeholder="Enter your answer"></textarea>
      </div>
    );
  }
}

export default OpenAnswerQuestion;

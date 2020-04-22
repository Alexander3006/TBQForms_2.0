'use strict';

import React from 'react';
import '../styles/oneOfManyQEditor.css';

class OneOfManyQEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
  }

  changeQuestionText(event) {
    event.preventDefault();
    const text = event.target.value;
    this.props.question.changeText(text);
    return;
  }

  changeShowResult(event) {
    const flag = event.target.checked;
    this.props.question.changeShowResult(flag);
    return;
  }

  addAnswer() {
    const answer = this.props.question.addAnswer();
    this.setState((state) => state.answers.push(answer));
    return;
  }

  deleteAnswer(event) {
    const index = event.target.getAttribute('data-index');
    console.dir(index);
    if (index > -1) {
      const answer = this.state.answers[index];
      console.dir(answer);
      this.props.question.deleteAnswer(answer);
      console.dir(this.props.question.answers);
      this.setState((state)=>state.answers.splice(index, 1), ()=> console.dir(this.state.answers));
    }
    return;
  }

  changeAnswerText(event) {
    const text = event.target.value;
    const index = event.target.getAttribute('data-index');
    this.setState((state)=> {
      state.answers[index].changeText(text);
      return state;
    });
    return;
  }


  render() {
    return (
      <div className="questionEditor">
        <div className="questionBox">
          <textarea onChange={this.changeQuestionText.bind(this)} placeholder="Question text" rows="1"></textarea>
          <button onClick={this.addAnswer.bind(this)}>Add Answer</button>
        </div>
        <div className="answersBox">
          <div className="answers">
            {this.state.answers.map((answer, index) => {
              console.dir('render');
              return (<div key={index} className="answer">
                <textarea data-index={index} onChange={this.changeAnswerText.bind(this)} rows="1" value={answer.answerText}/>
                <button onClick={this.deleteAnswer.bind(this)} data-index={index}>delete</button>
              </div>);
            })}
          </div>
          <div className="questionParams">
            <label htmlFor="allowShowResult"> Allow show result</label>
            <input onClick={this.changeShowResult.bind(this)} type="checkbox" name="allowShowResult" id="allowShowResult"/>
          </div>
        </div>
      </div>
    );
  }
}

export default OneOfManyQEditor;

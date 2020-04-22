'use strict';

import React, {createRef} from 'react';
import '../styles/oneOfManyStat.css';

import PieChart from './PieChart';

class OneOfManyStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: () =>{},
    };
    this.ref = createRef();
    this.total = this.props.question.answerStatistics.reduce((acc, pAnswer) => {
      return acc + pAnswer.numberOfAnswer;
    }, 0);

    this.data = (() => {
      if (this.total == 0) {
        return [{value: 0}];
      } else {
        return this.props.question.answerStatistics.map((pAnswer) => {
          return {value: (pAnswer.numberOfAnswer / this.total * 100).toFixed(1)};
        });
      }
    })();
  }

  setColor(colors) {
    this.setState({colors: colors});
  }

  render() {
    return (
      <div className="OneOfManyStat">
        <p className="questionText">{this.props.question.questionText}</p>
        <hr/>
        <div ref={this.ref} className="stat">
          <div className="pieChart">
            <PieChart setColor={this.setColor.bind(this)} width={200} height={200} data={this.data} total={this.total}/>
          </div>
          <div className="stat_answers">
            {this.props.question.answers.map((pAnswer, index) => {
              return <p style={{backgroundColor: this.state.colors(index)}}>{pAnswer.pAnswerText}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default OneOfManyStat;

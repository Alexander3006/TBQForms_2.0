import React from 'react';
import '../styles/question.css';
import PieChart from './PieChart';


class OneOfManyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnswer: 0,
      total: 0, //for PieChart
      data: [], //for PieChart
      isShow: false,
      colors: () => {}
    };

    console.dir(this.props.answer.possibleAnswers);
  }

  changeAnswer(event) {
    const pAnswerId = event.target.getAttribute('data-id');
    const id = parseInt(pAnswerId);
    this.props.answer.setAnswerId(id);
    this.setState({currentAnswer: id});
    return;
  }

  async showResult(event) {
    const flag = event.target.checked;
    const resource = localStorage.getItem('resource')
    if(flag) {
      const response = await fetch(`${resource}/api/form/getAnswerStatistics/${this.props.answer.questionId}`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      const JsonData = await response.json();
      if(JsonData.success) {
        const {statistics} = JsonData
        const total = statistics.reduce((acc, pAnswer)=> {
          return acc + pAnswer.numberOfAnswer;
        },0);
        const data = (() => {
          if (this.total == 0) {
            return [{value: 0}];
          } else {
            return statistics.map((pAnswer) => {
              return {value: (pAnswer.numberOfAnswer / total * 100).toFixed(1)};
            });
          }
        })();
        this.setState({data, total, isShow: flag})   
      }
    } else {
      this.setState({isShow:flag})
    }
  }

  setColor(colors) {
    this.setState({colors: colors});
  }

  render() {
    return (
      <div className="question">
        <p>{this.props.answer.questionText}</p>
        <hr/>
        <div className="answers">
          {this.props.answer.possibleAnswers.map((answer, index)=>{
            const selected = answer.pAnswerId === this.state.currentAnswer;
            return (<p style={this.state.isShow?{backgroundColor: this.state.colors(index)}:{}}
               className={selected?'selectedAnswer':'notSelectedAnswer'}
              onClick={this.changeAnswer.bind(this)} data-id={answer.pAnswerId} key={index}>{answer.pAnswerText}</p>);
          })}
        </div>
        {this.state.isShow? <PieChart setColor={this.setColor.bind(this)} width={200} height={200} data={this.state.data} total={this.state.total}/>
        :false} 
        {this.props.answer.allowShowResult?
          <div id="showResult">
            <label htmlFor="checkbox">Show result</label>
            <input onChange={this.showResult.bind(this)} type="checkbox"/>
          </div>: false
        }
      </div>
    );
  }
}

export default OneOfManyQuestion;

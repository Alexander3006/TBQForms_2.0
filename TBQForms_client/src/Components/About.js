import React from 'react';
import '../styles/about.css';

const about = `This is a survey site where you can: <br/>
- create polls <br/>
- take part in polls <br/>
- view survey statistics <br/>
-share polls <br/>
... <br/>
Over time, new functionality may come on. <br/>

The site was created by a student of FICT KPI for educational purposes. <br/>
If you notice any errors on the site, please be true. <br/>

GitHub: <a href="https://github.com/Alexander3006">Alexander3006</a> <br/>
Gmail: </br> ukrpresident2036@gmail.com <br/> </br>
Instagram: <a href="https://www.instagram.com/a_l_e_x_a_n_d_e_r_1_1/">a_l_e_x_a_n_d_e_r_1_1</a> <br/>
linkedIn: <a href="https://www.linkedin.com/in/alexander-rozghon-a1a5291a1/">Alexander Rozghon</a>`

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  async writeText(text, timeout) {
    const writeChar = async (char, time) => new Promise((resolve, reject)=>{
      setTimeout(()=>{
          this.setState({text: this.state.text + char})
          resolve();
      }, time)
    });
    for(let char of text) {
      await writeChar(char, timeout);
    } 
  }

  componentDidMount() {
    this.writeText(about, 30)
  }

  render() {
    return (
      <div className="about" id="about_website">
        <img className="about_logo" src="../media/images/TBQForms.png"/>
        <div className="about_text" dangerouslySetInnerHTML={{__html:this.state.text}}>
        </div>
      </div>
    );
  }
}

export default About;

import React from 'react';
import '../styles/auth.css';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  async sendData(e) {
    e.preventDefault();
    const data = {
      email: document.getElementById('emailUp').value,
      name: document.getElementById('nameUp').value,
      surname: document.getElementById('surnameUp').value,
      password: document.getElementById('passwordUp').value,
      age: document.getElementById('ageUp').value,
      phoneNumber: document.getElementById('phoneNumberUp').value,
    };
    const resource = localStorage.getItem('resource');
    const response = await fetch(`${resource}/api/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const {success, errors} = await response.json();
    if (success) {
      window.location.replace('signIn');
    } else {
      alert(JSON.stringify(errors));
    }
  }

  render() {
    return (
      <form id="signUp" className="auth container-sm border rounded" onSubmit={this.sendData}>
        <p className="auth_header">TBQForms</p>
        <div className="form-row">
          <div className="col">
            <label htmlFor="nameUp">Name</label>
            <input type="text" className="form-control" id="nameUp" placeholder="Name" required/>
          </div>
          <div className="col">
            <label htmlFor="surnameUp">Surname</label>
            <input type="text" className="form-control" id="surnameUp" placeholder="Surname" required/>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <label htmlFor="validationServerUsername">Your Email</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input type="email" className="form-control" id="emailUp" placeholder="Enter your email" aria-describedby="emailUp" required/>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <label htmlFor="passwordUp">Your Password</label>
            <input type="password" className="form-control" id="passwordUp" placeholder="Enter your passwors" minLength="6" required/>
          </div>
        </div>
        <div className="form-row">
          <div className="col col-md-7">
            <label htmlFor="phoneNumberUp">Phone Number</label>
            <input type="tel" className="form-control" id="phoneNumberUp" pattern="[0-9]{10}" placeholder="Example: 0975727329" required/>
          </div>
          <div className="col col-md-5">
            <label htmlFor="age">Age</label>
            <input type="number" className="form-control" id="ageUp" placeholder="Age" min="16" max="149" required/>

          </div>

        </div>
        <input type="submit" className="send btn btn-primary" value="Sign Up"/>
      </form>
    );
  }
}

export default SignUp;

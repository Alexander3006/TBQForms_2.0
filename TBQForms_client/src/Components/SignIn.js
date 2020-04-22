import React from 'react';
import '../styles/auth.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  async sendData(e) {
    e.preventDefault();
    const data = {
      email: document.getElementById('emailInput').value,
      password: document.getElementById('passwordInput').value,
    };
    const resource = localStorage.getItem('resource');
    const response = await fetch(`${resource}/api/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const {success, message, token} = await response.json();
    if (success) {
      localStorage.setItem('token', token);
      window.location.replace('/main');
    } else {
      alert(message);
    }
  }

  render() {
    return (
      <form onSubmit={this.sendData} className="auth container-sm border rounded">
        <p className="auth_header">TBQForms</p>
        <div className="form-fround align-items-end">
          <label htmlFor="emailInput">Email address</label>
          <input type="email" className="form-control form-control-sm" id="emailInput"
            placeholder="Email" required/>
          <small id="emailHelp" className="form-text text-muted">Enter your email</small>
        </div>
        <div className="form-fround">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" minLength="6" className="form-control" id="passwordInput"
            placeholder="Password" required/>
          <small id="passwordHelp" className="form-text text-muted">Enter your password</small>
        </div>
        <div className="">
          <input type="submit" className="send btn btn-primary" value="Sign In"/>
        </div>
        <div>
          <small></small>
        </div>
      </form>
    );
  }
}

export default SignIn;

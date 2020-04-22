import React from 'react';
import '../styles/authHeader.css';

class AuthHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className="header_section">
          <p className="header_logo_text">TBQForms</p>
        </div>
        <div className="header_section">
          <div className="headerLink hover">
            <a href="/auth/signIn">Sign In</a>
          </div>
          <div className="headerLink hover">
            <a href="/auth/SignUp">Sign Up</a>
          </div>
        </div>

      </header>
    );
  }
}

export default AuthHeader;

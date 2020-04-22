import React from 'react';
import '../styles/mainHeader.css';


class MainHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    window.location.replace('/auth/signIn');
    localStorage.removeItem('token');
    return;
  }

  render() {
    return (
      <header>
        <div className="header_section">
          <a href="/main" className="header_logo_text">TBQForms</a>
        </div>
        <div className="header_section">
          <div onClick={this.signOut} className="headerLink hover"><a href="/auth/signIn">Sign Out</a></div>
        </div>
      </header>
    );
  }
}

export default MainHeader;

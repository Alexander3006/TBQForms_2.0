import React from 'react';
import '../styles/footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <a className = "footer_link" href="">About Us</a>
        <a className = "footer_link" href="">License</a>
        <a className = "footer_link" href="">Authors</a>
      </div>
    );
  }
}

export default Footer;

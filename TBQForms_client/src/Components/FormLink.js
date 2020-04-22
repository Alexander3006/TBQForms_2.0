import React from 'react';
import '../styles/formLink.css';

class FormLink extends React.Component {
  constructor(props) {
    super(props);
  }


  goToForm() {
    const formId = this.props.formId;
    window.location.assign(`/questionForm/${formId}`);
    return;
  }

  async deleteForm(event) {
    const formId = this.props.formId;
    const resource = localStorage.getItem('resource');
    const response = await fetch(`${resource}/api/form/deleteForm/${formId}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const {success, message} = await response.json();
    if (!success) {
      alert(message);
    } else {
      window.location.reload();
    }
  }

  showResult() {
    const formId = this.props.formId;
    window.location.assign(`/stat/${formId}`);
  }

  render() {
    return (
      <div className="form_link">
        <div onDoubleClick={this.showResult.bind(this)} className="deleteForm">result</div>
        <div onClick={this.goToForm.bind(this)} className="form_link_name">
          <p>{this.props.nameForm}</p>
        </div>
        <div className="form_link_about">
          <p>{this.props.aboutForm}</p>
        </div>
        <div onDoubleClick={this.deleteForm.bind(this)} className="deleteForm">delete</div>
      </div>
    );
  }
}
export default FormLink;

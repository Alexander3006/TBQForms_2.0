import React from 'react';
import '../styles/formsDesk.css';
import FormLink from './FormLink';

class FormsDesk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForms: [],
    };
  }

  async componentDidMount() {
    const resource = localStorage.getItem('resource');
    const response = await fetch(`${resource}/api/form/getUserForms`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const resJson = await response.json();
    if (resJson.success) {
      const {forms} = resJson;
      this.setState({userForms: forms});
    } else {
      alert(resJson.message);
    }
  }

  render() {
    return (
      <div className="forms">
        <div className="forms_header">
          <div>
            <p>Your Forms</p>
          </div>
          <div>
            <div className="forms_header_link hover">
              <a href="createForm">Create</a>
            </div>
          </div>
        </div>
        <div className="all_forms">
          {this.state.userForms.map((form, index)=>{
            return <FormLink formId = {form.qFormId} nameForm={form.formName} aboutForm={form.formAbout} key={index}/>;
          })}
        </div>
      </div>
    );
  }
}

export default FormsDesk;

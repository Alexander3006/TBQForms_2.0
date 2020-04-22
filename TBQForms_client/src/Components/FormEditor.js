'use strict';

import React from 'react';
import '../styles/formEditor.css';

class FormEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowedUsers: [],
    };
  }

  changeFormName(event) {
    event.preventDefault();
    const text = event.target.value;
    this.props.form.changeFormName(text);
    return;
  }

  changeFormAbout(event) {
    event.preventDefault();
    const text = event.target.value;
    this.props.form.changeFormAbout(text);
    return;
  }

  changeAccessType(event) {
    const flag = event.target.checked;
    const type = flag? 'limited': 'open';
    this.props.form.changeAccessType(type);
    const allowedUsersElem = document.getElementById('allowedUsers');
    allowedUsersElem.hidden = !flag;
    return;
  }

  addAllowedUser() {
    const allowedUserElem= document.getElementById('allowedUser');
    const user = allowedUserElem.value;
    allowedUserElem.value = '';
    this.props.form.addAllowedUser(user);
    this.setState((state) => ({allowedUsers: [...state.allowedUsers, user]}), ()=>console.dir(this.state.allowedUsers) );
    return;
  }

  deleteItem(event) {
    const index = event.target.getAttribute('data-index');
    const value = event.target.innerHTML;
    this.props.form.deleteAllowedUser(value);
    this.setState((state)=>state.allowedUsers.splice(index, 1));
    return;
  }

  render() {
    return (
      <div className="formEditor">
        <textarea onChange={this.changeFormName.bind(this)} className="formName" rows="1">New Form</textarea>
        <textarea onChange={this.changeFormAbout.bind(this)} className="formAbout" rows="1">About form</textarea>
        <div className="formParams">
          <div className="params">
            <label htmlFor="access">Close access</label>
            <input onClick={this.changeAccessType.bind(this)} type="checkbox" name="access" id="access"/>
          </div>
          <div hidden id="allowedUsers" className="allowedUsers">
            <input id="allowedUser" type="email" name="addAllowedUser" placeholder="Add email allowed user"/>
            <button onClick={this.addAllowedUser.bind(this)}>add</button>
            <div>
              {this.state.allowedUsers.map((user, index)=>{
                return <p onClick={this.deleteItem.bind(this)} key={index} data-index={index}>{user}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormEditor;

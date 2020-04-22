import React from 'react';
import '../styles/userData.css';

class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'UserName',
      surname: 'SurName',
      age: '..',
      phoneNumber: '000000000',
      status: 'user',
    };
  }

  async componentDidMount() {
    const resource = localStorage.getItem('resource');
    const response = await fetch(`${resource}/api/user/getUserData`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const resData = await response.json();
    if (resData.success) {
      const {data} = resData;
      this.setState({...data});
    } else {
      alert(resData.message);
    }
  }


  render() {
    return (
      <div>
        <div className="userProfile">
          <img src={`https://avatars.dicebear.com/v2/bottts/${this.state.userName + this.state.surname}.svg?options[width]=210&options[height]=210`} className="user_avatar"/>
          <div>
            <p className="user_name">{`${this.state.userName} ${this.state.surname}`}</p>
            <div className="user_data">
              <p>Phone: {this.state.phoneNumber}</p>
              <p>Age: {this.state.age}</p>
              <p>Status: {this.state.status}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}


export default UserData;

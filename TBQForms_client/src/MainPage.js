import React from 'react';
import './styles/main.css';

import MainHeader from './Components/MainHeader';
import Footer from './Components/Footer';
import UserData from './Components/UserData';
import FormsDesk from './Components/FormsDesk';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MainHeader/>
        <main>
          <UserData/>
          <FormsDesk/>
        </main>
        <Footer/>

      </div>
    );
  }
}

export default MainPage;

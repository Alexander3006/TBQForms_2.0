import React from 'react';
import './styles/authMain.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import AuthHeader from './Components/AuthHeader';
import About from './Components/About';
import Footer from './Components/Footer';


class AuthMainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AuthHeader/>
        <main>
          <About/>
          <Router>
            <Switch>
              <Route path="/auth/signUp">
                <SignUp/>
              </Route>

              <Route path="/auth/signIn">
                <SignIn/>
              </Route>
            </Switch>
          </Router>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default AuthMainPage;

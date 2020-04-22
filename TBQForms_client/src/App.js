import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AuthMainPage from './AuthMainPage';
import MainPage from './MainPage';
import FormBuilder from './FormBuilder';
import QuestiomForm from './QuestionForm';
import AnswerStatistics from './AnswerStatistics';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthMainPage/>
        </Route>

        <Route path="/main">
          <MainPage/>
        </Route>

        <Route path="/createForm">
          <FormBuilder/>
        </Route>

        <Route path="/questionForm">
          <QuestiomForm/>
        </Route>

        <Route path="/stat">
          <AnswerStatistics/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

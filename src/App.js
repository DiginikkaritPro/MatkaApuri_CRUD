import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './MediaQueries.css';

import CreateQuestion from './components/createQuestion';
import FollowUpQuestion from './components/followUpQuestion';
import UpdateQuestion from './components/updateQuestion';
import DeleteQuestion from './components/deleteQuestion';

import { CRUDProvider } from './components/questionContext';


class App extends Component {



  render() {
    
    return (
      
          <Router>
            <CRUDProvider>
            <div className="App">
              <Route exact path="/" component={CreateQuestion} />
              <Route exact path="/followupquestion" component={FollowUpQuestion} />
              <Route exact path="/updatequestion" component={UpdateQuestion} />
              <Route exact path="/deletequestion" component={DeleteQuestion} />
            </div>
            </CRUDProvider>
          </Router>
     
    );
  }
}

export default App;
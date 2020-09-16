import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './MediaQueries.css';

import StartPage from './components/startPage';
import CreateQuestion from './components/createQuestion';
//import FollowUpQuestion from './components/followUpQuestion';
import UpdateQuestion from './components/updateQuestion';
import DeleteQuestion from './components/deleteQuestion';

import { CRUDProvider } from './components/questionContext';


class App extends Component {



  render() {
    // var followUp = (props) => {
    //   return <FollowUpQuestion allAnswerIds={props.location.allAnswerIds} newQuestionIdForFollowUp={props.location.newQuestionIdForFollowUp} />
    // }
    // var question = (props) => {
    //   return <CreateQuestion allAnswerIds={props.location.allAnswerIds}  />
    // }
    return (
      
          <Router>
            <CRUDProvider>
            <div className="App">
              <Route exact path="/" component={StartPage} />
              <Route exact path="/createquestion" component={CreateQuestion} />
              {/* <Route exact path="/followupquestion" component={followUp} /> */}
              <Route exact path="/updatequestion" component={UpdateQuestion} />
              <Route exact path="/deletequestion" component={DeleteQuestion} />
            </div>
            </CRUDProvider>
          </Router>
     
    );
  }
}

export default App;
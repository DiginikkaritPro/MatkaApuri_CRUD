import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import './MediaQueries.css';

import StartPage from './components/startPage';
import CreateQuestion from './components/createQuestion';
import FollowUpQuestion from './components/followUpQuestion';
import UpdateQuestion from './components/updateQuestion';
import DeleteQuestion from './components/deleteQuestion';


class App extends Component {

  render() {
    var followUp = (props) => {
      return <FollowUpQuestion allAnswerIds={props.location.allAnswerIds} newQuestionIdForFollowUp={props.location.newQuestionIdForFollowUp}/>
      }
    return (
         
          <Router>
          <div className="App">  
          <Route exact path="/" component={StartPage}/>  
          <Route exact path="/createquestion" component={CreateQuestion}/> 
          <Route exact path="/followupquestion" component={followUp}/>  
          <Route exact path="/updatequestion" component={UpdateQuestion}/>
          <Route exact path="/deletequestion" component={DeleteQuestion}/>
          </div>
        </Router>
      
    );
  }
}
  
export default App;
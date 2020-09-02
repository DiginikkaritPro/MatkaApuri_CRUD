import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import QuestionForm from './components/questionForm';
// import {
//   getLastQuestionId
  
// } from "./functions/ClientFunctions";

class App extends Component {

  newQuestionId = 0;

  // getId = async () => {
  //   this.newQuestionId = await getLastQuestionId();
  // }

  // componentWillMount () {
  //    this.getId();
  // }
  
  render() {
    return (
      <div className="App">       
          <QuestionForm />
      </div>
    );
  }
}
  
export default App;
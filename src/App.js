import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import QuestionForm from './components/questionForm';


class App extends Component {

  render() {
    return (
      <div className="App">       
          <QuestionForm />
      </div>
    );
  }
}
  
export default App;
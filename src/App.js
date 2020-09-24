import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './MediaQueries.css';

import CreateQuestion from './components/createQuestion';
//import FollowUpQuestion from './components/followUpQuestion';
import UpdateQuestion from './components/updateQuestion';
import DeleteQuestion from './components/deleteQuestion';

import { CRUDProvider } from './components/questionContext';


const App = () => {


    return (
            <CRUDProvider>
            <div className="App">
              <CreateQuestion />
            </div>
            </CRUDProvider>
    );
  
}

export default App;
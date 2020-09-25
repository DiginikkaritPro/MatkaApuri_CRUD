import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./MediaQueries.css";
import QuestionPanelHeader from './components/questionPanelHeader'
import QuestionsPanelTable from './components/form-components/questionsPanelTable'
import CreateQuestion from "./components/createQuestion";
//import FollowUpQuestion from './components/followUpQuestion';
import UpdateQuestion from "./components/updateQuestion";
import DeleteQuestion from "./components/deleteQuestion";

import { 
  CRUDProvider,
  useContext,
  CRUDContext,
  useEffect,
  getQuestionsNotFollowUp,
  getLastAnswerId,
  getLastQuestionId,
  QuestionListForm

} from "./utils/Imports";

const App = () => {
  const {
    newQuestionIdObject,
    answersArrayObject,
    allAnswerIdsObject,
    newAnswerIdObject,
    questionsPanelArrayObject,
    questionArrayObject,
    isNewQuestionObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [questionArray, setQuestionArray] = questionArrayObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;
  const [isNewQuestion, setIsNewQuestion] = isNewQuestionObject;
  
  useEffect(() => {
    if (newAnswerId === 0) {
      getNewAnswerId();
      getNormalQuestions();
    }
  });

  
  let getNormalQuestions = async () => {
    if (!questionsPanelArray || questionsPanelArray.length === 0) {
      const qnfu = await getQuestionsNotFollowUp();
      setQuestionsPanelArray(qnfu);
    }
  };

  let getNewAnswerId = async () => {
    const response = await getLastAnswerId();
    setNewAnswerId(response);
  };

  const addNewQuestion = async () => {
    setIsNewQuestion(true);

    let resetAnswerId = await getLastAnswerId();
    let resetQuestionId = (await getLastQuestionId()) + 1;

    setAnswersArray([]);
    setAllAnswerIds([]);
    setNewAnswerId(resetAnswerId);
    setNewQuestionId(resetQuestionId);
    setQuestionArray([]);
  };

  return (
    
      <div className="App">
        <div className="container">
          <div className="row">

            <div className="col-sm-5">
              <div className="card">
                <QuestionPanelHeader />
                <div className="card card-text">
                  <span style={{ textAlign: "right" }}>
                    <button
                      className="btn btn-secondary summaryBtn"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-type="info"
                      type="button"
                      title="Lisää uusi kysymys"
                      onClick={addNewQuestion}
                    >
                      Lisää uusi kysymys
                    </button>
                  </span>
                  <div className="card-body">
                    <QuestionsPanelTable questions={questionsPanelArray} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <CreateQuestion addNewQ={addNewQuestion}/>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default App;

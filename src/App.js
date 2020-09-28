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
  QuestionListForm, getLastFollowUpQuestionId

} from "./utils/Imports";
import FollowUpQuestion from "./components/followUpQuestion";

const App = () => {
  const {
    newQuestionIdObject,
    answersArrayObject,
    allAnswerIdsObject,
    newAnswerIdObject,
    questionsPanelArrayObject,
    questionArrayObject,
    isNewQuestionObject,
    isFollowUpObject,
    questionIdForFollowUpObject,
    followUpQuestionArrayObject,
    followUpAnswersArrayObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [questionArray, setQuestionArray] = questionArrayObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;
  const [isNewQuestion, setIsNewQuestion] = isNewQuestionObject;
  const [isFollowUp, setIsFollowUp] = isFollowUpObject;
  const [questionIdForFollowUp, setQuestionIdForFollowUp] = questionIdForFollowUpObject;
  const [followUpQuestionArray, setFollowUpQuestionArray] = followUpQuestionArrayObject;
  const [followUpAnswersArray, setFollowUpAnswersArray] = followUpAnswersArrayObject;
  
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
    let resetFollowUpId = (await getLastFollowUpQuestionId()) +1;

    setAnswersArray([]);
    setAllAnswerIds([]);
    setNewAnswerId(resetAnswerId);
    setNewQuestionId(resetQuestionId);
    setQuestionIdForFollowUp(resetFollowUpId)
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
              <div id="question" hidden={isFollowUp}>
              <CreateQuestion addNewQ={addNewQuestion}/>
              </div>
              <div id="followup" hidden={!isFollowUp}>
              <FollowUpQuestion />
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default App;

import React, {useContext, useEffect} from "react";
import '../App.css';
import Header from "./header";
import QuestionPanelHeader from "./questionPanelHeader";
import Footer from "./footer";
import { CRUDContext } from "./questionContext";
import QuestionListForm from "./form-components/questionListForm";
import SummaryListForm from "./form-components/summaryListForm";
import AnswerListForm from "./form-components/answerListForm";
import {
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastAnswerId,
  getQuestionsNotFollowUp
} from "../functions/ClientFunctions";

const CreateQuestion = () => {


  useEffect(() => {
    if(newAnswerId === 0){
      getNewAnswerId();
    }
    async function getQNFU() {
        if (!questionsPanelArray || questionsPanelArray.length === 0) {
          const qnfu = await getQuestionsNotFollowUp();
          setQuestionsPanelArray(qnfu);
        }
    }
    getQNFU();
  });

   let getNewAnswerId = async () => {
     const response = await getLastAnswerId();
     setNewAnswerId(response + 1);
   }
  const { 
    newQuestionIdObject, 
    newFollowUpIdObject, 
    answersArrayObject, 
    allAnswerIdsObject,
    disabledSubmitObject, 
    newAnswerIdObject,
    questionsPanelArrayObject,
    followUpAmountObject,
    followUpCheckedObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [newFollowUpQuestionId, setNewFollowUpQuestionId] = newFollowUpIdObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;
  const [followUpAmount, setFollowUpAmount] = followUpAmountObject;
  const [followUpChecked, setFollowUpChecked] = followUpCheckedObject;
  

  const removeAnswerAndSummary = () => {
    console.log(newAnswerId);
    
    setNewAnswerId(newAnswerId - 1);

    allAnswerIds.pop();
    setAllAnswerIds(allAnswerIds);

    // Poistetaan vastaus- ja yhteenveto-objekti arraystä
    answersArray.pop();
    answersArray.pop();
    setAnswersArray(answersArray); 

    setDisabledSubmit(answersArray.length < 1);
  };

  const addAnswerAndSummary = () => {
    
      setNewAnswerId(newAnswerId + 1);

      setAllAnswerIds(prevNewAnswerIds => {
        return [...prevNewAnswerIds, newAnswerId];
      });
      setAnswersArray(prevAnswersArray => {
        return [...prevAnswersArray,
          AnswerListForm(newAnswerId, followUpAmount, setFollowUpAmount),
          SummaryListForm(newAnswerId)
        ];
      });

      //setNewAnswerId(newAnswerId);

      setDisabledSubmit(answersArray.length < 1);
    
  };

  const submitData = () => {
    insertNewQuestion(
      newQuestionId,
      document.getElementById("inputID").value,
      document.getElementById("textareaID").value
    );
    allAnswerIds.forEach((ansId) => {
      
      insertNewAnswers(
        ansId,
        newQuestionId,
        document.getElementById("answerInput"+ansId).value
      );
      insertNewSummary(
        ansId,
        document.getElementById("headerInput"+ansId).value,
        document.getElementById("textAreaInput"+ansId).value,
        document.getElementById("linkInput"+ansId).value
      );
    });

    // if(followUpAmount.length > 0){
    //   askFollowUpQuestions(followUpAmount);
    // }

    
  };

  
     


    let VastausObj = () =>
      Array.from(answersArray).map((e) => {
        return <div>{e}</div>;
      });

    const editQuestion = (kysymysID) => {
      alert(`Mennään editoimaan kysymystä ${kysymysID}`);
    }

    const removeQuestion = (kysymysID) => {
      if (window.confirm(`Haluatko poistaa kysymyksen ${kysymysID}?`)) {
        // Poista kysymys ja sen vastaukset, info, jatkokysymykset ja jatkovastaukset.
      }
    }

    const questionsList = () => {
      if (!questionsPanelArray || questionsPanelArray.length === 0) {
        return [<p>Ei kysymyksiä</p>];
      }
      const array = [];
      let i = 1;
      questionsPanelArray.forEach(question => {
        array.push(
          <tr onClick={() => editQuestion(question.KysymysID)}>
            <td>{i}</td>
            <td>{question.KysymysTXT}</td>
            <td onClick={() => removeQuestion(question.KysymysID)}> X </td>
          </tr>
        );
        i++;
      });
      return array;
    };  

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            {/* <div id="deleteObj" hidden={true} className="container"> */}
              <div className="row">
              <div className="card">
                <QuestionPanelHeader />
                <div className="card card-text">
                  <div className="card-body">
                    <table className="table">
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Kysymys 1</td>
                        <td>
                          <a data-toggle="modal" href="#myModal">
                            <button className="btn panelBtn">x</button>
                          </a>
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="myModal" role="dialog">
                              <div className="modal-dialog">
                              
                                {/* <!-- Modal content--> */}
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title">Poista kysymys</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                  </div>
                                  <div className="modal-body">
                                    <p>Haluatko varmasti poistaa tämän kysymyksen ja sen 
                                      jatkokysymykset?</p>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Poista</button>
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Sulje</button>
                                  </div>
                                </div>
                        
                      </div>
                    </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Kysymys 2</td>
                        <td><button  className="btn panelBtn">x</button></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Kysymys 3</td>
                        <td><button  className="btn panelBtn">x</button></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <Header />
              <div className="card-body">
                <div className="card-text">
                  <span>
                    <p style={{ float: "left" }}>
                      <a href="/" className="summaryBtn">
                        {" "}
                        Takaisin etusivulle
                      </a>
                    </p>
                  </span>
                  <br />
                  <br />
                  <br />
                  <h5>
                    Lisää kysymys ja sen vastaukset sekä mahdolliset yhteenvedot
                    Matka-apuriin. Paina Lopuksi "Lähetä" -nappia
                  </h5>
                  <div>
                    <form onSubmit={submitData}>
                      <br />
                      <input
                        disabled={disabledSubmit}
                        type="submit"
                        value="Lähetä"
                      />
                      <br />
                      <br />
                      {/* {QuestionListForm()} */}
                      <QuestionListForm newQuestionId={`${newQuestionId}`}/>
                      <br />
                      {VastausObj()}
                      <br />
                      <br />
                    </form>
                    <button
                      type="button"
                      className="addRemove btn btn-secondary"
                      onClick={addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="addRemove btn btn-secondary"
                      onClick={removeAnswerAndSummary}
                    >
                      Poista vastauskenttä
                    </button>
                    <br />
                    <br />
                  </div>
                  <Footer />
                </div>
              </div>
              {/* card-body */}
            </div>
            {/* card */}
          </div>
          {/* col */}
          {/* <div className="col-sm-2">
            <div id="followUpObj" hidden={true} className="container">
              <div className="row">
                <div className="card card-text">
                  <div className="card-body">
                     {JatkokysymysObj()} 
                    <button
                      type="button"
                      className="addRemove btn btn-secondary"
                    >
                      Lisää vastauskenttä
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  
}

export default CreateQuestion;

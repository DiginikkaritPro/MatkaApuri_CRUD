import React, {useContext, useEffect} from "react";
import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import { CRUDContext } from "./questionContext";

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

  const { 
    newQuestionIdObject, 
    newFollowUpIdObject, 
    answersArrayObject, 
    allAnswerIdsObject,
    disabledSubmitObject, 
    newAnswerIdObject,
    questionsPanelArrayObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [newFollowUpQuestionId, setNewFollowUpQuestionId] = newFollowUpIdObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;

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

  let getNewAnswerId = async () => {
    const response = await getLastAnswerId();
    setNewAnswerId(response + 1);
  }

  const addAnswerAndSummary = () => {
    
      setNewAnswerId(newAnswerId + 1);

      setAllAnswerIds(prevNewAnswerIds => {
        return [...prevNewAnswerIds, newAnswerId];
      });
      setAnswersArray(prevAnswersArray => {
        return [...prevAnswersArray,
          AnswerListForm(newAnswerId),
          SummaryListForm(newAnswerId)
        ];
      });

      //setNewAnswerId(newAnswerId);

      setDisabledSubmit(answersArray.length < 1);
    
  };
  
  const AnswerListForm = (newAnswerId) => {
    return (
      <div id={newAnswerId}>
        <p> Vastaus </p>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="radio"
                aria-label="Radio button for following text input"
              />
            </div>
          </div>

          <input
            type="text"
            id={"answerInput" + newAnswerId}
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
        <br />
        <NavLink
          to={{
            pathname: "/followupquestion",
            allAnswerIds: allAnswerIds,
            newQuestionIdForFollowUp: newQuestionId,
          }}
        >
          <button
            id={
              "followUpQuestionCheckBox" +
              newAnswerIdForFollowUp +
              newQuestionIdForFollowUp +
              newFollowUpQuestionId
            }
            type="button"
          >
            Lisää jatkokysymys{" "}
          </button>
        </NavLink>
        <br />
        <br />
      </div>
    );
  };
  

  const summaryHandler = (event, id) => {
    event.preventDefault();
    if (document.getElementById(id).hidden) {
      document.getElementById(id).hidden = false;
    } else {
      document.getElementById(id).hidden = true;
    }
  };

  const SummaryListForm = (newAnswerId) => {
    return (
      <div id={newAnswerId}>
        <button
          onClick={(event) => {
            summaryHandler(event, "hideableSummaryDiv" + newAnswerId);
          }}
          className="summaryBtn btn btn-light"
        >
          Näytä/Piilota Yhteenveto
        </button>
        <div hidden={true} id={"hideableSummaryDiv" + newAnswerId}>
          <div>
            <input
              id={"headerInput" + newAnswerId}
              placeholder="Otsikko"
              type="text"
              name="OtsikkoText"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <textarea
              id={"textAreaInput" + newAnswerId}
              placeholder="Info"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <input
              id={"linkInput" + newAnswerId}
              placeholder="Linkki"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <p>{`${newAnswerId}`}</p>
        </div>

        <hr />
      </div>
    );
  };

  const submitData = () => {
    insertNewQuestion(
      newQuestionId,
      document.getElementById("inputID").value,
      document.getElementById("textareaID").value
    );
    allAnswerIds.forEach((ansId) => {
      console.log(ansId + " " + document.getElementById("answerInput"+ansId).value)
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
  };

  const newAnswerIdForFollowUp = 0; // TODO
  const newQuestionIdForFollowUp = 0; // TODO
  
  let QuestionListForm = () => {
    return (
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                ?
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Kirjoita kysymys tähän..."
              id="inputID"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                info
              </span>
            </div>
            <textarea
              type="text"
              className="form-control"
              placeholder="Lisätietoja tähän..."
              id="textareaID"
              aria-describedby="basic-addon1"
            />
          </div>
          <p>{`${newQuestionId}`}</p>
        </div>
      );
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
          <div className="col-sm-4">
            <div id="xxx" className="container">
              <div className="row">
                <div className="card card-text">
                  <div className="card-body">
                    <table>
                      {questionsList()}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
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
                      {QuestionListForm()}
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
          <div className="col-sm-2">
            <div id="followUpObj" hidden={true} className="container">
              <div className="row">
                <div className="card card-text">
                  <div className="card-body">
                    {/* {JatkokysymysObj()} */}
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
          </div>
        </div>
      </div>
    );
  
}

export default CreateQuestion;

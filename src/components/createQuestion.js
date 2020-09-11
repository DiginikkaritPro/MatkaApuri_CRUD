import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import {
  getLastQuestionId,
  getLastAnswerId,
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  insertNewFollowUpQuestion,
} from "../functions/ClientFunctions";

class questionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      followUpQuestionArray: [],
      allAnswerIds: [],
      
      disabledSubmit: true,
      disabledAnswer: false,
     
    };
  }

  newQuestionId = 0;
  newAnswerId = 0;

  componentDidMount = async () => {
    this.newQuestionId = (await getLastQuestionId()) + 1;
    this.newAnswerId = (await getLastAnswerId()) + 1;
  };

  removeAnswerAndSummary = () => {
    this.newAnswerId--;
    this.state.allAnswerIds.pop();
    this.state.answersArray.pop();
    this.state.answersArray.pop();
    this.setState({
      allAnswerIds: this.state.allAnswerIds,
      disabledSubmit: this.state.answersArray.length < 1,
      answersArray: this.state.answersArray,
    });
  };

  addAnswerAndSummary = () => {
    this.state.allAnswerIds.push(this.newAnswerId);
    this.state.answersArray.push(
      this.AnswerListForm(this.newAnswerId, false),
      this.SummaryListForm(this.newAnswerId)
    );
    
    this.newAnswerId++;
    this.setState(
      {
        disabledSubmit: this.state.answersArray.length < 1,
        answersArray: this.state.answersArray,
      },
      () => {
        console.log(this.state.allAnswerIds);
      }
    );
  };
  
  AnswerListForm = (newAnswerId, isFollowUp) => {
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
            allAnswerIds: this.state.allAnswerIds,
            newQuestionIdForFollowUp: this.newQuestionId,
          }}
        >
          <button
            onClick={this.clickHandler}
            id={
              "followUpQuestionCheckBox" +
              this.newAnswerIdForFollowUp +
              this.newQuestionIdForFollowUp +
              this.newFollowUpQuestionId
            }
            hidden={isFollowUp}
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
  followUpCheckBoxClicked = (e) => {
    // if (e.target.checked === true){
    //   document.getElementById("followUpObj").hidden = false
    //   this.newQuestionIdForFollowUp++
    //   this.newFollowUpQuestionId++
    //   this.newAnswerIdForFollowUp++
    //   this.allFollowUpAnswerIds.push(this.newAnswerIdForFollowUp);
    //   this.allFollowUpQuestionIds.push(this.newFollowUpQuestionId);
    //   this.state.followUpQuestionArray.push(
    //     this.FollowUpQuestionListForm(this.newFollowUpQuestionId, this.newQuestionIdForFollowUp),
    //     this.AnswerListForm(this.newAnswerIdForFollowUp, true),
    //     this.SummaryListForm(this.newAnswerIdForFollowUp)
    //   );
    //   this.setState({
    //     followUpQuestionArray: this.state.followUpQuestionArray,
    //     disabledAnswer: true
    //   })
    // }else {
    //   this.newQuestionIdForFollowUp--
    //   this.newFollowUpQuestionId--
    //   document.getElementById("followUpObj").hidden = true
    //   this.allFollowUpQuestionIds.pop()
    //   this.allFollowUpAnswerIds.pop();
    //   this.state.followUpQuestionArray.splice(0, this.state.followUpQuestionArray.length)
    //   this.newAnswerIdForFollowUp = this.allAnswerIds[this.allAnswerIds.length - 1]
    //   this.setState({
    //     followUpQuestionArray: this.state.followUpQuestionArray,
    //     disabledAnswer: false
    //   })
    // }
  };

  summaryHandler = (event, id) => {
    event.preventDefault();
    if (document.getElementById(id).hidden) {
      document.getElementById(id).hidden = false;
    } else {
      document.getElementById(id).hidden = true;
    }
  };

  SummaryListForm = (newAnswerId) => {
    return (
      <div id={newAnswerId}>
        <button
          onClick={(event) => {
            this.summaryHandler(event, "hideableSummaryDiv" + newAnswerId);
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

  submitData = () => {
    insertNewQuestion(
      this.newQuestionId,
      document.getElementById("inputID").value,
      document.getElementById("textareaID").value
    );
    this.state.allAnswerIds.forEach((ansId) => {
      console.log(ansId + " " + document.getElementById("answerInput"+ansId).value)
      insertNewAnswers(
        ansId,
        this.newQuestionId,
        document.getElementById("answerInput"+ansId).value
      );
      insertNewSummary(
        ansId,
        document.getElementById("headerInput"+ansId).value,
        document.getElementById("textAreaInput"+ansId).value,
        document.getElementById("linkInput"+ansId).value
      );
      // if (
      //   document.getElementById("followUpQuestionCheckBox" + ansId).checked ===
      //   true
      // ) {
      //   this.allFollowUpQuestionIds.forEach((followUpId) => {
      //     insertNewFollowUpQuestion(
      //       this.newQuestionIdForFollowUp,
      //       this.newFollowUpQuestionId,
      //       document.getElementById("inputID" + followUpId).value,
      //       document.getElementById("textareaID" + followUpId).value
      //     );
      //     insertNewAnswers(
      //       this.newAnswerIdForFollowUp,
      //       this.newQuestionIdForFollowUp,
      //       document.getElementById("answerInput" + this.newAnswerIdForFollowUp)
      //         .value
      //     );
      //   });
      // }
    });
  };

  render() {
    let QuestionListForm = () => {
      console.log("renderöin " + this.newQuestionId);
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
          <p>{`${this.newQuestionId}`}</p>
        </div>
      );
    };

    let VastausObj = () =>
      Array.from(this.state.answersArray).map((e) => {
        return <div>{e}</div>;
      });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
            <div id="deleteObj" hidden={true} className="container">
              <div className="row">
                <div className="card card-text">
                  <div className="card-body"></div>
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
                    <form onSubmit={this.submitData}>
                      <br />
                      <input
                        disabled={this.state.disabledSubmit}
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
                      disabled={this.state.disabledAnswer}
                      className="addRemove btn btn-secondary"
                      onClick={this.addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="addRemove btn btn-secondary"
                      onClick={this.removeAnswerAndSummary}
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
                      onClick={this.addAnswerAndSummaryForFollowUp}
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
}

export default questionForm;

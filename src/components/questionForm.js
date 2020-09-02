//Renderöinti arraystä ei toimi?
//Id arvot ovat kaikilla arrayn objecteilla samat, ei hyvä.

import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import {
  getLastQuestionId,
  getLastAnswerId,
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary
} from "../functions/ClientFunctions";

class questionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      disabledSubmit: true
    };
    
  }

  newQuestionId = 0;
  newAnswerId = 0;
  allAnswerIds = [];

  componentDidMount = async () => {
    this.newQuestionId = await getLastQuestionId();
    this.newAnswerId = await getLastAnswerId();
    //this.state.answersArray.push(this.AnswerListForm(this.newAnswerId), this.SummaryListForm(this.newAnswerId))
    console.log(this.newQuestionId);
    console.log(this.newAnswerId);
  };

  removeAnswerAndSummary = () => {
    this.newAnswerId--;
    this.allAnswerIds.pop();
    this.state.answersArray.pop()
    this.state.answersArray.pop()
    this.setState({
      disabledSubmit: this.state.answersArray.length < 1,
      answersArray: this.state.answersArray
    })
  }

  addAnswerAndSummary = () => {
    
    this.newAnswerId++;
    this.allAnswerIds.push(this.newAnswerId);
    console.log(this.allAnswerIds)
    this.state.answersArray.push(
      this.AnswerListForm(this.newAnswerId),
      this.SummaryListForm(this.newAnswerId)
    );
    this.setState(
      {
        disabledSubmit: this.state.answersArray.length < 1,
        answersArray: this.state.answersArray,
      },
      () => {
        console.log(this.state.answersArray);
      }
    );
  };

  AnswerListForm = (newAnswerId) => {
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
            id={'answerInput' + newAnswerId}
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
      </div>
    );
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
          onClick={(event) => {this.summaryHandler(event, 'hideableSummaryDiv' + newAnswerId)}}
          className="summaryBtn btn btn-light"
        >
        Näytä/Piilota Yhteenveto
        </button>
        <div hidden={true} id={'hideableSummaryDiv' + newAnswerId}>
          
          <div>
            <input
              id={'headerInput' + newAnswerId}
              placeholder="Otsikko"
              type="text"
              name="OtsikkoText"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <textarea
              id={'textAreaInput' + newAnswerId}
              placeholder="Info"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <input
              id={'linkInput' + newAnswerId}
              placeholder="Linkki"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
    <p>{`${newAnswerId}`}</p>
        
        </div>
        <hr/>
      </div>
    );
  };

  submitData = () => {
    insertNewQuestion(this.newQuestionId, document.getElementById('inputID').value, document.getElementById('textareaID').value)
    this.allAnswerIds.forEach(ansId => {
      insertNewAnswers(ansId, this.newQuestionId, document.getElementById('answerInput' + ansId).value); 
      insertNewSummary(ansId, document.getElementById('headerInput' + ansId).value, document.getElementById('textAreaInput' + ansId).value, document.getElementById('linkInput' + ansId).value)
    });
  }

  render() {
    let QuestionListForm = () => {
      console.log('renderöin ' + this.newQuestionId)
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
          <div className="col-sm"></div>
          <div className="col-lg">
            <div className="card">
              <Header />
              <div className="card-body">
                <div className="card-text">
                  <h5>Lisää kysymys ja sen vastaukset sekä mahdolliset yhteenvedot Matka-apuriin. Paina Lopuksi "Lähetä" -nappia</h5>
                  <div>
                    <form onSubmit={this.submitData}>
                      <br/>
                    <input disabled={this.state.disabledSubmit} type="submit" value="Lähetä" />
                    <br/>
                    <br/>
                      {QuestionListForm()}
                      <br />
                        {VastausObj()}
                      <br />
                      <br />
                      </form>
                    <button
                      className="addRemove btn btn-secondary"
                      onClick={this.addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                    <br/>
                    <br/>
                    <button
                      className="addRemove btn btn-secondary"
                      onClick={this.removeAnswerAndSummary}
                    >
                      Poista vastauskenttä
                    </button>
                    <br/>
                    <br/>
                  </div>
                  <Footer />
                </div>
              </div>
              {/* card-body */}
            </div>
            {/* card */}
          </div>
          {/* col */}
          <div className="col-sm"></div>
        </div>
        {/* row */}
      </div>
    );
  }
}

export default questionForm;

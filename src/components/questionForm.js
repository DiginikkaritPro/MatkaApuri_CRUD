//Jatkokysymykset SUCKS niiden paskamaiselle componentille pitää rautalangasta vääntää jotkut vitun idt

import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import {
  getLastQuestionId,
  getLastAnswerId,
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastFollowUpQuestionId,
  insertNewFollowUpQuestion
} from "../functions/ClientFunctions";

class questionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      followUpQuestionArray: [],
      disabledSubmit: true,
      disabledAnswer: false
    };
    
  }

  newQuestionId = 0;
  newQuestionIdForFollowUp = 0;
  newFollowUpQuestionId = 0;
  newAnswerId = 0;
  newAnswerIdForFollowUp = 0;
  allFollowUpAnswerIds = [];
  allAnswerIds = [];
  allFollowUpQuestionIds = [];

  componentDidMount = async () => {
    this.newQuestionId = await getLastQuestionId() + 1;
    this.newQuestionIdForFollowUp = await getLastQuestionId() +1;
    this.newAnswerId = await getLastAnswerId() + 1;
    this.newAnswerIdForFollowUp = await getLastAnswerId();
    this.newFollowUpQuestionId = await getLastFollowUpQuestionId();
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
    
    this.allAnswerIds.push(this.newAnswerId);
    this.newAnswerIdForFollowUp = this.allAnswerIds[this.allAnswerIds.length - 1]
    this.state.answersArray.push(
      this.AnswerListForm(this.newAnswerId),
      this.SummaryListForm(this.newAnswerId)
    );
    this.newAnswerId++
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

  addAnswerAndSummaryForFollowUp = () => {
    this.newAnswerIdForFollowUp++
    this.allFollowUpAnswerIds.push(this.newAnswerIdForFollowUp);
    
    this.state.followUpQuestionArray.push(
      this.AnswerListForm(this.newAnswerIdForFollowUp),
      this.SummaryListForm(this.newAnswerIdForFollowUp)
    );
    
    this.setState(
      {
        followUpQuestionArray: this.state.followUpQuestionArray,
      });
  } 

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
            aria-label="Text input with radio button"/>
        </div>
        <br/>
        <input id={'followUpQuestionCheckBox' + this.newAnswerIdForFollowUp + this.newQuestionIdForFollowUp + this.newFollowUpQuestionId} type="checkbox" onClick={this.followUpCheckBoxClicked}/>     Lisää jatkokysymys
        <br/>
        <br/>
        
      </div>
    );
  };
  followUpCheckBoxClicked = (e) => {
    if (e.target.checked === true){
      
      this.newQuestionIdForFollowUp++
      this.newFollowUpQuestionId++
      this.newAnswerIdForFollowUp++
      this.allFollowUpAnswerIds.push(this.newAnswerIdForFollowUp);
      this.allFollowUpQuestionIds.push(this.newFollowUpQuestionId)
      this.state.followUpQuestionArray.push(
        this.FollowUpQuestionListForm(this.newFollowUpQuestionId, this.newQuestionIdForFollowUp),
        this.AnswerListForm(this.newAnswerIdForFollowUp),
        this.SummaryListForm(this.newAnswerIdForFollowUp)
      );
      
      this.setState({
        followUpQuestionArray: this.state.followUpQuestionArray,
        disabledAnswer: true
      })
    }else {
      this.newQuestionIdForFollowUp--
      this.newFollowUpQuestionId--
      
      this.allFollowUpQuestionIds.pop()
      this.allFollowUpAnswerIds.pop();
      // this.state.followUpQuestionArray = this.state.followUpQuestionArray.filter((element, index) => {
      //   if (element === ) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // })
      this.newAnswerIdForFollowUp = this.allAnswerIds[this.allAnswerIds.length - 1]
      this.setState({
        followUpQuestionArray: this.state.followUpQuestionArray,
        disabledAnswer: false
      })
    }
  }

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

  FollowUpQuestionListForm = (newFollowUpQuestionId, newQuestionIdForFollowUp) => {
    console.log('renderöin ' + newFollowUpQuestionId)
    return (
      <div className="form-group">
        Jatkokysymys
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
            id={"inputID" + newFollowUpQuestionId}
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
            id={"textareaID" + newFollowUpQuestionId}
            aria-describedby="basic-addon1"
          />
        </div>
        <p>{`JatkokysymysID:${newFollowUpQuestionId}`}</p>
        <p>{`KysymysID:${newQuestionIdForFollowUp}`}</p>
        
      </div>
    );
  };

  submitData = () => {
    insertNewQuestion(this.newQuestionId, document.getElementById('inputID').value, document.getElementById('textareaID').value)
    this.allAnswerIds.forEach(ansId => {
      insertNewAnswers(ansId, this.newQuestionId, document.getElementById('answerInput' + ansId).value); 
      insertNewSummary(ansId, document.getElementById('headerInput' + ansId).value, document.getElementById('textAreaInput' + ansId).value, document.getElementById('linkInput' + ansId).value);
      if(document.getElementById('followUpQuestionCheckBox' + ansId).checked === true){
        this.allFollowUpQuestionIds.forEach(followUpId => {
          insertNewFollowUpQuestion(this.newQuestionIdForFollowUp, this.newFollowUpQuestionId, document.getElementById('inputID'+ followUpId).value, document.getElementById('textareaID' + followUpId).value)
          
        })
      }
      
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
        return( 
        <div>
          {e}
        </div>);
      });
    
    let JatkokysymysObj = () =>
    Array.from(this.state.followUpQuestionArray).map((e) => {
      return(
      
      <div id={`JatkokysymysComponent${this.newQuestionIdForFollowUp}`}>
        {e}
      <button
          type="button"
          className="addRemove btn btn-secondary"
          onClick={this.addAnswerAndSummaryForFollowUp}
        >
          Lisää vastauskenttä
        </button>
      </div> )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-lg-6">
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
                      type="button"
                      disabled={this.state.disabledAnswer}
                      className="addRemove btn btn-secondary"
                      onClick={this.addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                    <br/>
                    <br/>
                    <button
                      type="button"
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
          <div className="col-sm-4" >
          <div className="container">
          <div className="row">
          <div className="card card-text">
              
              <div className="card-body" >
               
          {JatkokysymysObj()}
          
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

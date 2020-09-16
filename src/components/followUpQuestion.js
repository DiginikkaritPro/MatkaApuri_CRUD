<<<<<<< HEAD
import {React, Header, Footer, getLastFollowUpQuestionId} from '../utils/Imports'

const followUpQuestion = () => {
  
  // removeAnswerAndSummary = () => {
    
  // }

  // AnswerListForm = (newAnswerIdForFollowUp) => {
  //   return (
  //     <div id={newAnswerIdForFollowUp}>
  //       <p> Vastaus </p>
  //       <div className="input-group">
  //         <div className="input-group-prepend">
  //           <div className="input-group-text">
  //             <input
  //               type="radio"
  //               aria-label="Radio button for following text input"
  //             />
  //           </div>
  //         </div>
=======
import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import { getLastFollowUpQuestionId } from "../functions/ClientFunctions";
import { NavLink } from "react-router-dom";
import { CRUDContext } from "./questionContext";

const FollowUpQuestion = () => {

  // useEffect(() => {

  // });

  const { 
    newFollowUpIdObject, 
    followUpAnswersArrayObject, 
    allAnswerIdsObject,
    disabledSubmitFollowUpObject, 
    allFollowUpQuestionIdsObject,
  } = useContext(CRUDContext);
  const [newFollowUpQuestionId, setNewFollowUpQuestionId] = newFollowUpIdObject;
  const [followUpAnswersArray, setfollowUpAnswersArray] = followUpAnswersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmitFollowUp, setDisabledSubmitFollowUp] = disabledSubmitFollowUpObject;
  const [allFollowUpQuestionIds, setAllFollowUpQuestionIds] = allFollowUpQuestionIdsObject;

  // TODO: newQuestionIdForFollowUp
  // TODO: newAnswerIdForFollowUp

  // TODO:
  // componentDidMount = async () => {
  //       this.newAnswerIdForFollowUp = this.props.allAnswerIds[this.props.allAnswerIds.length - 1];
  //       this.newFollowUpQuestionId = await getLastFollowUpQuestionId() + 1;
  //       this.newQuestionIdForFollowUp = this.props.newQuestionIdForFollowUp +1;
  // }
    
  const addAnswerAndSummaryForFollowUp = () => {
    setNewAnswerIdForFollowUp(newAnswerIdForFollowUp + 1);
    setAllAnswerIds(this.newAnswerIdForFollowUp); // TODO

    setFollowUpAnswersArray(prev => {
      return [...prev,
        AnswerListForm(this.newAnswerIdForFollowUp, true),
        SummaryListForm(this.newAnswerIdForFollowUp)
      ];
    });

    this.setState({
      allAnswerIds: this.state.allAnswerIds,
      disabledSubmitFollowUp: this.state.followUpAnswersArray.length < 1,
      followUpAnswersArray: this.state.followUpAnswersArray,
    });
  };
  
  const removeAnswerAndSummary = () => {
    this.newAnswerIdForFollowUp--
    this.state.allAnswerIds.pop()
    this.state.followUpAnswersArray.pop()
    this.state.followUpAnswersArray.pop()
    this.setState({
      allAnswerIds: this.state.allAnswerIds,
      disabledSubmitFollowUp: this.state.followUpAnswersArray.length < 1,
      followUpAnswersArray: this.state.followUpAnswersArray
    })
  }

  const AnswerListForm = (newAnswerIdForFollowUp) => {
    return (
      <div id={newAnswerIdForFollowUp}>
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
>>>>>>> a672897cacd4f091b6463d081e38277499f3d76d

  //         <input
  //           type="text"
  //           id={'answerInput' + newAnswerIdForFollowUp}
  //           className="form-control"
  //           aria-label="Text input with radio button"/>
  //       </div>
  //       <br/>
        
  //       <br/>
  //       <br/>
        
  //     </div>
  //   );
  // };

<<<<<<< HEAD
  //  summaryHandler = (event, id) => {
  //    event.preventDefault();
  //    if (document.getElementById(id).hidden) {
  //      document.getElementById(id).hidden = false;
  //    } else {
  //      document.getElementById(id).hidden = true;
  //    }
  //  };

  // SummaryListForm = (newAnswerIdForFollowUp) => {
  //   return (
  //     <div id={newAnswerIdForFollowUp}>
  //       <button
  //         onClick={(event) => {this.summaryHandler(event, 'hideableSummaryDiv' + newAnswerIdForFollowUp)}}
  //         className="summaryBtn btn btn-light"
  //       >
  //       Näytä/Piilota Yhteenveto
  //       </button>
  //       <div hidden={true} id={'hideableSummaryDiv' + newAnswerIdForFollowUp}>
=======
  const summaryHandler = (event, id) => {
    event.preventDefault();
    if (document.getElementById(id).hidden) {
      document.getElementById(id).hidden = false;
    } else {
      document.getElementById(id).hidden = true;
    }
  };

  const SummaryListForm = (newAnswerIdForFollowUp) => {
    return (
      <div id={newAnswerIdForFollowUp}>
        <button
          onClick={(event) => {this.summaryHandler(event, 'hideableSummaryDiv' + newAnswerIdForFollowUp)}}
          className="summaryBtn btn btn-light"
        >
        Näytä/Piilota Yhteenveto
        </button>
        <div hidden={true} id={'hideableSummaryDiv' + newAnswerIdForFollowUp}>
>>>>>>> a672897cacd4f091b6463d081e38277499f3d76d
          
  //         <div>
  //           <input
  //             id={'headerInput' + newAnswerIdForFollowUp}
  //             placeholder="Otsikko"
  //             type="text"
  //             name="OtsikkoText"
  //             className="form-control"
  //             aria-label="Text input with radio button"
  //           />
  //         </div>
  //         <div>
  //           <textarea
  //             id={'textAreaInput' + newAnswerIdForFollowUp}
  //             placeholder="Info"
  //             type="text"
  //             className="form-control"
  //             aria-label="Text input with radio button"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             id={'linkInput' + newAnswerIdForFollowUp}
  //             placeholder="Linkki"
  //             type="text"
  //             className="form-control"
  //             aria-label="Text input with radio button"
  //           />
  //         </div>
  //   <p>{`${newAnswerIdForFollowUp}`}</p>
        
  //       </div>
        
  //       <hr/>
  //     </div>
  //   );
  // }; 

<<<<<<< HEAD
  // FollowUpQuestionListForm = () => {
    
  //   return (
  //     <div id={"followUp" + this.newFollowUpQuestionId} className="form-group">
  //       Jatkokysymys
  //       <div className="input-group mb-3">
  //         <div className="input-group-prepend">
  //           <span className="input-group-text" id="basic-addon1">
  //             ?
  //           </span>
  //         </div>
  //         <input
  //           type="text"
  //           className="form-control"
  //           placeholder="Kirjoita kysymys tähän..."
  //           id={"inputID" + this.newFollowUpQuestionId}
  //           aria-describedby="basic-addon1"
  //         />
  //       </div>
  //       <div className="input-group mb-3">
  //         <div className="input-group-prepend">
  //           <span className="input-group-text" id="basic-addon1">
  //             info
  //           </span>
  //         </div>
  //         <textarea
  //           type="text"
  //           className="form-control"
  //           placeholder="Lisätietoja tähän..."
  //           id={"textareaID" + this.newFollowUpQuestionId}
  //           aria-describedby="basic-addon1"
  //         />
  //       </div>
  //       <p>{`JatkokysymysID:${this.newFollowUpQuestionId}`}</p>
  //       <p>{`KysymysID:${this.newQuestionIdForFollowUp}`}</p>
  //     </div>
  //   );
  // };

    let VastausObj = () => 
      Array.from(this.state.answersArray).map((e) => {
        return( 
        <div>
          {e}
        </div>);
      })
   
=======
  const FollowUpQuestionListForm = () => {
    
    return (
      <div id={"followUp" + this.newFollowUpQuestionId} className="form-group">
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
            id={"inputID" + this.newFollowUpQuestionId}
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
            id={"textareaID" + this.newFollowUpQuestionId}
            aria-describedby="basic-addon1"
          />
        </div>
        <p>{`JatkokysymysID:${this.newFollowUpQuestionId}`}</p>
        <p>{`KysymysID:${this.newQuestionIdForFollowUp}`}</p>
      </div>
    );
  };
  
  const VastausObj = () => 
    Array.from(followUpAnswersArray).map((e) => {
      return( 
      <div>
        {e}
      </div>);
    });

>>>>>>> a672897cacd4f091b6463d081e38277499f3d76d
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-lg-8">
              <div className="card">
                <Header />
                <div className="card-body">
                  <div className="card-text">
                    <h5>Jatkokysymys formi:</h5>
                    <div>
                        {this.FollowUpQuestionListForm()}
                      {/* <form onSubmit={this.submitData}> */}
                      <br />
                      {VastausObj()}
                      {/* {JatkokysymysObj()} */}
<<<<<<< HEAD
                      
=======
                      <NavLink to={{pathname: '/createquestion'}}>
                      <input
                        className="sendBtn btn btn-secondary"
                        disabled={disabledSubmitFollowUp}
                        type="button"
                        value="Tallenna jatkokysymys"
                      />
                      </NavLink>
>>>>>>> a672897cacd4f091b6463d081e38277499f3d76d
                      <br />
                      <br />
                      {/* {QuestionListForm()} */}
                      <br />
                      {/* {VastausObj()} */}
                      <br />
                      <br />
                      {/* </form>  */}
                      
                      <div>
                        <span>
                          <button
                            className="addRemove btn btn-secondary"
                            onClick={this.addAnswerAndSummaryForFollowUp}
                          >
                            Lisää vastauskenttä
                          </button>
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <button
                            className="addRemove btn btn-secondary"
                            onClick={this.removeAnswerAndSummary}
                          >
                            Poista vastauskenttä
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      
    );
<<<<<<< HEAD
  }

=======
  
}
>>>>>>> a672897cacd4f091b6463d081e38277499f3d76d

export default FollowUpQuestion;

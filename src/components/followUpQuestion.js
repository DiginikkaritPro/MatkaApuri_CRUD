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
  }


export default followUpQuestion;

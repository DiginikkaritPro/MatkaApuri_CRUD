import {
  React,
  useContext,
  useEffect,
  Header,
  Footer,
  CRUDContext,
  QuestionListForm,
  AnswerListForm,
  SummaryListForm,
  getLastAnswerId,
  insertNewSummary,
  insertNewQuestion,
  insertNewAnswers,
  getQuestionById,
  getQuestionsNotFollowUp,
  QuestionPanelHeader,
  QuestionsPanelTable
} from "../utils/Imports";

const CreateQuestion = () => {
  
  useEffect(() => {
    if(newAnswerId === 0){
    getNewAnswerId();
    getQNFU();
    }
    
  
    
  });

  let getQNFU = async() => {
    if (!questionsPanelArray || questionsPanelArray.length === 0) {
      const qnfu = await getQuestionsNotFollowUp();
      setQuestionsPanelArray(qnfu);
    }
}

  let getNewAnswerId = async () => {
    const response = await getLastAnswerId();
    setNewAnswerId(response + 1);
  };

  const {
    newQuestionIdObject,
    newFollowUpIdObject,
    answersArrayObject,
    allAnswerIdsObject,
    disabledSubmitObject,
    newAnswerIdObject,
    questionsPanelArrayObject,
    followUpAmountObject,
    followUpCheckedObject,
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

  // const removeAnswerAndSummary = () => {
  //   console.log(newAnswerId);

  //   setNewAnswerId(newAnswerId - 1);

  //   allAnswerIds.pop();
  //   setAllAnswerIds(allAnswerIds);

  //   // Poistetaan vastaus- ja yhteenveto-objekti arraystä
  //   answersArray.pop();
  //   answersArray.pop();
  //   setAnswersArray(answersArray);

  //   setDisabledSubmit(answersArray.length < 1);
  // };

  const addAnswerAndSummary = () => {
    setNewAnswerId(newAnswerId + 1);
    setAllAnswerIds((prevNewAnswerIds) => {
      return [...prevNewAnswerIds, newAnswerId];
    });
    setAnswersArray((prevAnswersArray) => {
      return [
        ...prevAnswersArray,
        AnswerListForm(newAnswerId, followUpAmount, setFollowUpAmount),
        SummaryListForm(newAnswerId),
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
        document.getElementById("answerInput" + ansId).value
      );
      insertNewSummary(
        ansId,
        document.getElementById("headerInput" + ansId).value,
        document.getElementById("textAreaInput" + ansId).value,
        document.getElementById("linkInput" + ansId).value
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

    const editQuestion = async (kysymysID) => {
      let question = await getQuestionById(kysymysID);
      if (!question || !question.data) {
        return;
      }
      question = question.data.kysymysid;
      if (!question || question.length === 0) {
        return;
      }
      document.getElementById("inputID").value = question[0].KysymysTXT;
      document.getElementById("textareaID").value = question[0].KysymysINFO;
    }

    const removeQuestion = (kysymysID) => {
      // delQuestion(kysymysID);

      // TODO Päivitä eli rerenderöi <QuestionsPanelTable>

      // TODO Poista kysymys ja sen vastaukset, info, jatkokysymykset ja jatkovastaukset.
      // Tyhjennä kysymyskentät tai valitse edellinen kysymys, jos sellainen on olemassa.
      // Huom! delQuestion() ei poista jatkokysymyksiä ja niiden vastauksia!
      
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
              <div className="card">
                <QuestionPanelHeader />
                <div className="card card-text">
                  <span style={{ textAlign: "right"}}>
                      <button className="btn btn-secondary summaryBtn"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-type="info"
                            title="Lisää uusi kysymys"
                            >
                      Lisää uusi kysymys
                    </button>
                  </span>
                  <div className="card-body">
                    <QuestionsPanelTable questions={questionsPanelArray} 
                      editQuestionClick={editQuestion} deleteQuestionClick={removeQuestion}/>
                  </div>
                </div>
              </div>
            </div>
          
        
        <div className="col-lg-7">
          <div className="card">
            <Header />
            <div className="card-body">
              <div className="card-text">
                <h5>
                  Lisää kysymys ja sen vastaukset sekä mahdolliset yhteenvedot
                  Matka-apuriin. Paina Lopuksi "Lähetä" -nappia
                </h5>
                <div>
                  <form onSubmit={submitData}>
                    <br /> 
                    <span style={{ float: "right" }}>
                      <button
                        className="btn btn-secondary"
                        disabled={disabledSubmit}
                        type="submit" 
                      >Lähetä</button>
                    </span>   
                    <br />
                    <br />
                    {/* {QuestionListForm()} */}
                    <QuestionListForm newQuestionId={`${newQuestionId}`} />
                    <br />
                    {VastausObj()}
                    <br />
                    <br />
                  </form>
                  <span style={{ float: "right" }}>
                    <button
                      type="button"
                      className="addRemove btn btn-secondary"
                      onClick={addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                  </span>
                  <br />
                  <br />
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
        </div>
      </div>
  );
};

export default CreateQuestion;

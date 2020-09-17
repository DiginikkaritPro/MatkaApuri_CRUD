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
    console.log(answersArray)
    console.log(newAnswerId)
    console.log(allAnswerIds)
    
  });

  let getQNFU = async() => {
    if (!questionsPanelArray || questionsPanelArray.length === 0) {
      const qnfu = await getQuestionsNotFollowUp();
      setQuestionsPanelArray(qnfu);
    }
}

  let getNewAnswerId = async () => {
    const response = await getLastAnswerId();
    setNewAnswerId(response);
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

  

  
  const addAnswerAndSummary = () => {
    const newId = newAnswerId + 1
     setNewAnswerId(newId)
     setAllAnswerIds((prevNewAnswerIds) => {
      return [...prevNewAnswerIds, newId];
    })
     setAnswersArray((prevAnswersArray) => {
      return [
        ...prevAnswersArray,
        <div id={newId}>
        <AnswerListForm id={newId} amount={followUpAmount} setAmount={setFollowUpAmount}/>
        <SummaryListForm id={newId}/>
        </div>
      ];
    })

    //setNewAnswerId(newAnswerId);
    
    setDisabledSubmit(answersArray.length === 0);
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
            {/* <div id="deleteObj" hidden={true} className="container"> */}
              <div className="row">
              <div className="card">
                <QuestionPanelHeader />
                <div className="card card-text">
                  <div className="card-body">
                    <QuestionsPanelTable questions={questionsPanelArray} 
                      editQuestionClick={editQuestion} deleteQuestionClick={removeQuestion}/>
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
                    <QuestionListForm newQuestionId={`${newQuestionId}`} />
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

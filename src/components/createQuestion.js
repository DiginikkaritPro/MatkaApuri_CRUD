import { insertNewFollowUpQuestion } from "../functions/ClientFunctions";
import {
  React,
  useContext,
  useEffect,
  useState,
  Header,
  Footer,
  CRUDContext,
  QuestionListForm,
  AnswerListForm,
  getSummaryById,
  SummaryListForm,
  getLastAnswerId,
  getAnswersById,
  insertNewSummary,
  insertNewQuestion,
  insertNewAnswers,
  getQuestionById,
  getQuestionsNotFollowUp,
  delQuestion,
  QuestionPanelHeader,
  QuestionsPanelTable,
  getLastQuestionId,
  getLastFollowUpQuestionId,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries
} from "../utils/Imports";


const CreateQuestion = () => {

  const [isNewQuestion, setIsNewQuestion] = useState(true)
  const [editQuestionId, setEditQuestionId] = useState(0)
  const [followUp, setFollowUp] = useState(false)

  useEffect(() => {
    if (newAnswerId === 0) {
      getNewAnswerId();
      getNormalQuestions();
    }
    if (questionArray.length === 0) {
      addNewQuestion();
    }
    console.log(followUpAmount)
    console.log("jatkokysymysID:" + newFollowUpQuestionId)
  });

  let getNormalQuestions = async () => {
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
    questionArrayObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [questionArray, setQuestionArray] = questionArrayObject;
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
    let newAnswersArrayLength = answersArray.length + 1;
    setAnswersArray((prevAnswersArray) => {
      return [
        ...prevAnswersArray,
        <div id={newId}>
          <AnswerListForm id={newId} txt={""} />
          <SummaryListForm otsikko={""} info={""} linkki={""} id={newId} />
        </div>
      ];
    })

    setDisabledSubmit(newAnswersArrayLength === 0);
  };

  const submitData = async () => {
    
    if (isNewQuestion === false) {

      await updateDbQuestion(
        editQuestionId,
        document.getElementById("inputID").value,
        document.getElementById("textareaID").value
      )
      allAnswerIds.forEach(async (ansId) => {
        await updateDbAnswers(
          ansId,
          document.getElementById("answerInput" + ansId).value
        )
        await updateDbSummaries(
          ansId,
          document.getElementById("headerInput" + ansId).value,
          document.getElementById("textAreaInput" + ansId).value,
          document.getElementById("linkInput" + ansId).value
        )
      })

    }
    else {
      if (followUp === true) {
        await insertNewFollowUpQuestion(
          newQuestionId,
          newFollowUpQuestionId,
          document.getElementById("inputID").value,
          document.getElementById("textareaID").value
        )
      } else {
        await insertNewQuestion(
          newQuestionId,
          document.getElementById("inputID").value,
          document.getElementById("textareaID").value
        );
      }
      let fupIDCounter = newFollowUpQuestionId
      
      allAnswerIds.forEach(async (ansId) => {
        let fupID = ""
        
        if(followUpChecked === false || followUp === true){
          fupID = ""
        }
        else{
          fupID = fupIDCounter;
          fupIDCounter++
        }
        await insertNewAnswers(
          ansId,
          newQuestionId,
          document.getElementById("answerInput" + ansId).value,
          fupID
        );
        await insertNewSummary(
          ansId,
          document.getElementById("headerInput" + ansId).value,
          document.getElementById("textAreaInput" + ansId).value,
          document.getElementById("linkInput" + ansId).value
        );
      });
    }

    if (followUp === true) {
      setFollowUpAmount(prev => {
        let array = [...prev]
        array.splice(0,1)
        return array
      })
      setNewAnswerId(newAnswerId + 1)
      setNewFollowUpQuestionId(newFollowUpQuestionId + 1)
    }

    if (followUpAmount.length > 0) {
      setFollowUp(true)
    } else {
      setFollowUp(false)
    }
   
    addNewQuestion();
    const qnfu = await getQuestionsNotFollowUp();
    setQuestionsPanelArray(qnfu);
  };

  let VastausObj = () =>
    Array.from(answersArray).map((e) => {
      return <div>{e}</div>;
    });
  let KysymysObj = () =>
    Array.from(questionArray).map((e) => {
      return <div>{e}</div>
    })
  const editQuestion = async (kysymysID) => {
    setDisabledSubmit(false)
    setIsNewQuestion(false);

    let question = await getQuestionById(kysymysID);
    if (!question || !question.data) {
      return;
    }
    question = question.data.kysymysid;
    if (!question || question.length === 0) {
      return;
    }
    let questionArray = []
    questionArray.push(
      <div id={kysymysID}>
        <QuestionListForm txt={question[0].KysymysTXT} info={question[0].KysymysINFO} />
      </div>
    )

    let answer = await getAnswersById(kysymysID);

    if (!answer || !answer.data) {
      return;
    }
    answer = answer.data.vastausid;
    if (!answer || answer.length === 0) {
      return;
    }
    //Luodaan paikallinen array vastaus ja yhteenveto komponenteille ja pusketaan sen sisältö
    let answersAndSummary = []
    let answerIds = []
    answer.forEach(async (answer) => {
      answerIds.push(answer.VastausID)
      let summary = await getSummaryById(answer.VastausID);
      console.log(summary)
      let otsikko = "", info = "", linkki = "";
      if (summary && summary.data) {
        summary = summary.data.yhteenvetostack;
        if (summary && summary.length > 0) {
          otsikko = summary[0].Otsikko;
          info = summary[0].InfoTXT;
          linkki = summary[0].Linkki;
          console.log(otsikko)
        }
      }

      answersAndSummary.push(
        <div id={answer.VastausID}>
          <AnswerListForm id={answer.VastausID} txt={answer.VastausTXT} amount={followUpAmount} setAmount={setFollowUpAmount} />
          <SummaryListForm otsikko={otsikko} info={info} linkki={linkki} id={answer.VastausID} />
        </div>
      )
    })

    const newId = await getLastAnswerId()
    setEditQuestionId(kysymysID)
    setNewAnswerId(newId)
    setAllAnswerIds(answerIds)
    setAnswersArray(answersAndSummary)
    setQuestionArray(questionArray)
  }

  const removeQuestion = async (kysymysID) => {
    await delQuestion(kysymysID);
    setQuestionsPanelArray(prev => {
      return prev.filter(e => {
        return e.KysymysID !== kysymysID;
      })
    })
    await addNewQuestion();
  }

  const addNewQuestion = async () => {

    setIsNewQuestion(true);

    let resetAnswerId = await getLastAnswerId();
    let resetQuestionId = (await getLastQuestionId()) + 1;
 
    let resetAnswersArray = [];
    let resetAllAnswerIds = [];
    let resetQuestionArray = [];
    resetQuestionArray.push(
      <div>
        <QuestionListForm txt={""} info={""} newQuestionId={resetQuestionId} />
      </div>
    )

    setAnswersArray(resetAnswersArray);
    setAllAnswerIds(resetAllAnswerIds);
    setNewAnswerId(resetAnswerId);
    setNewQuestionId(resetQuestionId);
    setQuestionArray(resetQuestionArray)

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-5">
          <div className="card">
            <QuestionPanelHeader />
            <div className="card card-text">
              <span style={{ textAlign: "right" }}>
                <button className="btn btn-secondary summaryBtn"
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
                <QuestionsPanelTable questions={questionsPanelArray}
                  editQuestionClick={editQuestion} deleteQuestionClick={removeQuestion} />
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
                  <form >
                    <br />
                    <span style={{ float: "right" }}>
                      <button
                        onClick={submitData}
                        className="btn btn-secondary"
                        disabled={disabledSubmit}
                        type="button"
                      >Tallenna
                      </button>
                    </span>
                    <br />
                    <br />
                    {KysymysObj()}
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

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
  SummaryListForm,
  getLastAnswerId,
  insertNewSummary,
  insertNewQuestion,
  insertNewAnswers,
  getQuestionsNotFollowUp,
  getLastQuestionId,
  getLastFollowUpQuestionId,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries,
} from "../utils/Imports";

const CreateQuestion = () => {
  const [followUp, setFollowUp] = useState(false);

  useEffect(() => {
    if (newAnswerId === 0) {
      getNewAnswerId();
      getNormalQuestions();
    }
    if (questionArray.length === 0) {
      getNewQuestionId();
    }

    console.log("allAnswerIDs" + allAnswerIds);
  });

  let getNewQuestionId = async () => {
    let newQid = (await getLastQuestionId()) + 1;
    await setNewQuestionId(newQid);
    await setQuestionArray([
      <div>
        <QuestionListForm txt={""} info={""} newQuestionId={newQuestionId} />
      </div>,
    ]);
    // questionArray.push(

    // )
  };

  let getNormalQuestions = async () => {
    if (!questionsPanelArray || questionsPanelArray.length === 0) {
      const qnfu = await getQuestionsNotFollowUp();
      setQuestionsPanelArray(qnfu);
    }
  };

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
    questionArrayObject,
    editQuestionIdObject,
    isNewQuestionObject
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
  const [editQuestionId, setEditQuestionId] = editQuestionIdObject;
  const [isNewQuestion, setIsNewQuestion] = isNewQuestionObject;

  const addAnswerAndSummary = () => {
    const newId = newAnswerId + 1;
    setNewAnswerId(newId);
    setAllAnswerIds((prevNewAnswerIds) => {
      return [...prevNewAnswerIds, newId];
    });
    let newAnswersArrayLength = answersArray.length + 1;
    setAnswersArray((prevAnswersArray) => {
      return [
        ...prevAnswersArray,
        <div id={newId}>
          <AnswerListForm id={newId} txt={""} />
          <SummaryListForm otsikko={""} info={""} linkki={""} id={newId} />
        </div>,
      ];
    });

    setDisabledSubmit(newAnswersArrayLength === 0);
  };

  const submitData = async () => {
    setFollowUpChecked(false);
    if (isNewQuestion === false) {
      await updateDbQuestion(
        editQuestionId,
        document.getElementById("inputID").value,
        document.getElementById("textareaID").value
      );
      allAnswerIds.forEach(async (ansId) => {
        await updateDbAnswers(
          ansId,
          document.getElementById("answerInput" + ansId).value
        );
        await updateDbSummaries(
          ansId,
          document.getElementById("headerInput" + ansId).value,
          document.getElementById("textAreaInput" + ansId).value,
          document.getElementById("linkInput" + ansId).value
        );
      });
    } else {
      let isFollowUp = followUp;
      if (isFollowUp === true) {
        await insertNewFollowUpQuestion(
          newQuestionId,
          newFollowUpQuestionId,
          document.getElementById("inputID").value,
          document.getElementById("textareaID").value
        );
      } else {
        await insertNewQuestion(
          newQuestionId,
          document.getElementById("inputID").value,
          document.getElementById("textareaID").value
        );
      }
      let fupIDCounter = newFollowUpQuestionId;

      allAnswerIds.forEach(async (ansId) => {
        let fupID = "";

        if (followUpChecked === false || followUp === true) {
          fupID = "";
        } else {
          fupID = fupIDCounter;
          fupIDCounter++;
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
      setFollowUpAmount((prev) => {
        let array = [...prev];
        array.splice(0, 1);
        return array;
      });
      setNewAnswerId(newAnswerId + 1);
      setNewFollowUpQuestionId(newFollowUpQuestionId + 1);
    }

    if (followUpAmount.length > 1) {
      setFollowUp(true);
    } else {
      setFollowUp(false);
    }

    const qnfu = await getQuestionsNotFollowUp();
    setQuestionsPanelArray(qnfu);
  };

  let VastausObj = () =>
    Array.from(answersArray).map((e) => {
      return <div>{e}</div>;
    });
  let KysymysObj = () =>
    Array.from(questionArray).map((e) => {
      return <div>{e}</div>;
    });


  return (
    <div className="container">
          <div className="card">
            <Header />
            <div className="card-body">
              <div className="card-text">
                <h5>
                  Lisää kysymys ja sen vastaukset sekä mahdolliset yhteenvedot
                  Matka-apuriin. Paina Lopuksi "Lähetä" -nappia
                </h5>
                <div>
                  <form>
                    <br />
                    <span style={{ float: "right" }}>
                      <button
                        onClick={submitData}
                        className="btn btn-secondary"
                        disabled={disabledSubmit}
                        type="button"
                      >
                        Tallenna
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
  );
};

export default CreateQuestion;

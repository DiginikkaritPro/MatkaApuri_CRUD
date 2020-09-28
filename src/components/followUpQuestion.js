import { insertNewFollowUpQuestion } from "../functions/ClientFunctions";
import {
  React,
  CreateHeader,
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
  FollowUpHeader,
} from "../utils/Imports";

const FollowUpQuestion = (props) => {
  const {
    newQuestionIdObject,
    newFollowUpIdObject,
    followUpAnswersArrayObject,
    followUpAllAnswerIdsObject,
    disabledSubmitObject,
    newAnswerIdObject,
    questionsPanelArrayObject,
    followUpAmountObject,
    isFollowUpObject,
    followUpQuestionArrayObject,
    editQuestionIdObject,
    isNewQuestionObject,
    questionIdForFollowUpObject,
    questionArrayObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [followUpQuestionArray, setFollowUpQuestionArray] = followUpQuestionArrayObject;
  const [newFollowUpQuestionId, setNewFollowUpQuestionId] = newFollowUpIdObject;
  const [followUpAnswersArray, setFollowUpAnswersArray] = followUpAnswersArrayObject;
  const [followUpAllAnswerIds, setFollowUpAllAnswerIds] = followUpAllAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;
  const [followUpAmount, setFollowUpAmount] = followUpAmountObject;
  const [isFollowUp, setIsFollowUp] = isFollowUpObject;
  const [editQuestionId, setEditQuestionId] = editQuestionIdObject;
  const [isNewQuestion, setIsNewQuestion] = isNewQuestionObject;
  const [questionIdForFollowUp, setQuestionIdForFollowUp] = questionIdForFollowUpObject;
  const [questionArray, setQuestionArray] = questionArrayObject

  useEffect(() => {
    // if (newAnswerId === 0) {
    //   getNewAnswerId();
    //   getNormalQuestions();
    // }
    if (followUpQuestionArray.length === 0) {
      getNewQuestionId();
    }
  });

  let getNewQuestionId = async () => {
    let newQid = (await getLastQuestionId()) + 1;
    await setNewQuestionId(newQid);
    await setFollowUpQuestionArray([
      <div id={newQuestionId}>
        <QuestionListForm txt={""} info={""} newQuestionId={newQuestionId} />
      </div>,
    ]);
  };
  let VastausObj = () =>
    Array.from(followUpAnswersArray).map((e) => {
      return <div>{e}</div>;
    });
  let KysymysObj = () =>
    Array.from(followUpQuestionArray).map((e) => {
      return <div>{e}</div>;
    });

  let submitData = async () => {
    let questionText = document.getElementById("inputID").value;
    let questionInfo = document.getElementById("textareaID").value;
    let answerTexts = [];
    let summaryHeaders = [];
    let summaryInfos = [];
    let summaryLinks = [];
    followUpAllAnswerIds.forEach((ansId) => {
      answerTexts.push(document.getElementById("answerInput" + ansId).value);
      summaryHeaders.push(document.getElementById("headerInput" + ansId).value);
      summaryInfos.push(document.getElementById("textAreaInput" + ansId).value);
      summaryLinks.push(document.getElementById("linkInput" + ansId).value);
    });

    await insertNewFollowUpQuestion(
      questionIdForFollowUp,
      newFollowUpQuestionId,
      questionText,
      questionInfo
    );

    for (let i = 0; i < followUpAllAnswerIds.length; i++) {
      let ansId = followUpAllAnswerIds[i];
      let fupID = "";
      await insertNewAnswers(
        ansId,
        questionIdForFollowUp,
        answerTexts[i],
        fupID
      );
      await insertNewSummary(
        ansId,
        summaryHeaders[i],
        summaryInfos[i],
        summaryLinks[i]
      );
    }

    setNewFollowUpQuestionId(newFollowUpQuestionId + 1);
    setIsFollowUp(!isFollowUp);
    setQuestionIdForFollowUp(questionIdForFollowUp + 1);
    setQuestionArray(prev => {
      return prev
    })
  };

  const addAnswerAndSummary = () => {
    const newId = newAnswerId + 1;
    setNewAnswerId(newId);
    setFollowUpAllAnswerIds((prevNewAnswerIds) => {
      return [...prevNewAnswerIds, newId];
    });
    let newAnswersArrayLength = followUpAnswersArray.length + 1;
    setFollowUpAnswersArray((prevAnswersArray) => {
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

  return (
    <div className="container">
      <div className="card">
        <FollowUpHeader />
        <div className="card-body">
          <div className="card-text">
            <h5>Lisää jatkokysymys ja sen vastaukset.</h5>
            <div>
              <form>
                <br />
                <span style={{ float: "right" }}>
                  <button
                    onClick={submitData}
                    className="btn btn-secondary greyBtn"
                    disabled={disabledSubmit}
                    type="button"
                  >
                    Tallenna
                  </button>
                </span>
                <br />
                <br />
                {KysymysObj()}
                <span style={{ float: "right" }}>
                  <button
                    type="button"
                    className="btn btn-secondary greyBtn"
                    onClick={addAnswerAndSummary}
                  >
                    Lisää vastauskenttä
                  </button>
                </span>
                <br />
                <br />
                <br />
                {VastausObj()}
                <br />
                <br />
              </form>

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

export default FollowUpQuestion;

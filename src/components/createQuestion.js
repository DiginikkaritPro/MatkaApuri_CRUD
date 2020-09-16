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
} from "../utils/Imports";

const CreateQuestion = () => {
  useEffect(() => {
    if (newAnswerId === 0) {
      getNewAnswerId();
    }
    console.log(followUpAmount);
  });
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
    followUpAmountObject,
    followUpCheckedObject,
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [newFollowUpQuestionId, setNewFollowUpQuestionId] = newFollowUpIdObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [followUpAmount, setFollowUpAmount] = followUpAmountObject;
  const [followUpChecked, setFollowUpChecked] = followUpCheckedObject;

  const removeAnswerAndSummary = () => {
    console.log(newAnswerId);

    setNewAnswerId(newAnswerId - 1);

    allAnswerIds.pop();
    setAllAnswerIds(allAnswerIds);

    // Poistetaan vastaus- ja yhteenveto-objekti arraystä
    answersArray.pop();
    answersArray.pop();
    setAnswersArray(answersArray);

    setDisabledSubmit(answersArray.length < 1);
  };

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
                  <button
                    type="button"
                    className="addRemove btn btn-secondary"
                    onClick={removeAnswerAndSummary}
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
                  <button type="button" className="addRemove btn btn-secondary">
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
};

export default CreateQuestion;

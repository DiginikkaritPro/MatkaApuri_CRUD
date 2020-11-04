import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import { updateDbQuestion } from "../../functions/ClientFunctions";
import { CRUDContext } from "../../components/questionContext";

const QuestionEditForm = (props) => {
  const { currentQuestionObject, treeStructureObject } = useContext(
    CRUDContext
  );
  const [treeStructure, setTreeStructure] = treeStructureObject;
  const [currentQuestion, setCurrentQuestion] = currentQuestionObject;

  const [textFieldContent, setTextFieldContent] = useState("");
  const [infoFieldContent, setInfoFieldContent] = useState("");
  const [showQuestionSavedAlert, setShowQuestionSavedAlert] = useState(false);

  useEffect(() => {
    setTextFieldContent(props.txt);
    setInfoFieldContent(props.info);
    setShowQuestionSavedAlert(false);
  }, [props.txt, props.info]);

  const textFieldChange = (e) => {
    setTextFieldContent(e.target.value);
    setShowQuestionSavedAlert(false);
  };

  const infoFieldChange = (e) => {
    setInfoFieldContent(e.target.value);
    setShowQuestionSavedAlert(false);
  };

  const submitQuestion = async () => {
    if (
      !currentQuestion ||
      !props.questionID ||
      props.questionID === "0" ||
      props.questionID === "-1"
    ) {
      return;
    }

    //console.log(`Update DB question: ID=${props.questionID} txt="${textFieldContent}" info="${infoFieldContent}"`);

    // Tämä toimii, kun tallennetaan sekä pää- että jatkokysymykseen tehdyt muutokset
    await updateDbQuestion(
      props.questionID,
      textFieldContent,
      infoFieldContent
    );

    setShowQuestionSavedAlert(true);

    // Ladataan puu uudelleen, jotta päivitetty kysymys tulee näkyviin
    setTreeStructure((prev) => {
      return {
        array: [],
        selectedTreeItemId: prev.selectedTreeItemId,
      };
    });
  };

  return (
    <div className="container">
      <div className="card">
        <header
          className={
            currentQuestion && currentQuestion.JatkokysymysID
              ? "followUpHeader"
              : "createHeader"
          }
        >
          <h1>
            {currentQuestion && currentQuestion.JatkokysymysID
              ? "Jatkokysymys"
              : "Kysymys"}
          </h1>
        </header>
        <div className="card-body">
          <div className="card-text">
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
                id="questionTextInput"
                aria-describedby="basic-addon1"
                value={textFieldContent}
                onChange={textFieldChange}
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
                id="questionInfoInput"
                aria-describedby="basic-addon1"
                value={infoFieldContent}
                onChange={infoFieldChange}
              />
            </div>

            <Alert
              show={showQuestionSavedAlert}
              variant="success"
              onClose={() => setShowQuestionSavedAlert(false)}
              dismissible
            >
              Kysymys tallennettu.
            </Alert>

            <button
              type="button"
              onClick={submitQuestion}
              className="btn btn-secondary greyBtn"
              disabled={currentQuestion == null}
            >
              Tallenna
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditForm;

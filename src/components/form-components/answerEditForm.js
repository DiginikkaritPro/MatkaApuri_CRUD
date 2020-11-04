import React, { useState, useEffect, useContext } from 'react'
import { Alert } from "react-bootstrap";
import {updateDbAnswers, updateDbSummaries} from '../../functions/ClientFunctions'
import {CRUDContext} from '../../components/questionContext'

const AnswerEditForm = (props) => {
    const {
      currentAnswerAndInfoObject,
      treeStructureObject
    } = useContext(CRUDContext);
    const [currentAnswerAndInfo, setCurrentAnswerAndInfo] = currentAnswerAndInfoObject;
    const [treeStructure, setTreeStructure] = treeStructureObject;

    const [textFieldContent, setTextFieldContent] = useState("");
    const [infoTitleFieldContent, setInfoTitleFieldContent] = useState("");
    const [infoTextFieldContent, setInfoTextFieldContent] = useState("");
    const [linkFieldContent, setLinkFieldContent] = useState("");
    const [showAnswerSavedAlert, setShowAnswerSavedAlert] = useState(false);

    useEffect(() => {
        setTextFieldContent(props.answerTxt);
        setInfoTitleFieldContent(props.infoTitle);
        setInfoTextFieldContent(props.infoTxt);
        setLinkFieldContent(props.infoLink);
        setShowAnswerSavedAlert(false);
      }, 
      [props.answerTxt, props.infoTitle, props.infoTxt, props.infoLink]
    );

    const submitAnswer = async () => {
        console.log(`Update DB answer: ID=${props.answerID} txt=${textFieldContent}`);
        console.log(`Update DB info: ID=${props.answerID} ots=${infoTitleFieldContent} info="${infoTextFieldContent}" link=${linkFieldContent}`);
        if (!currentAnswerAndInfo || !props.answerID || props.answerID === "0" || props.answerID === "-1") {
            return;
        }
        const fupid = props.followUpQuestionID || "";
        await updateDbAnswers(props.questionID, textFieldContent, fupid);
        await updateDbSummaries(props.questionID, infoTitleFieldContent, 
          infoTextFieldContent, linkFieldContent);

        setShowAnswerSavedAlert(true);  

        // Ladataan puu uudelleen
        setTreeStructure(prev => {
          return {
            array: [],
            selectedTreeItemId: prev.selectedTreeItemId
          };
        });  
    };

    const textFieldChange = e => {
        setTextFieldContent(e.target.value);
        setShowAnswerSavedAlert(false); 
    };

    const infoTitleFieldChange = e => {
        setInfoTitleFieldContent(e.target.value);
        setShowAnswerSavedAlert(false); 
    };

    const infoTextFieldChange = e => {
        setInfoTextFieldContent(e.target.value);
        setShowAnswerSavedAlert(false); 
    };

    const linkFieldChange = e => {
        setLinkFieldContent(e.target.value);
        setShowAnswerSavedAlert(false); 
    };

  return (
    <div className="container">
      <div className="card">
        <header className={(currentAnswerAndInfo && currentAnswerAndInfo.isFollowUpAnswer) ? "followUpHeader" : "createHeader"}>
          <h1>{(currentAnswerAndInfo && currentAnswerAndInfo.isFollowUpAnswer) ? "Jatkovastaus" : "Vastaus"}</h1>
        </header>
        <div className="card-body">
          <div className="card-text">
            <p>Vastaus:</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  ?
              </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Kirjoita vastaus tähän..."
                id="answerTxtInput"
                aria-describedby="basic-addon1"
                value={textFieldContent}
                onChange={textFieldChange}
              />
            </div>

            <p>Loppuyhteenvetoon tulevat tiedot:</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Otsikko
              </span>
              </div>
              <textarea
                type="text"
                className="form-control"
                placeholder="Yhteenvedon otsikko tähän..."
                id="infoTitleInput"
                aria-describedby="basic-addon1"
                value={infoTitleFieldContent}
                onChange={infoTitleFieldChange}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Info
              </span>
              </div>
              <textarea
                type="text"
                className="form-control"
                placeholder="Yhteenvedon tiedot tähän..."
                id="infoTxtInput"
                aria-describedby="basic-addon1"
                value={infoTextFieldContent}
                onChange={infoTextFieldChange}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Linkki
              </span>
              </div>
              <textarea
                type="text"
                className="form-control"
                placeholder="Linkit tähän pilkuilla eroteltuina..."
                id="infoLinkInput"
                aria-describedby="basic-addon1"
                value={linkFieldContent}
                onChange={linkFieldChange}
              />
            </div>

            <Alert
              show={showAnswerSavedAlert}
              variant="success"
              onClose={() => setShowAnswerSavedAlert(false)}
              dismissible
            >
              Vastaus tallennettu.
            </Alert>

            <button type="button" onClick={submitAnswer} 
              className="btn btn-secondary greyBtn" disabled={currentAnswerAndInfo == null}>
              Tallenna
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerEditForm;

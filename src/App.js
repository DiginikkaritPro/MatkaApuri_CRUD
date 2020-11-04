import { Modal, Button } from "react-bootstrap";
import "./App.css";
import "./MediaQueries.css";

import { 
  React,
  useEffect,
  useContext,
  CRUDContext,
  getLastAnswerId,
  getLastQuestionId,
  getLastFollowUpQuestionId,
  insertNewQuestion,
  insertNewAnswers,
  insertNewSummary,
  updateDbAnswers,
  insertNewFollowUpQuestion,
  delQuestion,
  getAnswersById,
  delAnswer,
  delFollowUpAnswer,
  delFollowUpQuestion,
  trashIcon, 
  plusCircleIcon, 
  plusCircleFilledIcon,
  QuestionPanelHeader, 
  TreeView, 
  QuestionEditForm, 
  AnswerEditForm, 
  HelpText,
  ModalAlert,
  ModalDeleteConfirm,
  questionCircleFilledIcon
} from "./utils/Imports";

const App = () => {
  const {
    currentQuestionObject,
    questionFormVisibleObject,
    currentAnswerAndInfoObject,
    treeStructureObject,
    modalAlertDataObject,
    modalDeleteConfirmDataObject,
  } = useContext(CRUDContext);

  // Editoitavana oleva kysymys. Tämä voi olla null.
  const [currentQuestion, setCurrentQuestion] = currentQuestionObject;

  // Editoitavana oleva vastaus ja sen info. Tämä voi olla null.
  const [currentAnswerAndInfo, setCurrentAnswerAndInfo] = currentAnswerAndInfoObject;

  // Staten arvot: true = kysymyspaneeli näkyvissä, false = vastauspaneeli näkyvissä
  const [questionFormVisible, setQuestionFormVisible] = questionFormVisibleObject;

  // Tämän staten arvo on objekti, jolla on propertyt: array, selectedTreeItemId
  const [treeStructure, setTreeStructure] = treeStructureObject;

  const [modalAlertData, setModalAlertData] = modalAlertDataObject;
  const [modalDeleteConfirmData, setModalDeleteConfirmData] = modalDeleteConfirmDataObject;

  useEffect(() => {
      scrollTreeItemIntoView();
    },
    [treeStructure]
  );

  const addNewQuestion = async () => {
    // Tämä lisää uuden pääkysymyksen, ei jatkokysymystä.
    // Uusi kysymys menee puun loppupäähän.

    let txt = "Muokkaa tätä kysymystä";
    let newQuestionId = (await getLastQuestionId()) + 1;
    await insertNewQuestion(newQuestionId, txt, "");
    
    // Uudelle kysymykselle täytyy lisätä yksi vastaus ja info
    let newAnswerId = (await getLastAnswerId()) + 1;
    let newFollowUpId = "";
    await insertNewAnswers(newAnswerId, newQuestionId, "Muokkaa tätä vastausta", newFollowUpId);
    await insertNewSummary(newAnswerId, "", "", "");

    reloadTree(`rb-tree-question-${newQuestionId}`);
    setCurrentQuestion({
      KysymysID: newQuestionId,
      KysymysTXT: txt,
      KysymysINFO: ""
    });
    setQuestionFormVisible(true);
    //setHasAddedQuestionOrAnswer(true);
  };

  const scrollTreeItemIntoView = () => {
    if (treeStructure && treeStructure.selectedTreeItemId) {
      const item = document.getElementById(treeStructure.selectedTreeItemId);
      if (item) {
        // item.scrollIntoView();
        scrollIntoViewIfNeeded(item, true);
      }
    }
  };

  const scrollIntoViewIfNeeded = (element, centered) => {
    // The parent element will only scroll if the element being
    // called is out of the view.

    if (element.scrollIntoViewIfNeeded) {
      element.scrollIntoViewIfNeeded(centered);
      return;
    }

    // Polyfill for Firefox and IE
    // https://gist.github.com/hsablonniere/2581101

    const getParent = (el) => {
      var parent = el.parentNode;
      if (parent === document) {
        return document;
      } else if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
        return parent;
      } else {
        return getParent(parent);
      }
    };
    var parent = getParent(element);
    var parentComputedStyle = window.getComputedStyle(parent, null);
    var parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'));
    var parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'));
    var overTop = element.offsetTop - parent.offsetTop < parent.scrollTop;
    var overBottom = (element.offsetTop - parent.offsetTop + element.clientHeight - parentBorderTopWidth) > 
      (parent.scrollTop + parent.clientHeight);
    var overLeft = element.offsetLeft - parent.offsetLeft < parent.scrollLeft;
    var overRight = (element.offsetLeft - parent.offsetLeft + element.clientWidth - parentBorderLeftWidth) > 
      (parent.scrollLeft + parent.clientWidth);
    var alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centered) {
      parent.scrollTop = element.offsetTop - parent.offsetTop - parent.clientHeight / 2 - 
        parentBorderTopWidth + element.clientHeight / 2;
    }
    if ((overLeft || overRight) && centered) {
      parent.scrollLeft = element.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - 
        parentBorderLeftWidth + element.clientWidth / 2;
    }    
    if ((overTop || overBottom || overLeft || overRight) && !centered) {
      element.scrollIntoView(alignWithTop);
    }
  };  

  const canAddNewFollowUpQuestion = (show) => {
    // Valittuna pitää olla päävastaus
    if (questionFormVisible || !currentAnswerAndInfo) {
      if(show) {
        showAlert("Valitse vastaus, jolle haluat lisätä jatkokysymyksen.");
      }
      return false;
    }
    if (currentAnswerAndInfo.JatkokysymysID) {
      if(show) {
        showAlert("Valitulla vastauksella on jo jatkokysymys. Ei voi lisätä toista.");
      }
      return false;
    }
    if (currentAnswerAndInfo.isFollowUpAnswer) {
      // Estetään jatkokysymysten lisäys jatkovastauksille
      if(show) {
        showAlert("Valitse pääkysymyksen vastaus, jotta voit lisätä jatkokysymyksen.");
      }
      return false;
    }

    return true;
  };

  const addNewFollowUpQuestion = async () => {
    if (!canAddNewFollowUpQuestion(true)) {
      return;
    }

    const newQid = (await getLastQuestionId()) + 1;
    const newXQid = (await getLastFollowUpQuestionId()) + 1;
    const newAid = (await getLastAnswerId()) + 1;
    const fupTxt = "Muokkaa tätä jatkokysymystä";
    const fupAnswerTxt = "Muokkaa tätä jatkovastausta";

    // Lisätään parent-vastaukselle JatkokysymysID-arvo
    await updateDbAnswers(currentAnswerAndInfo.VastausID, currentAnswerAndInfo.VastausTXT, newXQid);
    
    // Luodaan jatkokysymys
    await insertNewFollowUpQuestion(newQid, newXQid, fupTxt, "");

    // Luodaan jatkovastaus ja yhteenveto
    await insertNewAnswers(newAid, newQid, fupAnswerTxt, "");
    await insertNewSummary(newAid, "", "", "");

    reloadTree(`rb-tree-fu-question-${newQid}`);
    setCurrentQuestion({
      KysymysID: newQid, 
      JatkokysymysID: newXQid,
      KysymysTXT: fupTxt,
      KysymysINFO: "",
    });
    setQuestionFormVisible(true);
  };

  const canAddNewAnswer = () => {
    if (questionFormVisible && currentQuestion) {
      return true;
    }
    return false;
  };

  const addNewAnswer = async () => {
    // Tämä lisää vastauksen tai jatkovastauksen

    // Valittuna pitää olla kysymys tai jatkokysymys
    if (!canAddNewAnswer()) {
      showAlert("Valitse kysymys tai jatkokysymys, jolle haluat lisätä vastauksen.");
      return;
    }

    let isFollowUpAnswer, ansTxt;
    if (currentQuestion.JatkokysymysID) {
      // Valittuna on jatkokysymys, joten lisätään jatkovastaus
      isFollowUpAnswer = true;
      ansTxt = "Muokkaa tätä jatkovastausta";
    } else {
      isFollowUpAnswer = false;
      ansTxt = "Muokkaa tätä vastausta";
    }
    
    const questionId = currentQuestion.KysymysID;
    const newFUPid = "";
    const newAid = (await getLastAnswerId()) + 1;

    await insertNewAnswers(newAid, questionId, ansTxt, newFUPid);
    await insertNewSummary(newAid, "", "", "");

    const treeItemId = isFollowUpAnswer ? `rb-tree-fu-answer-${newAid}` : `rb-tree-answer-${newAid}`;
    reloadTree(treeItemId);

    setCurrentAnswerAndInfo({
      VastausID: newAid,
      VastausTXT: ansTxt,
      KysymysID: questionId,
      // JatkokysymysID: "", // jätetään pois
      Otsikko: "",
      InfoTXT: "",
      Linkki: "",
      isFollowUpAnswer: isFollowUpAnswer
    });
    setQuestionFormVisible(false);
  };

  const canRemoveSelected = () => {
    // Katso myös canRemoveanswer, joka testaa tarkemmin, mutta se
    // tekee myös tietokanta-queryn.
    if (questionFormVisible) {
      return currentQuestion != null;
    } else {
      return currentAnswerAndInfo != null;
    }
  };

  const removeSelected = async () => {
    if (!currentAnswerAndInfo && !currentQuestion) {
      showAlert("Valitse kohde, jonka haluat poistaa.");
      return;
    }

    if (questionFormVisible) {
      if (!currentQuestion) {
        showAlert("Valitse kysymys, jonka haluat poistaa.");
        return;
      }
      if (currentQuestion.JatkokysymysID) {
        await removeFollowUpQuestion();
      } else {
        await removeQuestion();
      }
    } else {
      if (!currentAnswerAndInfo) {
        showAlert("Valitse vastaus, jonka haluat poistaa.");
        return;
      }
      if (currentAnswerAndInfo.isFollowUpAnswer) {
        await removeFollowUpAnswer();
      } else {
        await removeAnswer();
      }
    }
  };

  const removeQuestion = async () => {
    // Poistetaan kysymys ja siitä lähtevä puun haara
    // TODO: Estä viimeisen pääkysymyksen poisto?
  
    confirmDelete("Haluatko poistaa valitun kysymyksen ja sen vastaukset?", "Poista",
      async () => {
        await delQuestion(currentQuestion.KysymysID);
        setCurrentQuestion(null);
        reloadTree(""); // Ei laiteta mitään itemiä puussa valituksi
      });
  };
  
  const removeFollowUpQuestion = async () => {
    confirmDelete("Haluatko poistaa valitun jatkokysymyksen?", "Poista",
      async () => {
        await delFollowUpQuestion(currentQuestion.KysymysID, currentQuestion.JatkokysymysID); 
        setCurrentQuestion(null);
        reloadTree(""); // Ei laiteta mitään itemiä puussa valituksi
      });
  };

  const removeAnswer = async () => {
    if ((await canRemoveAnswer(currentAnswerAndInfo.KysymysID)) === false) {
      return;
    }
    confirmDelete("Haluatko poistaa valitun vastauksen ja sen jatkokysymykset?", "Poista",
      async () => {
        await delAnswer(currentAnswerAndInfo.VastausID, currentAnswerAndInfo.JatkokysymysID);
        setCurrentAnswerAndInfo(null);
        reloadTree(""); // Ei laiteta mitään itemiä puussa valituksi
      });
  };

  const removeFollowUpAnswer = async () => {
    if ((await canRemoveAnswer(currentAnswerAndInfo.KysymysID)) === false) {
      return;
    }
    confirmDelete("Haluatko poistaa valitun jatkovastauksen?", "Poista",
      async () => {
        await delFollowUpAnswer(currentAnswerAndInfo.VastausID);
        setCurrentAnswerAndInfo(null);
        reloadTree(""); // Ei laiteta mitään itemiä puussa valituksi
      });
  };

  const canRemoveAnswer = async (kysymysID) => {
    const answers = await getAnswersById(kysymysID); 

    if (answers && answers.data && answers.data.vastausid) {
      const numAnswers = answers.data.vastausid.length;
      if (numAnswers < 2) {
        showAlert("Tätä vastausta ei voi poistaa, sillä joka kysymyksellä pitää olla vähintään yksi vastaus.");
        return false;
      }
    }

    return true;
  };

  const reloadTree = (selectId) => {
    // TreeView-komponentti lataa puun uudelleen DB:stä, kun
    // treeStructure-state tyhjennetään tässä
    setTreeStructure({
      array: [],
      selectedTreeItemId: selectId
    });
  };

  const getCurrentForm = () => {
    if (questionFormVisible) {
      return(
        <QuestionEditForm 
          questionID={currentQuestion ? currentQuestion.KysymysID : ""} 
          txt={currentQuestion ? currentQuestion.KysymysTXT : ""} 
          info={currentQuestion ? currentQuestion.KysymysINFO : ""}
          followUpQuestionID={currentQuestion ? currentQuestion.JatkokysymysID : ""}/>
      );
    } else {
      return(
        <AnswerEditForm 
          answerID={currentAnswerAndInfo ? currentAnswerAndInfo.VastausID : ""}
          questionID={currentAnswerAndInfo ? currentAnswerAndInfo.VastausID : ""} 
          followUpQuestionID={currentAnswerAndInfo ? currentAnswerAndInfo.JatkokysymysID : ""}
          answerTxt={currentAnswerAndInfo ? currentAnswerAndInfo.VastausTXT : ""} 
          infoTitle={currentAnswerAndInfo ? currentAnswerAndInfo.Otsikko : ""} 
          infoTxt={currentAnswerAndInfo ? currentAnswerAndInfo.InfoTXT : ""} 
          infoLink={currentAnswerAndInfo ? currentAnswerAndInfo.Linkki : ""} />
      );
    }
  };

  const showAlert = (text) => {
    setModalAlertData({ show: true, text });
  };

  const confirmDelete = (text, okButtonText, okButtonClickCallback) => {
    setModalDeleteConfirmData({
      show: true,
      text: text,
      okButtonText: okButtonText,
      okClickHandler: okButtonClickCallback
    });
  };

  const showHelp = () => {
    showAlert(HelpText);
  };

  return (
    <div className="App">

      <ModalAlert/>
      <ModalDeleteConfirm/>      

      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <div className="card" style={{height: "95vh"}}>
              { /* <QuestionPanelHeader /> */ }
              <div className="card card-text">
                <div className="treeViewButtonPanel">
                  <button
                    className="btn btn-secondary btn-sm summaryBtn"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-type="info"
                    type="button"
                    title="Lisää uusi kysymys"
                    onClick={addNewQuestion}
                  >
                    {plusCircleFilledIcon} Kysymys
                  </button>{" "}
                  <button
                    className="btn btn-secondary btn-sm summaryBtn"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-type="info"
                    type="button"
                    title="Lisää uusi vastaus valitulle kysymykselle tai jatkokysymykselle"
                    disabled={!canAddNewAnswer()}
                    onClick={addNewAnswer}
                  >
                    {plusCircleIcon} Vastaus
                  </button>{" "}
                  <button
                    className="btn btn-secondary btn-sm summaryBtn"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-type="info"
                    type="button"
                    title="Lisää uusi jatkokysymys valitulle vastaukselle"
                    disabled={!canAddNewFollowUpQuestion(false)}
                    onClick={addNewFollowUpQuestion}
                  >
                    {plusCircleIcon} Jatkokysymys
                  </button>{" "}
                  <button
                    className="btn btn-secondary btn-sm summaryBtn"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-type="info"
                    type="button"
                    title="Poista valittu kysymys tai vastaus"
                    disabled={!canRemoveSelected()}
                    onClick={removeSelected}
                  >
                    {trashIcon}
                  </button>
                  {" "}
                  <button
                    className="btn btn-secondary btn-sm summaryBtn"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-type="info"
                    type="button"
                    title="Ohje"
                    onClick={showHelp}
                  >
                    {questionCircleFilledIcon}
                  </button>
                </div>

                <div className="treeViewContainer" style={{overflow: "scroll"}}>
                  <TreeView />
                </div>

              </div>
            </div>
          </div>

          <div className="col-lg-7">
            {getCurrentForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

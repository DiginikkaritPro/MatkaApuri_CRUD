import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  CRUDContext,
  useContext,
  getQuestionById,
  getAnswersById,
  getSummaryById,
  getLastAnswerId,
  SummaryListForm,
  AnswerListForm,
  QuestionListForm,
  delQuestion,
  getLastQuestionId,
} from "../../utils/Imports";

//Lisää nämä import fileen -Jani joojoo

const QuestionsPanelTable = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [questionIdForDelete, setQuestionIdForDelete] = useState(-1);

  const {
    newQuestionIdObject,
    answersArrayObject,
    allAnswerIdsObject,
    disabledSubmitObject,
    newAnswerIdObject,
    questionsPanelArrayObject,
    followUpAmountObject,
    questionArrayObject,
    editQuestionIdObject,
    isNewQuestionObject
  } = useContext(CRUDContext);
  const [newQuestionId, setNewQuestionId] = newQuestionIdObject;
  const [questionArray, setQuestionArray] = questionArrayObject;
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
  const [questionsPanelArray, setQuestionsPanelArray] = questionsPanelArrayObject;
  const [followUpAmount, setFollowUpAmount] = followUpAmountObject;
  const [editQuestionId, setEditQuestionId] = editQuestionIdObject;
  const [isNewQuestion, setIsNewQuestion] = isNewQuestionObject;

  const questionDeleteButtonClick = (qid) => {
    setQuestionIdForDelete(qid);
    setShowModal(true);
  };

  const removeQuestion = async (kysymysID) => {
    setShowModal(false);
    await delQuestion(kysymysID);
    setQuestionsPanelArray((prev) => {
      return prev.filter((e) => {
        return e.KysymysID !== kysymysID;
      });
    });
    addNewQuestion();
  };

  const addNewQuestion = async () => {
    setIsNewQuestion(true);

    let resetAnswerId = await getLastAnswerId();
    let resetQuestionId = (await getLastQuestionId()) + 1;

    setAnswersArray([]);
    setAllAnswerIds([]);
    setNewAnswerId(resetAnswerId);
    setNewQuestionId(resetQuestionId);
    setQuestionArray([]);
  };

  const editQuestion = async (kysymysID) => {
    setDisabledSubmit(false);
    setIsNewQuestion(false);
    setAnswersArray([]);
    let question = await getQuestionById(kysymysID);
    if (!question || !question.data) {
      return;
    }
    question = question.data.kysymysid;
    if (!question || question.length === 0) {
      return;
    }
    let questionArray = [];
    questionArray.push(
      <div id={kysymysID}>
        <QuestionListForm
          txt={question[0].KysymysTXT}
          info={question[0].KysymysINFO}
        />
      </div>
    );

    let answer = await getAnswersById(kysymysID);

    if (!answer || !answer.data) {
      return;
    }
    answer = answer.data.vastausid;
    if (!answer || answer.length === 0) {
      return;
    }

    let answerIds = [];
    answer.forEach(async (answer) => {
      answerIds.push(answer.VastausID);
      let summary = await getSummaryById(answer.VastausID);
      console.log(summary);
      let otsikko = "",
        info = "",
        linkki = "";
      if (summary && summary.data) {
        summary = summary.data.yhteenvetostack;
        if (summary && summary.length > 0) {
          otsikko = summary[0].Otsikko;
          info = summary[0].InfoTXT;
          linkki = summary[0].Linkki;
          console.log(otsikko);
        }
      }
      setAnswersArray((prev) => {
        return [
          ...prev,
          <div id={answer.VastausID}>
            <AnswerListForm
              id={answer.VastausID}
              txt={answer.VastausTXT}
              amount={followUpAmount}
              setAmount={setFollowUpAmount}
            />
            <SummaryListForm
              otsikko={otsikko}
              info={info}
              linkki={linkki}
              id={answer.VastausID}
            />
          </div>,
        ];
      });
    });

    const newId = await getLastAnswerId();
    setEditQuestionId(kysymysID);
    setNewAnswerId(newId);
    setAllAnswerIds(answerIds);
    setQuestionArray(questionArray);
  };

  const createTableRow = (questionTxt, questionId, index) => {
    return (
      <tr>
        <th scope="row">{index}</th>
        <td>
          <a>
            <button
              type="button"
              className="btn"
              style={{ textAlign: "left" }}
              onClick={() => {
                editQuestion(questionId);
              }}
            >
              {questionTxt}
            </button>
          </a>
        </td>
        <td>
          <a data-toggle="modal" href="#myModal">
            <button
              onClick={() => questionDeleteButtonClick(questionId)}
              type="button"
              className="btn panelBtn"
            >
              x
            </button>
          </a>
        </td>
      </tr>
    );
  };

  const getTableRows = () => {
    const array = [];
    if (props.questions && props.questions.length > 0) {
      let i = 1;
      props.questions.forEach((question) => {
        array.push(createTableRow(question.KysymysTXT, question.KysymysID, i));
        i++;
      });
    } else {
      array.push(<p>Ei kysymyksiä</p>);
    }
    return array;
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Poista kysymys</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Haluatko poistaa kysymyksen {questionIdForDelete}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="modalDeleteOk"
            onClick={() => removeQuestion(questionIdForDelete)}
          >
            Poista
          </Button>
          <Button
            variant="modalDeleteCancel"
            onClick={() => setShowModal(false)}
          >
            Peruuta
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-striped">
        <tbody>{getTableRows()}</tbody>
      </table>
    </div>
  );
};

export default QuestionsPanelTable;

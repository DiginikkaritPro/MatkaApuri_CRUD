import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

//Lisää nämä import fileen -Jani

const QuestionsPanelTable = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [questionIdForDelete, setQuestionIdForDelete] = useState(-1);

    const modalOkClick = (qid) => {
      setShowModal(false);
      props.deleteQuestionClick(qid);
    };

    const questionDeleteButtonClick = (qid) => {
      setQuestionIdForDelete(qid); 
      setShowModal(true);
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
                  onClick={() => {
                    props.editQuestionClick(questionId);
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
    }

    const getTableRows = () => {
      const array = [];
      if (props.questions && props.questions.length > 0) {
          let i = 1;
          props.questions.forEach(question => {
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
                <Button variant="modalDeleteOk" 
                  onClick={() => modalOkClick(questionIdForDelete)}>Poista</Button>
                <Button variant="modalDeleteCancel" 
                  onClick={() => setShowModal(false)}>Peruuta</Button>  
              </Modal.Footer>
            </Modal> 

            <table className="table table-striped">
                <tbody>
                    {getTableRows()}
                </tbody>
            </table>            
        </div>
    )
}

export default QuestionsPanelTable;

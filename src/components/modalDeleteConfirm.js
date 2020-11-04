import { React, useContext, questionCircleIcon, trashIcon, CRUDContext } from '../utils/Imports';
import { Modal, Button } from "react-bootstrap";

const ModalDeleteConfirm = () => {
    const { modalDeleteConfirmDataObject } = useContext(CRUDContext);
    const [modalDeleteConfirmData, setModalDeleteConfirmData] = modalDeleteConfirmDataObject;

    const hideModal = () => {
        setModalDeleteConfirmData({
            show: false,
            text: "",
            okButtonText: "OK",
            okClickHandler: () => {},
        });
    };

    const okModal = () => {
      modalDeleteConfirmData.okClickHandler();
      hideModal();
    };

    return(
<      Modal show={modalDeleteConfirmData.show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {questionCircleIcon}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalDeleteConfirmData.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="modalDeleteOk" onClick={okModal}>
            {trashIcon}{" "}{modalDeleteConfirmData.okButtonText}
          </Button>
          <Button variant="modalDeleteCancel" onClick={hideModal}>
            Peruuta
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default ModalDeleteConfirm;

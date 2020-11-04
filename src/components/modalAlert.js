import { React, useContext, infoCircleIcon, CRUDContext } from '../utils/Imports';
import { Modal, Button } from "react-bootstrap";

const ModalAlert = () => {
    const { modalAlertDataObject } = useContext(CRUDContext);
    const [modalAlertData, setModalAlertData] = modalAlertDataObject;

    const hideModal = () => {
        setModalAlertData({
            show: false,
            text: ""
        });
    }

    return(
        <Modal show={modalAlertData.show} onHide={hideModal}>
        <Modal.Header closeButton>
        <Modal.Title>
            {infoCircleIcon}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modalAlertData.text}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="modalAlertOk" onClick={hideModal}>
            OK
        </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default ModalAlert;

import {React, useState, createContext, useEffect, getLastQuestionId, getLastFollowUpQuestionId, getQuestionsNotFollowUp } from '../utils/Imports'

export const CRUDContext = createContext();

export const CRUDProvider = props => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentAnswerAndInfo, setCurrentAnswerAndInfo] = useState(null);
    const [questionFormVisible, setQuestionFormVisible] = useState(true);
    const [treeStructure, setTreeStructure] = useState({
        array: [],
        selectedTreeItemId: ""
    });
    const [modalAlertData, setModalAlertData] = useState({ 
        show: false, 
        text: ""
    });
    const [modalDeleteConfirmData, setModalDeleteConfirmData] = useState({ 
        show: false, 
        text: "",
        okButtonText: "OK",
        okClickHandler: () => {},
    });
  
    return (
        <CRUDContext.Provider value={{ 
            currentQuestionObject: [currentQuestion, setCurrentQuestion],
            questionFormVisibleObject: [questionFormVisible, setQuestionFormVisible],
            currentAnswerAndInfoObject: [currentAnswerAndInfo, setCurrentAnswerAndInfo],
            treeStructureObject: [treeStructure, setTreeStructure],
            modalAlertDataObject: [modalAlertData, setModalAlertData],
            modalDeleteConfirmDataObject: [modalDeleteConfirmData, setModalDeleteConfirmData],
        }}>
            {props.children}
        </CRUDContext.Provider>
    )
}

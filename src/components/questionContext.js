import {React, useState, createContext, useEffect, getLastQuestionId, getLastFollowUpQuestionId, getQuestionsNotFollowUp } from '../utils/Imports'

export const CRUDContext = createContext();

export const CRUDProvider = props => {
    const [newQuestionId, setNewQuestionId] = useState(0);
    const [questionArray, setQuestionArray] = useState([])
    const [newFollowUpQuestionId, setNewFollowUpQuestionId] = useState(0);
    const [answersArray, setAnswersArray] = useState([]);
    const [allAnswerIds, setAllAnswerIds] = useState([]);
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [newAnswerId, setNewAnswerId] = useState(0);
    const [followUpAnswersArray, setFollowUpAnswersArray] = useState([]);
    const [disabledSubmitFollowUp, setDisabledSubmitFollowUp] = useState(true);
    const [allFollowUpQuestionIds, setAllFollowUpQuestionIds] = useState([]);
    const [questionsPanelArray, setQuestionsPanelArray] = useState([]);
    const [followUpAmount, setFollowUpAmount] = useState([]);
    const [followUpChecked, setFollowUpChecked] = useState(false)
  
    
    useEffect(() => {  
        if(newQuestionId === 0){ 
            getNewQuestionId();
            if(newFollowUpQuestionId === 0){ 
                getNewFollowUpQuestionId();
            } 
        }     
    });

    

    let getNewQuestionId = async () => {
        const response = (await getLastQuestionId()) + 1
        setNewQuestionId(response);
    }
    let getNewFollowUpQuestionId = async () => {
        const response = (await getLastFollowUpQuestionId()) + 1
        setNewFollowUpQuestionId(response);
    }

    return (
        <CRUDContext.Provider value={{ 
            newQuestionIdObject: [newQuestionId, setNewQuestionId],
            newFollowUpIdObject: [newFollowUpQuestionId, setNewFollowUpQuestionId],
            answersArrayObject: [answersArray, setAnswersArray],
            allAnswerIdsObject: [allAnswerIds, setAllAnswerIds],
            disabledSubmitObject: [disabledSubmit, setDisabledSubmit],
            newAnswerIdObject: [newAnswerId, setNewAnswerId],
            followUpAnswersArrayObject: [followUpAnswersArray, setFollowUpAnswersArray],
            disabledSubmitFollowUpObject: [disabledSubmitFollowUp, setDisabledSubmitFollowUp],
            allFollowUpQuestionIdsObject: [allFollowUpQuestionIds, setAllFollowUpQuestionIds],
            questionsPanelArrayObject: [questionsPanelArray, setQuestionsPanelArray],
            followUpAmountObject: [followUpAmount, setFollowUpAmount],
            followUpCheckedObject: [followUpChecked, setFollowUpChecked],
            questionArrayObject: [questionArray, setQuestionArray]
        }}>
            {props.children}
        </CRUDContext.Provider>
    )
}






import React, { useEffect } from 'react'
import {createTreeFromDB} from './treeCreator'
import {
  CRUDContext,
  useContext,
  getQuestionById,
  getSummaryById,
  getAnswerByAnswerId,
} from "../../utils/Imports";
  
const TreeView = (props) => {
    const {
      currentQuestionObject,
      questionFormVisibleObject,
      currentAnswerAndInfoObject,
      treeStructureObject,
    } = useContext(CRUDContext);
    const [currentQuestion, setCurrentQuestion] = currentQuestionObject;
    const [questionFormVisible, setQuestionFormVisible] = questionFormVisibleObject;
    const [currentAnswerAndInfo, setCurrentAnswerAndInfo] = currentAnswerAndInfoObject;
    const [treeStructure, setTreeStructure] = treeStructureObject;

    useEffect(() => {
        if (treeStructure.array.length === 0) {
          getTreeStructure();
        }
      }
    );
    
    const getTreeStructure = async () => {
      if (!treeStructure || treeStructure.array.length === 0) {
        const selectedId = treeStructure.selectedTreeItemId;
        const newTreeArray = await createTreeFromDB(treeItemClickHandler, selectedId);
        setTreeStructure( {
            array: newTreeArray,
            selectedTreeItemId: selectedId
        });
      }
    };
    
    const treeItemClickHandler = (event) => {
      const id = event.target.id;
      const array = id.split("-");
      const dbID = array[array.length - 1];

      if (id.includes("question")) {
        startQuestionEditing(dbID);
      } else if (id.includes("answer")) {
        startAnswerEditing(dbID, event.target.id);
      }

      // Päivitetään valittu selectedTreeItemId
      setTreeStructure(prev => {
        return {
          array: prev.array,
          selectedTreeItemId: id
        }
      })
    };

    const startQuestionEditing = async (questionId) => {
      let question = await getQuestionById(questionId);

      if (question && question.data && question.data.kysymysid && question.data.kysymysid.length > 0) {
        question = question.data.kysymysid[0];
      } else {
        console.log(`Kysymyksen tietokanta-query epäonnistui (KysymysID=${questionId}):`)
        console.dir(question);
        question = {
          KysymysTXT: "Tietokantavirhe!",
          KysymysINFO: ""
        };
      }
      question.KysymysID = `${questionId}`;
      
      setCurrentQuestion(question);
      setQuestionFormVisible(true);
    };

    const startAnswerEditing = async (answerId, rbId) => {
      let answer = await getAnswerByAnswerId(answerId);
      let dataOK = false;

      if (answer && answer.data && answer.data.vastausvastausid && answer.data.vastausvastausid.length > 0) {
        answer = answer.data.vastausvastausid[0];
        let info = await getSummaryById(answerId);
        if (info && info.data && info.data.yhteenvetostack && info.data.yhteenvetostack.length > 0) {
          info = info.data.yhteenvetostack[0];
          if (info) {
            answer.InfoTXT = info.InfoTXT;
            answer.Otsikko = info.Otsikko;
            answer.Linkki = info.Linkki;
            answer.VastausID = `${answerId}`;
            dataOK = true;
          }
        } else {
          console.log(`Yhteenvedon tietokanta-query epäonnistui (VastausID=${answerId}):`);
          console.dir(info);
        }
      } else {
        console.log(`Vastauksen tietokanta-query epäonnistui (VastausID=${answerId}):`);
        console.dir(answer);
      }

      if (!dataOK) {
        answer.VastausTXT = "Tietokantavirhe!";
        answer.InfoTXT = "";
        answer.Otsikko = "";
        answer.Linkki = "";
        answer.VastausID = -1;
      }
      
      setCurrentAnswerAndInfo(prev => {
        return {
          ...answer,
          isFollowUpAnswer: rbId.includes("fu")
        };
      });
      setQuestionFormVisible(false);
    };

    return (
        <div style={{textAlign: 'left', color: 'white', marginLeft: '1em'}}>
            {treeStructure.array}
        </div>
    )
}

export default TreeView

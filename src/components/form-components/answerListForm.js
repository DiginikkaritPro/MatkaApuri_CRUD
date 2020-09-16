import React from 'react';
/* import { NavLink } from "react-router-dom";
import { CRUDContext } from "../questionContext";
import {getLastAnswerId} from '../../functions/ClientFunctions'; */



const AnswerListForm = () => {

    /* useEffect(() => {
        if(newAnswerId === 0){
        getNewAnswerId();
        }
      })

      let getNewAnswerId = async () => {
        const response = await getLastAnswerId();
        setNewAnswerId(response + 1);
      }

    const {  
        newAnswerIdObject
      } = useContext(CRUDContext);
      const [newAnswerId, setNewAnswerId] = newAnswerIdObject;
    
      const newAnswerIdForFollowUp = 0; // TODO
      const newQuestionIdForFollowUp = 0; // TODO */

    return (
      <div>
        {/* <p> Vastaus </p>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input
                type="radio"
                aria-label="Radio button for following text input"
              />
            </div>
          </div>

          <input
            type="text"
            id={"answerInput" + newAnswerId}
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
        <br />
 
        <br />
        <br /> */}
      </div>
    );
  };

  export default AnswerListForm;
import {React} from '../../utils/Imports'

let QuestionListForm = props => {
    
    return (
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                ?
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Kirjoita kysymys tähän..."
              id="inputID"
              aria-describedby="basic-addon1"
              defaultValue={props.txt}
              
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                info
              </span>
            </div>
            <textarea
              type="text"
              defaultValue={props.info}
              className="form-control"
              placeholder="Lisätietoja tähän..."
              id="textareaID"
              aria-describedby="basic-addon1"
            />
          </div>
          {/* <p style={{color:"rgb(240,140,0)", float: "right"}}><span><i>Kysymys ID:</i></span>&nbsp;&nbsp;<strong>{props.newQuestionId}</strong></p> */}
        </div>
      );
    };

export default QuestionListForm;
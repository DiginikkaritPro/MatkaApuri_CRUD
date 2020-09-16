import {React} from '../../utils/Imports'

let QuestionEdit = (question, answers, summaries) => {
  
  const VastausOBJ = () => {
    Array.from(answers).map((ans) => {
      return <div>{ans.VastausTXT}</div>
    })
  }
  
  return(
    <div>
      {/*Input.value*/}
      <p>{question.KysymysTXT}</p>
      {/*Textarea.value*/}
      <p>{question.KysymysINFO}</p>

    </div>
  )
}

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
              className="form-control"
              placeholder="Lisätietoja tähän..."
              id="textareaID"
              aria-describedby="basic-addon1"
            />
          </div>
          <p>{props.newQuestionId}</p>
        </div>
      );
    };

export default QuestionListForm;
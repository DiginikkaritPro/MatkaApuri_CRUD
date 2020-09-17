import {React} from '../../utils/Imports'

let SummaryListForm = (props) => {


    const summaryHandler = (event, id) => {
        event.preventDefault();
        if (document.getElementById(id).hidden) {
          document.getElementById(id).hidden = false;
        } else {
          document.getElementById(id).hidden = true;
        }
      };
      
    return (
      <div id={props.id}>
        <button
          onClick={(event) => {
            summaryHandler(event, "hideableSummaryDiv" + props.id);
          }}
          className="summaryBtn btn btn-light"
        >
          Näytä/Piilota Yhteenveto
        </button>
        <div hidden={true} id={"hideableSummaryDiv" + props.id}>
          <div>
            <input
              id={"headerInput" + props.id}
              placeholder="Otsikko"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <textarea
              id={"textAreaInput" + props.id}
              placeholder="Info"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <input
              id={"linkInput" + props.id}
              placeholder="Linkki"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <p>{`${props.id}`}</p>
        </div>

        <hr />
      </div>
    );
  };

  export default SummaryListForm
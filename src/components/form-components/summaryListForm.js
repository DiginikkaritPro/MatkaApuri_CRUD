import {React} from '../../utils/Imports'

let SummaryListForm = (newAnswerId) => {


    const summaryHandler = (event, id) => {
        event.preventDefault();
        if (document.getElementById(id).hidden) {
          document.getElementById(id).hidden = false;
        } else {
          document.getElementById(id).hidden = true;
        }
      };
      
    return (
      <div id={newAnswerId}>
        <button
          onClick={(event) => {
            summaryHandler(event, "hideableSummaryDiv" + newAnswerId);
          }}
          className="summaryBtn btn btn-light"
        >
          Näytä/Piilota Yhteenveto
        </button>
        <div hidden={true} id={"hideableSummaryDiv" + newAnswerId}>
          <div>
            <input
              id={"headerInput" + newAnswerId}
              placeholder="Otsikko"
              type="text"
              name="OtsikkoText"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <textarea
              id={"textAreaInput" + newAnswerId}
              placeholder="Info"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <div>
            <input
              id={"linkInput" + newAnswerId}
              placeholder="Linkki"
              type="text"
              className="form-control"
              aria-label="Text input with radio button"
            />
          </div>
          <p>{`${newAnswerId}`}</p>
        </div>

        <hr />
      </div>
    );
  };

  export default SummaryListForm
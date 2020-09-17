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
        <span style={{float: "right"}}>
          <button
            onClick={(event) => {
              summaryHandler(event, "hideableSummaryDiv" + newAnswerId);
            }}
            className="btn btn-secondary summaryBtn"
          >
            Näytä/Piilota Yhteenveto
          </button>
        </span><br/><br/>
        <div hidden={true} id={"hideableSummaryDiv" + newAnswerId}>
          <div>
            <input
              id={"headerInput" + newAnswerId}
              placeholder="Otsikko"
              type="text"
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
          {/* <p>{`${newAnswerId}`}</p> */}
          <p style={{color:"rgb(235,130,170)", float: "right"}}><span><i>Vastaus ID:</i></span>&nbsp;&nbsp;<strong>{`${newAnswerId}`}</strong></p>
        </div>

        <br/><br/>
        <hr />
      </div>
    );
  };

  export default SummaryListForm
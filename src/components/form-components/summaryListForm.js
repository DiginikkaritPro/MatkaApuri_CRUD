import { React } from "../../utils/Imports";

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
      <span style={{ float: "right" }}>
        <button
          onClick={(event) => {
            summaryHandler(event, "hideableSummaryDiv" + props.id);
          }}
          className="btn btn-secondary summaryBtn"
        >
          Näytä/Piilota Yhteenveto
        </button>
      </span>
      <br />
      <br />
      <div hidden={true} id={"hideableSummaryDiv" + props.id}>
        <div>
          <input
            id={"headerInput" + props.id}
            placeholder="Otsikko"
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
            value={props.otsikko}
          />
        </div>
        <div>
          <textarea
            id={"textAreaInput" + props.id}
            placeholder="Info"
            type="text"
            value={props.info}
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
        <div>
          <input
            id={"linkInput" + props.id}
            placeholder="Linkki"
            type="text"
            value={props.linkki}
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
        <p style={{ color: "rgb(235,130,170)", float: "right" }}>
          <span>
            <i>Vastaus ID:</i>
          </span>
          &nbsp;&nbsp;
          <strong>{`${props.id}`}</strong>
        </p>
      </div>

      <br />
      <br />
      <hr />
    </div>
  );
};

export default SummaryListForm;

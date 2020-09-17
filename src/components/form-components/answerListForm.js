import { React, CRUDContext, useContext } from "../../utils/Imports";

let AnswerListForm = (props) => {
  const {
    answersArrayObject,
    allAnswerIdsObject,
    disabledSubmitObject,
  } = useContext(CRUDContext);
  const [answersArray, setAnswersArray] = answersArrayObject;
  const [allAnswerIds, setAllAnswerIds] = allAnswerIdsObject;
  const [disabledSubmit, setDisabledSubmit] = disabledSubmitObject;
  const removeAnswerAndSummary = (e) => {
    const id = e.target.id;
    const index = allAnswerIds.indexOf(parseInt(id));

    console.log(allAnswerIds);
    console.log(id);
    console.log(index);

    if (index !== -1) {
      const newArray = [...allAnswerIds];
      newArray.splice(index, 1);

      setAllAnswerIds((prev) => {
        // let array = [...prev]
        // array.splice(index, 1)
        return newArray;
      });

      // Poistetaan vastaus- ja yhteenveto-objekti arraystä

      const newAnsArray = [...answersArray];
      newAnsArray.splice(index, 1);

      setAnswersArray((prev) => {
        // let array = [...prev]
        // array.splice(index, 1)
        return newAnsArray;
      });
    }

    setDisabledSubmit(answersArray.length === 0);
  };

  let handleChange = (e) => {
    const id = e.target.id;
    if (e.target.checked === true) {
      props.setAmount((prev) => {
        return [...prev, id];
      });
    } else {
      props.setAmount((prev) => {
        return prev.filter((element) => {
          return element !== id;
        });
      });
    }
    //document.getElementById(id).checked = !document.getElementById(id).checked
    //e.target.checked = !e.target.checked
  };

  return (
    <div>
      <p> Vastaus </p>
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
          id={"answerInput" + props.id}
          className="form-control"
          aria-label="Text input with radio button"
          value={props.txt}
        />

        <div class="input-group-append">
          <button
            className="btn btn-secondary"
            type="button"
            id={props.id}
            data-toggle="tooltip"
            data-placement="top"
            data-type="info"
            title="Poista vastaus ja yhteenveto"
            onClick={removeAnswerAndSummary}
          >
            x
          </button>
        </div>
      </div>
      <br />
      <span style={{ float: "left" }}>
        <label>
          <input
            id={props.id}
            type="checkbox"
            onChange={handleChange}
          ></input>
          &nbsp;&nbsp;Lisää Jatkokysymys
        </label>
      </span>
      <br />
      <br />
    </div>
  );
};

export default AnswerListForm;

import {React} from '../../utils/Imports'

let AnswerListForm = (
  id,
  amount,
  setAmount,
  newAnswerId,
  setNewAnswerId,
  allAnswerIds,
  setAllAnswerIds,
  answersArray,
  setAnswersArray,
  setDisabledSubmit
) => {
  let handleChange = (e) => {
    const id = e.target.id;
    if (e.target.checked === true) {
      setAmount((prev) => {
        return [...prev, id];
      });
    } else {
      setAmount((prev) => {
        return prev.filter((element) => {
          return element !== id;
        });
      });
    }
    //document.getElementById(id).checked = !document.getElementById(id).checked
    //e.target.checked = !e.target.checked
  };

  const removeAnswerAndSummary = () => {
    console.log(newAnswerId);

    setNewAnswerId(newAnswerId - 1);

    allAnswerIds.pop();
    setAllAnswerIds(allAnswerIds);

    // Poistetaan vastaus- ja yhteenveto-objekti arraystä
    answersArray.pop();
    answersArray.pop();
    setAnswersArray(answersArray);

    setDisabledSubmit(answersArray.length < 1);
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
          id={"answerInput" + id} //newAnswerId}
          className="form-control"
          aria-label="Text input with radio button"
        />

        <div class="input-group-append">
          <button
            class="btn btn-secondary"
            type="button"
            id="button-addon2"
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
      <label>
        <input
          id={id} //newAnswerId}
          type="checkbox"
          onChange={handleChange}
        ></input>
        Lisää Jatkokysymys
      </label>
      <br />
      <br />
    </div>
  );
};

export default AnswerListForm;

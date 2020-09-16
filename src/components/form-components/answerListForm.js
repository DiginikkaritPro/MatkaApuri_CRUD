import React from "react";

let AnswerListForm = (id, amount, setAmount) => {
  

  

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
          id={"answerInput" + id}//newAnswerId}
          className="form-control"
          aria-label="Text input with radio button"
        />
      </div>
      <br />
      <label>
        <input
          id={id}//newAnswerId}
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

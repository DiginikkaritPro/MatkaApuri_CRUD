import {React, FollowUpHeader, Footer, getLastFollowUpQuestionId, CRUDContext, useContext} from '../utils/Imports'

const FollowUpQuestion = () => {

  const {
    isFollowUpObject
  } = useContext(CRUDContext);
  const [isFollowUp, setIsFollowUp] = isFollowUpObject;
  
  // let VastausObj = () =>
  //   Array.from(answersArray).map((e) => {
  //     return <div>{e}</div>;
  //   });
  // let KysymysObj = () =>
  //   Array.from(questionArray).map((e) => {
  //     return <div>{e}</div>;
  //   });
  let goBack = () => {
    setIsFollowUp(!isFollowUp)
  }
  return (
    <div className="container">
          <div className="card">
            <FollowUpHeader />
            <div className="card-body">
              <div className="card-text">
                <h5>
                  Lisää jatkokysymys ja sen vastaukset.
                </h5>
                <div>
                  <form>
                    <br />
                    <span style={{ float: "right" }}>
                      <button
                        // onClick={submitData}
                        className="btn btn-secondary greyBtn"
                        // disabled={disabledSubmit}
                        type="button"
                      >
                        Tallenna
                      </button>
                    </span>
                    <br />
                    <br />
                    {/* {KysymysObj()} */}
                    <span style={{ float: "right" }}>
                    <button
                      type="button"
                      className="btn btn-secondary greyBtn"
                      // onClick={addAnswerAndSummary}
                    >
                      Lisää vastauskenttä
                    </button>
                  </span>
                    <br />
                    <br />
                    <br />
                    {/* {VastausObj()} */}
                    <br />
                    <br />
                  </form>
                  
                  <br />
                  <br />
                  <br />
                  <br />
                  <button
                  type="button"
                  onClick={goBack}
                  >
                    Palaa takaisin
                  </button>
                </div>
                <Footer />
              </div>
            </div>
            {/* card-body */}
          </div>
          {/* card */}
        </div>
  );
}

export default FollowUpQuestion

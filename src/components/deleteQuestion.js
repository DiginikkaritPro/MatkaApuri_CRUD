import {React, Header, Footer} from '../utils/Imports'

const deleteQuestion = () => {

  // useEffect(() => {
  //   delQuestion();
  // });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-lg-8">
            <div className="card">
              <Header />
              <div className="card-body">
                <div className="card-text">
                  <span>
                    <p style={{ float: "left" }}>
                      <a href="/" className="summaryBtn">
                        {" "}
                        Takaisin etusivulle
                      </a>
                    </p>
                  </span>
                  <br />
                  <h5>
                    Poista kysymys, jatkokysymykset, vastaukset ja yhteenvedot
                    "Poista" -napilla.
                  </h5>
                  <div>
                    {/* <form onSubmit={this.submitData}>
                      <br />
                      <input
                        className="sendBtn btn btn-secondary"
                        type="submit"
                        value="Poista"
                      />
                    </form> */}
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
}


export default deleteQuestion;

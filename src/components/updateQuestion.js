import { React, Header, Footer } from "../utils/Imports";

const UpdateQuestion = (kysymysID) => {

  
  return (
    <div className="container">
      <div className="card">
        <Header />
        <div className="card-body">
          <div className="card-text">
            <br />
            <h5>
              Muokkaa kysymyksen tietoja. Paina Lopuksi "Tallenna" -nappia
            </h5>
            <div>
              <form onSubmit={this.submitData}>
                <br />
                <input
                  className="sendBtn btn btn-secondary"
                  type="submit"
                  value="Tallenna"
                />
              </form>
              <div></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdateQuestion;

import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";


class startPage extends Component {

  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-lg-8">
            <div className="card">
              <Header />
              <div className="card-body">
                <div className="card-text">
                  <h5>Tervetuloa Matka-apuri Editoriin!</h5>
                  <br/>
                  <br/>
                  <div>
                    
                      <div>
                        <p>
                          <button className="btn btn-light">
                            <a href="/createquestion">Lisää kysymys</a>
                          </button>
                        </p>
                        <p>
                          <button className="btn btn-light">
                            <a href="/updatequestion">Päivitä kysymyksen tietoja</a>
                          </button>
                        </p>
                        <p>
                          <button className="btn btn-light">
                            <a href="/deletequestion">Poista kysymys</a>
                          </button>
                        </p>
                      </div>
                    
                    <br/>
                    <br/>
                  </div>
                  <Footer />
                </div>
              </div>
              {/* card-body */}
            </div>
            {/* card */}
          </div>
          {/* col */}
          <div className="col-sm-2"></div>
        </div>
        {/* row */}
      </div>
    );
  }
}

export default startPage;
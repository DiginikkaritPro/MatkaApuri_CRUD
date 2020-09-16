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
                          <a href="/createquestion">
                            <button className="btn btn-light">Lisää kysymys</button> 
                          </a>
                        </p>
                        <p>
                          <a href="/updatequestion">
                            <button className="btn btn-light">Päivitä kysymyksen tietoja</button>
                          </a>
                        </p>
                        <p>
                          <a href="/deletequestion">
                            <button className="btn btn-light">Poista kysymys</button>
                          </a>   
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
import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
const GRAPHQL_SERVER_URL = 'http://10.78.161.237:3000/api/graphql';

class deleteQuestion extends Component {

  deleteQuestion = async (kysymysID) => {
	  // Haetaan kysymykseen liittyvien vastausten VastausID:t
    let response = await fetch(GRAPHQL_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query getQuestionsById($id: String!) {
                    vastausid(KysymysID: $id) {
                        VastausID
                    }
                }`,
        variables: { id: `${kysymysID}` },
      })
    });

    let data = await response.json();
	  if (!data.data.vastausid || data.data.vastausid.length === 0) {
		  return;
	  }

	  const vastausIDt = [];
	  data.data.vastausid.forEach(e => {
		  vastausIDt.push(e.VastausID); 
	  });

	  // Poistetaan kysymys
	  await fetch(GRAPHQL_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation deleteQuestion($id: String!) {
                    poistakysymys(KysymysID: $id) {
                        KysymysID
                    }
                }`,
        variables: { id: `${kysymysID}` },
      })
    });

	  // Poistetaan vastaukset, yhteenvedot ja infot
	  vastausIDt.forEach(async vastausID => {
		  await fetch(GRAPHQL_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation deleteAnswerSummaryAndInfo($id: String!) {
                poistavastausyhteenvetojainfo(VastausID: $id) {
                  VastausID
                }
              }`,
          variables: { id: `${vastausID}` },
        })
		  });
    });
    
  };


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
                    <form onSubmit={this.submitData}>
                      <br />
                      <input
                        className="sendBtn btn btn-secondary"
                        type="submit"
                        value="Poista"
                      />
                    </form>
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
}

export default deleteQuestion;

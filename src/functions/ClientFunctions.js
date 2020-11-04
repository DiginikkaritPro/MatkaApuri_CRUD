const GRAPHQL_SERVER_URL = 'http://localhost:3000/api/graphql';

//Tällä haetaan viimeinen kysymysid parsetaan se int muotoon ja käsitellään
let getLastQuestionId = async () => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getLastQID{
          kysymyslastid
        }`,
    }),
  });

  let data = await res.json();

  let QuestionData = data.data.kysymyslastid[0];

  return QuestionData;
};

//Tällä haetaan viimeinen vastausid, parsetaan se int muotoon ja käsitellään
let getLastAnswerId = async () => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getLastAID{
            vastauslastid 
          }`,
    }),
  });

  let data = await res.json();

  let AnswerData = data.data.vastauslastid[0];


  return AnswerData;
};

//Tällä haetaan viimeinen jatkokysymysid ja kysymys parsetaan ne int muotoon ja käsitellään
//Miten tuodaan jatkokysymystä varten uudet vastausidt mikäli kysymykselläkin on useampi vastausid, muuttuja? esim. n+1
let getLastFollowUpQuestionId = async () => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getLastFUQID {
            jatkokysymyslastid
          }`,
    }),
  });

  let data = await res.json();


  let FollowUpData = data.data.jatkokysymyslastid[0];


  return FollowUpData
};

let insertNewQuestion = async (newQid, questionTXT, infoTXT) => {
  newQid = newQid.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation insertQuestion($kid: String!, $kys: String!, $info: String){
            luokysymys(KysymysID: $kid, KysymysTXT: $kys, KysymysINFO: $info) {
                KysymysID
                KysymysTXT
                KysymysINFO
            }
          }`,
      variables: {
        kid: newQid,
        kys: questionTXT,
        info: infoTXT,
      },
    }),
  });
  await res.json();
};

let insertNewFollowUpQuestion = async (newQid, newXQid, questionTXT, infoTXT) => {
  newQid = newQid.toString();
  newXQid = newXQid.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation insertFollowUpQuestion($xid: String!, $kid: String!, $kys: String!, $info: String){
            luojatkokysymys(JatkokysymysID: $xid, KysymysID: $kid, KysymysTXT: $kys, KysymysINFO: $info) {
                JatkokysymysID
                KysymysID
                KysymysTXT
                KysymysINFO
            }
          }`,
      variables: {
        xid: newXQid,
        kid: newQid,
        kys: questionTXT,
        info: infoTXT,
      },
    }),
  });
  await res.json();
};
//Insert Answers
let insertNewAnswers = async (newAid, newQid, inputTXT, newFUPid) => {
  newAid = newAid.toString();
  newQid = newQid.toString();
  newFUPid = newFUPid.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation insertAnswer($kid: String!, $vid: String!, $txt: String!, $fup: String){
            luovastaukset(KysymysID: $kid, VastausID: $vid, VastausTXT: $txt, JatkokysymysID: $fup) {
                KysymysID
                VastausID
                VastausTXT
                JatkokysymysID
            }
          }`,
      variables: { vid: newAid, kid: newQid, txt: inputTXT, fup: newFUPid },
      //Näille vastaus 'txt' muuttujille pitää tuoda joltain tekstikentältä arvo
      //Vastauksia pitää myös pystyä luomaan dynaamisesti
    }),
  });
  await res.json();

};

//tänne sama n-muuttuja ja luodaan uusi summary kenttä
let insertNewSummary = async (newAid, infoHeader, infoTXT, infoLink) => {
  newAid = newAid.toString();

  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation insertSummary($yid: String!, $header: String, $txt: String, $link: String){
            
            luoinfo(YhteenvetoID: $yid, Otsikko: $header, InfoTXT: $txt, Linkki: $link){
                YhteenvetoID
                Otsikko
                InfoTXT
                Linkki
            }
            
          }`,
      variables: {
        yid: newAid,
        txt: infoTXT,
        header: infoHeader,
        link: infoLink,
      },
    }),
  });
  await res.json();
};

let delQuestion = async (kysymysID) => {
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
                      JatkokysymysID
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

  const jatkoKysymysIDt = [];
  data.data.vastausid.forEach(e => {
    if (e.JatkokysymysID || e.JatkokysymysID !== "") {
      jatkoKysymysIDt.push(e.JatkokysymysID)
    }
  })

  // Poistetaan kaikki kysymykset jotka liittyvät puurakenteeseen
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

  // Poistetaan vastaukset ja infot
  for (let vastausID of vastausIDt) {
    await fetch(GRAPHQL_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation deleteAnswerSummaryAndInfo($id: String!) {
              poistavastausjainfo(VastausID: $id) {
                VastausID
              }
            }`,
        variables: { id: `${vastausID}` },
      })
    });
  }
  
  // Poistetaan jatkokysymykset ja niiden vastaukset
  for (let jatkokysymysID of jatkoKysymysIDt) {
    let response = await fetch(GRAPHQL_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query getQuestionIDsFromFollowUpIDs($id: String!) {
              jatkokysymysid(JatkokysymysID: $id) {
                KysymysID
              }
            }`,
        variables: { id: `${jatkokysymysID}` },
      })
    });
    let data = await response.json();
    console.dir(data)
    if (!data.data.jatkokysymysid || data.data.jatkokysymysid.length === 0) {
      return;
    }
    for (let e of data.data.jatkokysymysid) {
      if (e.KysymysID && e.KysymysID !== "") {
        await delQuestion(e.KysymysID)
      }
    }
  }
};

let getQuestionsNotFollowUp = async () => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getQuestionsNotFollowup {
          kysymyseijatko {
            KysymysID
            KysymysTXT
            KysymysINFO
          }
        }`,
    }),
  });
  let data = await res.json();
  let array = data.data.kysymyseijatko;
  if (!array) {
    return [];
  }
  array.sort((a, b) => {
    return parseInt(a.KysymysID) - parseInt(b.KysymysID);
  });
  return array;
};

let getQuestionById = async (kysymysID) => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getQuestion($id: String!) {
          kysymysid(KysymysID: $id) {
            KysymysTXT
            KysymysINFO
            JatkokysymysID
          }
        }`,
      variables: { id: `${kysymysID}` }
    }),
  });
  let data = await res.json();
  return data;
};

let getAnswersById = async (kysymysID) => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getAnswers($id: String!) {
          vastausid(KysymysID: $id) {
            VastausTXT
            VastausID
          }
        }`,
      variables: { id: `${kysymysID}` }
    }),
  });
  let data = await res.json();
  return data;
};

let getAnswerByAnswerId = async (vastausID) => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getAnswers($id: String!) {
          vastausvastausid(VastausID: $id) {
            VastausTXT
            VastausID
            KysymysID
            JatkokysymysID
          }
        }`,
      variables: { id: `${vastausID}` }
    }),
  });
  let data = await res.json();
  return data;
};

let getSummaryById = async (vastausID) => {
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query getSummaries($id: String!) {
          yhteenvetostack(YhteenvetoID: $id) {
            Otsikko
            InfoTXT
            Linkki
          }
        }`,
      variables: { id: `${vastausID}` }
    }),
  });
  let data = await res.json();
  return data;
}

let updateDbQuestion = async (newQid, questionTXT, infoTXT) => {
  let questionID = newQid.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateQuestion($kid: String!, $kys: String!, $info: String){
              editoikysymys(KysymysID: $kid, KysymysTXT: $kys, KysymysINFO: $info) {
                  KysymysTXT
                  KysymysINFO
              }
            }`,
      variables: {
        kid: questionID,
        kys: questionTXT,
        info: infoTXT,
      },
    }),
  });
  await res.json();
};

let updateDbAnswers = async (newAid, inputTXT, followUpId) => {
  newAid = newAid.toString();
  followUpId = followUpId.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateAnswer($vid: String!, $txt: String!, $fupid: String){
              editoivastaus(VastausID: $vid, VastausTXT: $txt, JatkokysymysID: $fupid) {
                  VastausTXT
                  JatkokysymysID
              }
            }`,
      variables: { vid: newAid, txt: inputTXT, fupid: followUpId },

    }),
  });
  await res.json();

};

let updateDbSummaries = async (ansID, Otsikko, Info, Link) => {
  let newAid = ansID.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation updateSummaries($yid: String!, $header: String, $info: String, $link: String){
              editoiinfo(YhteenvetoID: $yid, Otsikko: $header, InfoTXT: $info, Linkki: $link) {
                  Otsikko
                  InfoTXT
                  Linkki
              }
            }`,
      variables: { yid: newAid, header: Otsikko, info: Info, link: Link },

    }),
  });
  await res.json();

};

const delFollowUpAnswer = async (vastausID) => {
  // Tämä funktio poistaa (jatko)vastauksen ja siihen liittyvän puunhaaran.
  // Kysymykselle, jolle ko. vastaus kuuluu, täytyy jäädä poiston jälkeenkin
  // vähintään 1 vastaus. Tämä funktio ei huolehdi siitä, mutta olettaa asian
  // olevan tarkistettu. 

  // Poistetaan vastaus ja info
  let response = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation delAnswerAndInfo($aid: String!) {
                  poistavastausvastausid(VastausID: $aid) {
                      KysymysID
                  }
                  poistainfo(YhteenvetoID: $aid) {
                    YhteenvetoID
                }
              }`,
      variables: { aid: `${vastausID}` }
    })
  });
};

const delAnswer = async (vastausID, jatkokysymysID) => {
  // Tämä funktio poistaa vastauksen ja siihen liittyvän puunhaaran.
  // Kysymykselle, jolle ko. vastaus kuuluu, täytyy jäädä poiston jälkeenkin
  // vähintään 1 vastaus. Tämä funktio ei huolehdi siitä, mutta olettaa asian
  // olevan tarkistettu. 

  // Poistetaan vastaus ja info
  let response = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation delAnswerAndInfo($aid: String!) {
                  poistavastausvastausid(VastausID: $aid) {
                    KysymysID
                  }
                  poistainfo(YhteenvetoID: $aid) {
                    YhteenvetoID
                  }
              }`,
      variables: { aid: `${vastausID}` }
    })
  });

  if (jatkokysymysID) {
    // Poistetaan jatkokysymys ja jatkovastaukset ja niiden infot.
    // Ensin haetaan jatkokysymyksen KysymysID. Se ei ole sama asia kuin vastauksessa oleva KysymysID.
    response = await fetch(GRAPHQL_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query getFollowUpQid($jkid: String!) {
                      jatkokysymysid(JatkokysymysID: $jkid) {
                        KysymysID
                      }
                  }`,
          variables: { jkid: `${jatkokysymysID}` }
        })
    });
    let data = await response.json();

    console.log(`delAnswer: vid = ${vastausID}, jkid = ${jatkokysymysID}`);
    console.dir(data);

    if (!data || !data.data || !data.data.jatkokysymysid || data.data.jatkokysymysid.length === 0){
      return;
    }
    let kysymysIdJk = data.data.jatkokysymysid[0].KysymysID;
    console.log(kysymysIdJk)
    await delFollowUpQuestion(kysymysIdJk, jatkokysymysID); 
  }
};

const delFollowUpQuestion = async (kysymysID, jatkokysymysID) => {
  // Tämä funktio poistaa jatkokysymyksen ja siihen liittyvät vastaukset ja infot.

  // Poistetaan jatkokysymys, sen vastaukset ja infot
  await delQuestion(kysymysID);

  // Poistetaan parent-vastauksesta JatkokysymysID-kenttä,
  // joka viittaa poistettuun jatkokysymykseen.
  let response = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation removeAnswerFupids($jkid: String!) {
                  poistavastaustenjatkokysymysid(JatkokysymysID: $jkid) {
                      VastausID
                  }
              }`,
      variables: { jkid: `${jatkokysymysID}` }
    })
  });
};

export {
  GRAPHQL_SERVER_URL,
  getLastQuestionId,
  getLastAnswerId,
  getLastFollowUpQuestionId,
  insertNewQuestion,
  insertNewAnswers,
  insertNewSummary,
  insertNewFollowUpQuestion,
  delQuestion,
  getAnswersById,
  getQuestionsNotFollowUp,
  getQuestionById,
  getSummaryById,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries,
  getAnswerByAnswerId,
  delFollowUpQuestion,
  delAnswer,
  delFollowUpAnswer
};

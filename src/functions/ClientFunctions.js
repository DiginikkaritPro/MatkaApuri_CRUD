const GRAPHQL_SERVER_URL = 'http://10.78.161.237:3000/api/graphql';

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
          kysymyslastid {
            KysymysID
          }
        }`,
    }),
  });

  let data = await res.json();
  console.log("Viimeinen KysymysID: " + data.data.kysymyslastid[0].KysymysID);
  let parseQuestionData = parseInt(data.data.kysymyslastid[0].KysymysID) + 1;
  console.log("Muokattu KysymysID: " + parseQuestionData);
  return parseQuestionData;
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
            vastauslastid {
              VastausID
            }
          }`,
    }),
  });

  let data = await res.json();
  console.log("Viimeinen VastausID: " + data.data.vastauslastid[0].VastausID);
  let parseAnswerData = parseInt(data.data.vastauslastid[0].VastausID) + 1;
  console.log("Muokattu VastausID: " + parseAnswerData);

  return parseAnswerData;
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
            jatkokysymyslastid {
            KysymysID
            JatkokysymysID
            }
            vastauslastid {
            VastausID
            }
          }`,
    }),
  });

  let data = await res.json();
  console.log(
    "Viimeinen JatkokysymysID: " +
      data.data.jatkokysymyslastid[0].JatkokysymysID
  );
  console.log(
    "Viimeinen KysymysID: " + data.data.jatkokysymyslastid[0].KysymysID
  );
  console.log("Viimeinen VastausID: " + data.data.vastauslastid[0].VastausID);
  let n = 1;
  let parseData1 = parseInt(data.data.jatkokysymyslastid[0].JatkokysymysID) + 1;
  let parseData2 = parseInt(data.data.jatkokysymyslastid[0].KysymysID) + n + 1;
  let parseData3 = parseInt(data.data.vastauslastid[0].VastausID) + n + 1;

  console.log(
    "Muokattu JatkokysymysID: " +
      parseData1 +
      "\nMuokattu KysymysID jatkokysymystä varten: " +
      parseData2 +
      "\nMuokattu VastausID jatkokysymystä varten: " +
      parseData3
  );
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


//n-muuttuja esim luokan stateen? onClick funktiolla kutsutaan uutta insertNewAnswers funktiota jolle annetaan statesta parametrinä n-arvo
let insertNewAnswers = async (newAid, newQid, inputTXT) => {
  newAid = newAid.toString();
  newQid = newQid.toString();
  let res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation insertAnswer($kid: String!, $vid: String!, $txt: String!){
            luovastaukset(KysymysID: $kid, VastausID: $vid, VastausTXT: $txt) {
                KysymysID
                VastausID
                VastausTXT
            }
          }`,
      variables: { vid: newAid, kid: newQid, txt: inputTXT},
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
      query: `mutation insertSummary($yid: String!, $vid: String!, $header: String!, $txt: String!, $link: String!){
            luoyhteenveto(YhteenvetoID: $yid, VastausID: $vid) {
                YhteenvetoID
                VastausID
            }
            
            luoinfo(YhteenvetoID: $yid, Otsikko: $header, InfoTXT: $txt, Linkki: $link){
                YhteenvetoID
                Otsikko
                InfoTXT
                Linkki
            }
            
          }`,
      variables: {
        vid: newAid,
        yid: newAid,
        txt: infoTXT,
        header: infoHeader,
        link: infoLink,
      },
    }),
  });
  await res.json();
};

export {
  getLastQuestionId,
  getLastAnswerId,
  getLastFollowUpQuestionId,
  insertNewQuestion,
  insertNewAnswers,
  insertNewSummary,
};

import React from "react";
import {GRAPHQL_SERVER_URL} from '../../functions/ClientFunctions';

const imageTreeBlank = require('../../pic/treeBlank.png');
const imageTreeBranch = require('../../pic/treeBranch.png');
const imageTreeAngle = require('../../pic/treeAngle.png');
const imageTreeBar = require('../../pic/treeBar.png');

const showIds = true;

const createTreeFromDB = async (handleClick, selectedRBId, itemEventHandlers) => {
  // Haetaan kaikki kysymykset.
  const kysData = await fetchData(
    `query {
          kysymys {
              KysymysID
              KysymysTXT
              JatkokysymysID
          }
      }`,
    {}
  );
  if (!kysData.data.kysymys || kysData.data.kysymys.length === 0) {
    return [
      <p key="p" className="treeItemText">
        Yhtään kysymystä ei ole vielä lisätty.
        Lisää ensimmäinen kysymys painamalla yläreunan Kysymys-painiketta.
        Muokkaa kysymyksen tekstiä oikean puolen paneelissa ja paina Tallenna.
      </p>
    ];
  }
  kysData.data.kysymys.sort((a, b) => {
    return parseInt(a.KysymysID) - parseInt(b.KysymysID);
  });

  const tree = [];

  for (let kys of kysData.data.kysymys) {
    if (kys.JatkokysymysID) {
      // Hypätään kysymys yli, jos se on jatkokysymys.
      continue;
    }
    const idStr = showIds ? ` (KID=${kys.KysymysID}, JKID=${kys.JatkokysymysID})` : "";
    const rbId = `rb-tree-question-${kys.KysymysID}`;
    tree.push(
      <p
        key={`p-tree-question-${kys.KysymysID}`}
        className="treeItemText treeItemTextQuestion"
        style={{ fontWeight: "bold" }}
        title={`Kysymys: ${kys.KysymysTXT}${idStr}`}
      >
        <input
          type="radio"
          name="treeradios"
          defaultChecked={rbId === selectedRBId}
          className="treeItemRadio"
          id={rbId}
          onClick={handleClick}
        />
        <label htmlFor={rbId} className="treeItemLabel">{kys.KysymysTXT}</label>
      </p>
    );
    await getAnswers(kys, tree, handleClick, selectedRBId);
  }

  return tree;
};

const getAnswers = async (kys, tree, handleClick, selectedRBId) => {
  // Haetaan kysymykseen liittyvät vastaukset.

  const vastausStyle = { marginLeft: "1.5em" };

  const vastData = await fetchData(
    `query getQuestions($id: String!) {
        vastausid(KysymysID: $id) {
            VastausID
            VastausTXT
            KysymysID
            JatkokysymysID
        }
    }`,
    { id: `${kys.KysymysID}` }
  );
  if (!vastData.data.vastausid) {
    return;
  }
  vastData.data.vastausid.sort((a, b) => {
    return parseInt(a.VastausID) - parseInt(b.VastausID);
  });
  const answersLength = vastData.data.vastausid.length;

  for (let i = 0; i < answersLength; i++) {
    const vast = vastData.data.vastausid[i];
    const isLastAnswer = (i === answersLength - 1);
    const idStr = showIds ? ` (VID=${vast.VastausID}, KID=${vast.KysymysID}, JKID=${vast.JatkokysymysID})` : "";
    const rbId = `rb-tree-answer-${vast.VastausID}`;
    tree.push(
      <p
        style={vastausStyle}
        key={`p-tree-answer-${vast.VastausID}`}
        className="treeItemText treeItemTextAnswer"
        title={`Vastaus: ${vast.VastausTXT}${idStr}`}
      >
        <img src={isLastAnswer ? imageTreeAngle : imageTreeBranch} alt="--" className="treeLine" />
        <input
          type="radio"
          name="treeradios"
          defaultChecked={rbId === selectedRBId}
          className="treeItemRadio"
          id={rbId}
          onClick={handleClick}
        />
        <label htmlFor={rbId} className="treeItemLabel">{vast.VastausTXT}</label>
      </p>
    );
    if (vast.JatkokysymysID) {
      await getFollowUpQuestions(vast, tree, handleClick, selectedRBId, isLastAnswer);
    }
  }
};

const getFollowUpQuestions = async (vast, tree, handleClick, selectedRBId, isLastAnswer) => {
  // Haetaan vastaukseen liittyvät jatkokysymykset.

  const jatkokysymysStyle = { marginLeft: "1.5em" };

  const jatkokysData = await fetchData(
    `query getFollowUpQuestions($id: String!) {
        jatkokysymysid(JatkokysymysID: $id) {
            KysymysID
            KysymysTXT
            JatkokysymysID
        }
    }`,
    { id: `${vast.JatkokysymysID}` }
  );
  if (!jatkokysData.data.jatkokysymysid) {
    return;
  }
  jatkokysData.data.jatkokysymysid.sort((a, b) => {
    return parseInt(a.KysymysID) - parseInt(b.KysymysID);
  });
  
  for (let jatkokys of jatkokysData.data.jatkokysymysid) {
    const idStr = showIds ? ` (KID=${jatkokys.KysymysID}, JKID=${jatkokys.JatkokysymysID})` : "";
    const rbId = `rb-tree-fu-question-${jatkokys.KysymysID}`;
    tree.push(
      <p
        style={jatkokysymysStyle}
        key={`p-tree-fu-question-${jatkokys.KysymysID}`}
        className="treeItemText treeItemTextFUQuestion"
        title={`Jatkokysymys: ${jatkokys.KysymysTXT}${idStr}`}
      >
        <img src={isLastAnswer ? imageTreeBlank : imageTreeBar} alt="--" className="treeLine" />
        <img src={imageTreeAngle} alt="--" className="treeLine" />
        <input
          type="radio"
          name="treeradios"
          defaultChecked={rbId === selectedRBId}
          className="treeItemRadio"
          id={rbId}
          onClick={handleClick}
        />
        <label htmlFor={rbId} className="treeItemLabel">{jatkokys.KysymysTXT}</label>
      </p>
    );
    await getFollowUpAnswers(jatkokys, tree, handleClick, selectedRBId, isLastAnswer);
  }
};

const getFollowUpAnswers = async (jatkokys, tree, handleClick, selectedRBId, isLastAnswer) => {
  // Haetaan jatkokysymykseen liittyvät jatkovastaukset.

  const jatkovastausStyle = { marginLeft: "1.5em" };

  const jatkovastData = await fetchData(
    `query getFollowUpAnswers($id: String!) {
        vastausid(KysymysID: $id) {
            VastausID
            VastausTXT
            KysymysID
            JatkokysymysID
        }
    }`,
    { id: `${jatkokys.KysymysID}` }
  );
  if (!jatkovastData.data.vastausid) {
    return;
  }
  jatkovastData.data.vastausid.sort((a, b) => {
    return parseInt(a.VastausID) - parseInt(b.VastausID);
  });
  const fuAnswersLength = jatkovastData.data.vastausid.length;

  for (let i = 0; i < fuAnswersLength; i++) {
    const jatkovast = jatkovastData.data.vastausid[i];
    const idStr = showIds ? ` (VID=${jatkovast.VastausID}, KID=${jatkovast.KysymysID}, JKID=${jatkovast.JatkokysymysID})` : "";
    const rbId = `rb-tree-fu-answer-${jatkovast.VastausID}`;
    tree.push(
      <p
        style={jatkovastausStyle}
        key={`p-tree-fu-answer-${jatkovast.VastausID}`}
        className="treeItemText treeItemTextFUAnswer"
        title={`Jatkokysymyksen vastaus: ${jatkovast.VastausTXT}${idStr}`}
      >
        <img src={isLastAnswer ? imageTreeBlank : imageTreeBar} alt="--" className="treeLine" />
        <img src={imageTreeBlank} alt="--" className="treeLine" />
        <img src={(i === fuAnswersLength - 1) ? imageTreeAngle : imageTreeBranch} alt="--" className="treeLine" />
        <input
          type="radio"
          name="treeradios"
          className="treeItemRadio"
          defaultChecked={rbId === selectedRBId}
          id={rbId}
          onClick={handleClick}
        />
        <label htmlFor={rbId} className="treeItemLabel">{jatkovast.VastausTXT}</label>
      </p>
    );
  }
};

const fetchData = async (query, variables) => {
  let response = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  return await response.json();
};

export { createTreeFromDB };

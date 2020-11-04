const { ApolloServer, gql } = require("apollo-server-express");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const uri =
  "mongodb+srv://JaniS:10sm8jms@tapahtumaapuri.razer.mongodb.net/TapahtumaApuri?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(function (err) {
  console.log("MongoDB connected!");
  db = client.db("TapahtumaApuri");
  // perform actions on the collection object
});

const typeDefs = gql`
  type Query {
    info: [Info]
    infoid(YhteenvetoID: String!): [Info]
    jatkokysymys: [Kysymys]
    jatkokysymyslastid: [Int]
    jatkokysymysid(JatkokysymysID: String!): [Kysymys]
    kysymys: [Kysymys]
    kysymyslastid: [Int]
    kysymysid(KysymysID: String!): [Kysymys]
    vastaus: [Vastaus]
    vastauslastid: [Int]
    vastausid(KysymysID: String!): [Vastaus]
    yhteenvetostack(YhteenvetoID: String!): [Yhteenvetostack]
    kysymysIdEiJatko(KysymysID: String!): [Kysymys]
    kysymyseijatko: [Kysymys]
    vastausvastausid(VastausID: String!): [Vastaus]
  }

  type Mutation {
    poistavastausjainfo(VastausID: String!): Vastaus
    poistakysymys(KysymysID: String!): Kysymys
    poistavastaus(KysymysID: String!): Vastaus
    poistavastausvastausid(VastausID: String!): Vastaus
    poistainfo(YhteenvetoID: String!): Info
    luokysymys(
      KysymysID: String!
      KysymysTXT: String!
      KysymysINFO: String
    ): Kysymys
    luovastaukset(
      KysymysID: String!
      VastausID: String!
      VastausTXT: String!
      JatkokysymysID: String
    ): Vastaus
    luoinfo(
      YhteenvetoID: String!
      Otsikko: String
      InfoTXT: String
      Linkki: String
    ): Info
    luojatkokysymys(
      KysymysID: String!
      JatkokysymysID: String!
      KysymysTXT: String!
      KysymysINFO: String
    ): Kysymys
    editoikysymys(
      KysymysID: String!
      KysymysTXT: String!
      KysymysINFO: String
    ): Kysymys
    editoivastaus(VastausID: String!, VastausTXT: String!, JatkokysymysID: String): Vastaus
    editoiinfo(
      YhteenvetoID: String!
      Otsikko: String
      InfoTXT: String
      Linkki: String
    ): Info
    poistavastaustenjatkokysymysid(JatkokysymysID: String!): Vastaus
  }

  type Info {
    YhteenvetoID: String!
    Otsikko: String!
    InfoTXT: String!
    Linkki: String!
  }

  type Kysymys {
    KysymysID: String!
    JatkokysymysID: String
    KysymysTXT: String!
    KysymysINFO: String!
    VastausID: String
  }

  type Vastaus {
    VastausID: String
    VastausTXT: String
    KysymysID: String
    JatkokysymysID: String
  }

  type Yhteenvetostack {
    YhteenvetoID: String!
    Otsikko: String!
    Linkki: String!
    InfoTXT: String!
  }
`;

const arrayQuery = async (collectionName) => {
  data = await db
    .collection(collectionName)
    .find()
    .toArray()
    .then((res) => {
      return res;
    });
  return data;
};
const idQuery = async (collectionName, args, idName) => {
  if (args[idName]) {
    var id = args[idName];
    data = await db
      .collection(collectionName)
      .find()
      .toArray()
      .then((res) => {
        return res.filter((field) => field[idName] === id);
      });
    return data;
  } else {
    data = await db
      .collection(collectionName)
      .find()
      .toArray()
      .then((res) => {
        return res;
      });
    return data;
  }
};

const resolvers = {
  Mutation: {
    poistavastausjainfo: async (parent, args) => {
      const VastausID = args.VastausID;

      let collectionName = "Vastaukset";
      await db.collection(collectionName).deleteMany({ VastausID: VastausID });

      collectionName = "Info";
      await db
        .collection(collectionName)
        .deleteMany({ YhteenvetoID: VastausID });

      return {
        VastausID: VastausID,
      };
    },

    // poistakysymyksenvastauksetjainfot: async (parent, args) => {
    //   const KysymysID = args.KysymysID;

    //   let collectionName = "Vastaukset";
    //   await db.collection(collectionName).deleteMany({ KysymysID: KysymysID });

    //   collectionName = "Info";
    //   await db.collection(collectionName).deleteMany({ YhteenvetoID: VastausID });

    //   return {
    //     VastausID: VastausID,
    //   };
    // },

    poistakysymys: async (parent, args) => {
      const deleteObj = {
        KysymysID: args.KysymysID,
      };
      const collectionName1 = "Kysymys";
      await db
        .collection(collectionName1)
        .deleteOne({ KysymysID: deleteObj.KysymysID });

      return deleteObj;
    },
    poistavastaus: async (parent, args) => {
      const deleteObj = {
        KysymysID: args.KysymysID,
      };
      const collectionName2 = "Vastaukset";
      await db
        .collection(collectionName2)
        .deleteMany({ KysymysID: deleteObj.KysymysID });

      return deleteObj;
    },
    poistavastausvastausid: async (parent, args) => {
      const deleteObj = {
        VastausID: args.VastausID,
      };
      const collectionName2 = "Vastaukset";
      await db
        .collection(collectionName2)
        .deleteMany({ VastausID: deleteObj.VastausID });

      return deleteObj;
    },
    poistainfo: async (parent, args) => {
      const deleteObj = {
        YhteenvetoID: args.YhteenvetoID,
      };
      const collectionName4 = "Info";
      await db
        .collection(collectionName4)
        .deleteOne({ YhteenvetoID: deleteObj.YhteenvetoID });
      return deleteObj;
    },

    luokysymys: async (parent, args) => {
      const kysymysObj = {
        KysymysID: args.KysymysID,
        KysymysTXT: args.KysymysTXT,
        KysymysINFO: args.KysymysINFO,
      };
      const collectionName = "Kysymys";
      await db.collection(collectionName).insertOne(kysymysObj);

      return kysymysObj;
    },

    luojatkokysymys: async (parent, args) => {
      const jatkoKysymysObj = {
        KysymysID: args.KysymysID,
        KysymysTXT: args.KysymysTXT,
        KysymysINFO: args.KysymysINFO,
        JatkokysymysID: args.JatkokysymysID,
      };
      const collectionName = "Kysymys";
      await db.collection(collectionName).insertOne(jatkoKysymysObj);

      return jatkoKysymysObj;
    },
    luovastaukset: async (parent, args) => {
      const vastausObj = {
        KysymysID: args.KysymysID,
        VastausID: args.VastausID,
        VastausTXT: args.VastausTXT,
        JatkokysymysID: args.JatkokysymysID
      };
      const collectionName = "Vastaukset";
      await db.collection(collectionName).insertOne(vastausObj);

      return vastausObj;
    },

    luoinfo: async (parent, args) => {
      const infoObj = {
        YhteenvetoID: args.YhteenvetoID,
        Otsikko: args.Otsikko,
        InfoTXT: args.InfoTXT,
        Linkki: args.Linkki,
      };
      const collectionName = "Info";
      await db.collection(collectionName).insertOne(infoObj);

      return infoObj;
    },
    editoikysymys: async (parent, args) => {
      const filter = { KysymysID: args.KysymysID };

      const kysymysObj = {
        $set: {
          KysymysTXT: args.KysymysTXT,
          KysymysINFO: args.KysymysINFO,
        }     
      };
      const collectionName = "Kysymys";
      await db.collection(collectionName).updateOne(filter, kysymysObj);

      return kysymysObj;
    },
    editoivastaus: async (parent, args) => {
      const filter = { VastausID: args.VastausID };

      const vastausObj = {
        $set: {
        VastausTXT: args.VastausTXT,
        JatkokysymysID: args.JatkokysymysID
        }
      };
      const collectionName = "Vastaukset";
      await db.collection(collectionName).updateOne(filter, vastausObj);

      return vastausObj;
    },

    poistavastaustenjatkokysymysid: async (parent, args) => {
      // Tyhjentää Vastauksien JatkokysymysID-kentät, kunhan vastauksen
      // JatkokysymysID:llä alkujaan on annettu arvo args.JatkokysymysID.
      const filter = { JatkokysymysID: args.JatkokysymysID };
      const vastausObj = {
        $set: {
          JatkokysymysID: ""
        }
      };
      const collectionName = "Vastaukset";
      await db.collection(collectionName).updateMany(filter, vastausObj);
      return null;
    },

    editoiinfo: async (parent, args) => {
      const filter = { YhteenvetoID: args.YhteenvetoID };

      const infoObj = {
        $set: {
        Otsikko: args.Otsikko,
        InfoTXT: args.InfoTXT,
        Linkki: args.Linkki,
        }
      };
      const collectionName = "Info";
      await db.collection(collectionName).updateOne(filter, infoObj);

      return infoObj;
    },
  },
  Query: {
    info: async () => {
      return arrayQuery("Info");
    },

    infoid: async (parent, args, context, info) => {
      return idQuery("Info", args, "YhteenvetoID");
    },

    jatkokysymys: async () => {
      return arrayQuery("Kysymys");
    },

    jatkokysymyslastid: async () => {
      let kysymykset = await arrayQuery("Kysymys");
      let id = 0;
      kysymykset.forEach((kys) => {
        if (kys.JatkokysymysID) {
          if (parseInt(kys.JatkokysymysID) > id) {
            id = parseInt(kys.JatkokysymysID);
          }
        }
      });

      return [id];
    },

    jatkokysymysid: async (parent, args, context, info) => {
      return idQuery("Kysymys", args, "JatkokysymysID");
    },

    kysymys: async () => {
      return arrayQuery("Kysymys");
    },

    kysymyslastid: async () => {
      let kysymykset = await arrayQuery("Kysymys");
      let id = 0;
      kysymykset.forEach((kys) => {
        if (parseInt(kys.KysymysID) > id) {
          id = parseInt(kys.KysymysID);
        }
      });

      return [id];
    },

    kysymysid: async (parent, args, context, info) => {
      return idQuery("Kysymys", args, "KysymysID");
    },

    vastaus: async () => {
      return arrayQuery("Vastaukset");
    },

    vastauslastid: async () => {
      let vastaukset = await arrayQuery("Vastaukset");
      let id = 0;
      vastaukset.forEach((vas) => {
        if (parseInt(vas.VastausID) > id) {
          id = parseInt(vas.VastausID);
        }
      });

      return [id];
    },

    vastausid: async (parent, args, context, info) => {
      return idQuery("Vastaukset", args, "KysymysID");
    },

    vastausvastausid: async (parent, args, context, info) => {
      return idQuery("Vastaukset", args, "VastausID");
    },

    yhteenvetostack: async (parent, args, context) => {
      let info = await idQuery("Info", args, "YhteenvetoID");

      const data = {
        Otsikko: info[0].Otsikko,
        InfoTXT: info[0].InfoTXT,
        Linkki: info[0].Linkki,
      };
      return [data];
    },

    kysymysIdEiJatko: async (parent, args, context) => {
      // Palauttaa haun, jolla on annettu KysymysID ja lisäksi
      // JatkokysymysID on tyhjä tai null.
      const collectionName = "Kysymys";
      if (args.KysymysID) {
        var id = args.KysymysID;
        let data = await db
          .collection(collectionName)
          .find()
          .toArray()
          .then((res) => {
            return res.filter((field) => {
              return field.KysymysID === id && !field.JatkokysymysID;
            });
          });
        return data;
      } else {
        let data = await db
          .collection(collectionName)
          .find()
          .toArray()
          .then((res) => {
            return res;
          });
        return data;
      }
    },

    kysymyseijatko: async (parent, args, context) => {
      // Palauttaa kaikki kysymykset, joilla ei ole JatkokysymysID:tä.
      const collectionName = "Kysymys";
      let data = await db
        .collection(collectionName)
        .find()
        .toArray()
        .then((res) => {
          return res.filter((field) => {
            return !field.JatkokysymysID;
          });
        });
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
const path = "/api/graphql";

server.applyMiddleware({ app, path });
app.listen({ port: 3001 }, () =>
  console.log(`Server ready at http://localhost:3001${server.graphqlPath}`)
);

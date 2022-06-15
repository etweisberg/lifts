const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();

app.get("/lifts", (request, response) => {
  admin
    .firestore()
    .collection("lifts")
    .get()
    .then((data) => {
      let lifts = [];
      data.forEach((doc) => {
        lifts.push(doc.data());
      });
      return response.json(lifts);
    })
    .catch((err) => console.log(err));
});

app.post("/lifts", (request, response) => {
  if (request.method != "POST") {
    return response.status(400).json({ error: "invalid request " });
  }
  const newLift = {
    exercises: request.body.exercises,
    userHandle: request.body.userHandle,
    date: admin.firestore.Timestamp.fromDate(new Date()),
  };
  admin
    .firestore()
    .collection("lifts")
    .add(newLift)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);

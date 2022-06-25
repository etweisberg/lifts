//functions for updating firestore

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

//express setup
const express = require("express");
const e = require("express");
const app = express();
const db = admin.firestore();

//API routes
app.get("/lifts", (request, response) => {
  db.collection("lifts")
    .get()
    .then((data) => {
      let lifts = [];
      data.forEach((doc) => {
        lifts.push({
          liftId: doc.id,
          exercises: doc.data().exercises,
          date: doc.data().date,
          userHandle: doc.data().userHandle,
        });
      });
      return response.json(lifts);
    })
    .catch((err) => console.log(err));
});

app.post("/lift", (request, response) => {
  const newLift = {
    exercises: request.body.exercises,
    userHandle: request.body.userHandle,
    date: new Date().toISOString(),
  };
  db.collection("lifts")
    .add(newLift)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return admin.auth().createUser({
          email: newUser.email,
          emailVerified: false,
          password: newUser.password,
          handle: newUser.handle,
        });
      }
    })
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.getLifts = functions.https.onRequest((request, response) => {
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

exports.logLift = functions.https.onRequest((request, response) => {
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

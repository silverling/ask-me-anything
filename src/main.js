const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");
const utils = require("./utils");
// console.clear();

const AMA_TOKEN = process.env.AMA_TOKEN;
// const AMA_TOKEN = "p@ssW0rd";
const debug = (msg) => console.log("[DEBUG]:", msg);

// ======================================
// init api
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(
    'Hi, you can ask me anything from this api~ 😘\n\nTry the following commands:\n\n  - Ask a new question:\n    curl -d "q=Some Questions" ama.blurfate.com/new\n\n  - View all questions:\n    curl ama.blurfate.com/all\n'
  );
});

app.post("/new", (req, res) => {
  db.createNewQuestion(req.body.q);
  return res.send(
    "Successfully created a new question 🎉\n\n  - View all questions:\n    curl ama.blurfate.com/all\n"
  );
});

app.get("/all", (req, res) => {
  db.listAll((rows) =>
    utils.QAParser(rows, "normal", (rows) => {
      if (rows.length === 0) res.send("There's no question yet... 🥶");
      else res.send(rows);
    })
  );
});

// only admin access
app.post("/list", (req, res) => {
  auth(req.body.TOKEN, (err) => {
    if (err) return res.send(err);
    db.listAll((rows) =>
      utils.QAParser(rows, "admin", (rows) => {
        if (rows.length === 0) res.send("There's no question yet... 🥶");
        else res.send(rows);
      })
    );
  });
});

app.post("/reply", (req, res) => {
  auth(req.body.TOKEN, (err) => {
    if (err) return res.send(err);
    debug("Reply...");
    db.reply(req.body.id, req.body.a);
    res.send("Successfully answered 😎\n");
  });
});

app.post("/del", (req, res) => {
  auth(req.body.TOKEN, (err) => {
    if (err) return res.send(err);
    debug("Delete...");
    db.del(req.body.id);
    res.send("Successfully deleted 😏\n");
  });
});

const auth = (TOKEN, callback) => {
  if (TOKEN !== AMA_TOKEN) {
    debug("TOKEN ERROR");
    callback("TOKEN ERROR");
  } else {
    callback();
  }
};

app.listen(8080, () => console.log("Running on http://localhost:8080"));

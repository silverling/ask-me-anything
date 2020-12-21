const sqlite3 = require("sqlite3");

// init sqlite3 database
const db = new sqlite3.Database("./db/ama.db", (err) => {
  if (err) return console.error(err);
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS QA(\
    id                      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    question                TEXT NOT NULL,\
    answer                  TEXT NULL,\
    question_created_time   TEXT NOT NULL,\
    answer_created_time     TEXT)"
  );
});

const listAll = (callback) => {
  let sql = `SELECT id, question, answer FROM QA;`;
  db.all(sql, (err, rows) => {
    if (err) console.error(err);
    callback(rows);
  });
};

const createNewQuestion = (question) => {
  let sql = `INSERT INTO QA(question, question_created_time) VALUES('${Buffer.from(
    question
  ).toString("base64")}', '${Date()}');`;
  db.run(sql, (err) => {
    if (err) console.error(err);
  });
};

const reply = (id, answer) => {
  let sql = `UPDATE QA SET answer = '${Buffer.from(answer).toString(
    "base64"
  )}', answer_created_time = '${Date()}' WHERE id = ${id};`;
  db.run(sql, (err) => {
    if (err) console.error(err);
  });
};

const del = (id) => {
  let sql = `DELETE FROM QA WHERE id = ${id};`;
  db.run(sql, (err) => {
    if (err) console.error(err);
  });
};

exports.listAll = listAll;
exports.createNewQuestion = createNewQuestion;
exports.reply = reply;
exports.del = del;

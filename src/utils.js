String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const fixWidth = (str, indent) => {
  for (let i = indent; i < str.length; i += indent)
    str = str.splice(i, 0, "\n" + " ".repeat(7));
  return str;
};

const QAParser = (QA, type, callback) => {
  let str = new String();
  QA.forEach((item) => {
    let prefix;
    if (type === "admin") {
      prefix = " " + item.id + ".";
      prefix += " ".repeat(Math.abs(4 - prefix.length));
    } else {
      prefix = "  - ";
    }
    str += fixWidth(
      `${prefix}Q: ${Buffer.from(item.question, "base64").toString("utf-8")}\n`,
      80
    );
    if (item.answer !== null) {
      str += fixWidth(
        `    A: ${Buffer.from(item.answer, "base64").toString("utf-8")}\n\n`,
        80
      );
    } else {
      str += "    A: Not answered yet...\n\n";
    }
  });
  callback(str);
};

exports.QAParser = QAParser;

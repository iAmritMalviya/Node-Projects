const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

const date = require(__dirname + '/date.js')
console.log(date.time());


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let newItem = [];
let workList = [];
app.get("/", (req, res) => {
  

  res.render("index", { today: 'day', newItems: newItem });
});

app.get("/work", function (req, res) {
  res.render("index", { today: "work", newItems: workList });
});

app.post("/", function (req, res) {
  let item = req.body.list;

  if (req.body.button == "work") {
    workList.push(item);
    console.log(workList);
    res.redirect("/work");
  } else {
    newItem.push(item);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("server has started at 3000");
});

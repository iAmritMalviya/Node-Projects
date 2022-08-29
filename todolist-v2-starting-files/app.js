//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const todolistSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const todo = mongoose.model("todo", todolistSchema);

app.get("/", function (req, res) {

  const day = date.getDate();
  todo.find({}, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.render("list", { listTitle: day, newListItems: data });
  });

});



app.post("/", function (req, res) {
  console.log(topic);
  
 
  
  if (req.body.list === "Work") {
    todo.create({ title: req.body.newItem }, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("created successfully");
      }
    });

    res.redirect("/work");
  } else {
    todo.create({ title: req.body.newItem }, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("created successfully");
      }
    });

    res.redirect("/");
  }
});





app.post("/delete", function (req, res) {
  let checkedBoxItem = req.body.checkBox;
  todo.findByIdAndRemove(checkedBoxItem, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully deleted");
      res.redirect("/");
    }
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

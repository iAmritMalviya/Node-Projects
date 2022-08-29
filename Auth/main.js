var express = require("express");
const passport = require("passport");
(mongoose = require("mongoose")),
  (ejs = require("ejs")),
  (bodyParser = require("body-parser"));
session = require("express-session");
passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "thisis",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/user");
let userShcema = new mongoose.Schema({
  username: String,
  password: String,
});
userShcema.plugin(passportLocalMongoose);
let User = mongoose.model("user", userShcema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    console.log(req.body);
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(user, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(req.user.username);
        
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secret/" + req.user.username);
        });
      }
    });
  });

app.get("/secret/:user", function (req, res) {
    let username = req.params.user;
    console.log(username);
    
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.render("secret", {username: username});
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return err;
    } else {
      res.redirect("/");
    }
  });
});

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    console.log(req.body);
    User.register(
      { username: req.body.username },
      req.body.password,
      function (err, data) {
        if (err) {
          console.log("this is " + err);
        } else {
        //   console.log("this is data" + data);
          passport.authenticate("local")(req, res, function () {
            res.redirect("/secret/" + req.body.username);
          });
        }
      }
    );
  });

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});

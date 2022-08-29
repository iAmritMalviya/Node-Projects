//jshint esversion:6
const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("hellsadjf");
})

app.get("/contact", function (req, res) {
    res.send("Hey contact me: at this one")
})
app.get("/about", function (req, res) {
    res.send("i won't tell you anything")
})


app.listen(3000, function () {
    console.log('Server has started at 3000');
    
});
//jshind esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
   

})

app.post("/", function (req, res) {
    console.log(req.body);
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var bmi = (weight / (height * height)).toFixed(2)

    res.send('Your BMI is :'+ bmi)
})


app.listen(3000, function()
{
    console.log("We're calculating BMI")
})
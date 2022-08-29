const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/bmi", function (req, res) {
    res.sendFile(__dirname + "/bmi.html");
});

app.post("/", function (req, res) {
    console.log(req.body);
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send('Thank for reaching out:  '+ result)
})
app.post("/bmi", function (req, res) {
    console.log(req.body);
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    console.log(height, weight);
    
    var bmi = (weight / (height * height)).toFixed(2);
    res.send('Your Bmi is:' + bmi)
})




app.listen(3000, function () {    
    console.log('server has started at 3000');
    
})

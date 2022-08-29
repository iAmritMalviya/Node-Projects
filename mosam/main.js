const express = require("express");
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const { response } = require("express");
app.use(bodyParser.urlencoded({extended: true}));





app.get('/', function (req, res) {
   res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {
    var city = (req.body.city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=94fc829dd0850ddd59beeb2a4ba14637&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on('data', function (data) {
            var wData = JSON.parse(data);
            console.log(wData);
            console.log(wData.name);
            res.write(`<h1>in ${wData.name} the temprature is ${wData.main.temp}</h1>`);
            res.write(`<p>the weather is ${wData.weather[0].description} </p>`);
            res.write(`<img src="https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png"/>`)
          res.send();
          
          
        })
    })
})



app.listen(3000, function () {
    console.log('Server has started at 3000');
    
})
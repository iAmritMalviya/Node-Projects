const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require("https");
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('home');
})

const city = '';




app.post('/', function (request, res) {
    const options = {
        "method": "GET",
        "hostname": "hotels4.p.rapidapi.com",
        "port": null,
        "path": "/locations/v2/search?query=new%20york&locale=en_US&currency=USD",
        "headers": {
            "X-RapidAPI-Key": "7bf3f04a1fmsh9bc406927a3368fp1377c0jsn407536b0f7d5",
            "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
    const req = http.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            let data = JSON.parse(body);
            console.log(data);
            
           console.log(data.suggestions[1]);
           console.log(data.term);
           
        });
    });
    
    req.end()
    res.redirect('/');
})

app.listen(3000, function () {
    console.log('Server has started at 3000');
})
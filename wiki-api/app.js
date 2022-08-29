const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/wikidb');
const articleSchema = mongoose.Schema({
title: String,
content: String
})

const Article = mongoose.model('article', articleSchema);
// console.log(mongoose.connect());

const post = new Article({
    title:'this is post',
    content: 'this is content'
}) 

post.save();                                                                                                                                                                                                         

app.get('/articles', (req, res) =>
{
    Article.find({},(err, result) =>
    {
        if (err) {
            console.log(err);
            
        }
        else
        {
           res.send(result);
            
        }
    })
})

app.delete('/articles', (req, res) =>
    Article.deleteMany(err =>res.send(err ? err:"deleted successfully") )
);

// post.save(()=>mongoose.connection.close())

app.listen(3000, () =>console.log('Server has started successfully at 3000'));
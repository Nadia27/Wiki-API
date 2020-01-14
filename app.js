const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
  title: String,
  content: String
};

// Model
const Article = mongoose.model('Article', articleSchema);

// Get all articles from wikiDB
app.get('/articles', (req, res) => {
  Article.find({}, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

// Post new Article in wikiDB
app.post('/articles', (req, res) => {
  console.log(req.body.title);
  console.log(req.body.content);
  const newArticle = new Article ({
    title : req.body.title,
    content: req.body.content
  });
  newArticle.save((err) => {
    if (!err) {
      res.send('Successfully added a new article.');
    } else {
      res.send(err);
    }
  });
});

app.delete('/articles', (req, res) => {
  Article.deleteMany((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted all articles.');
    }
  })
})

app.listen(3000, (req, res) => {
  console.log('Server connected on port 3000');
});

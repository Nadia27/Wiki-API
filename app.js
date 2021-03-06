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


app.route('/articles')
  // Get all articles from wikiDB
  .get((req, res) => {
    Article.find({}, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  })
  // Post new Article in wikiDB
  // POST should only go to a collection of resources rather than a specific resource
  .post((req, res) => {
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
  })
  // Delete all articles in wikiDB
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully deleted all articles.');
      }
    });
  });

app.route('/articles/:articleTitle')
  .get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send('No articles matching that title was found.');
        }
    });
  })
  // PUT - Update by sending an entirely new entry to replace the current one
  .put((req, res) => {
    Article.updateOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite: true},
    (err) => {
      if (!err) {
        res.send('Successfully updated article');
      }
    });
  })
  // PATCH - Only update the piece of data that needs to be updated
  .patch((req, res) => {
    Article.updateOne({title: req.params.articleTitle}, {$set: req.body}, (err) => {
      if (!err) {
        res.send('Successfully updated article');
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteOne({title: req.params.articleTitle}, (err) => {
      if (!err) {
        res.send('Successfully deleted article');
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, (req, res) => {
  console.log('Server connected on port 3000');
});

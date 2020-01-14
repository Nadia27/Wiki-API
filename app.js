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

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(3000, (req, res) => {
  console.log('Server connected on port 3000');
});

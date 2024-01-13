// Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// connect to mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mean', { useMongoClient: true });

// define schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({
  name: String,
  comment: String,
  created_at: Date,
  updated_at: Date
});

// create model
var Comment = mongoose.model('Comment', commentSchema);

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define static files
app.use(express.static(path.join(__dirname + '/public/dist')));

// create new comment
app.post('/comments', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// get all comments
app.get('/comments', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// get one comment
app.get('/comments/:id', function(req, res) {
  Comment.findOne({ _id: req.params.id }, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// update one comment
app.put('/comments/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// delete one comment
app.delete('/comments/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// listen to port
app.listen(8000, function() {
  console.log('listening on port 8000');
});// suggestion 3


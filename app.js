var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var url = 'mongodb://localhost/test';

var mongo = require('mongodb');
var myClient = mongo.MongoClient;

app.use(express.static('./public'));

app.get('/user', function(req, res) {
  var user = {
    name: 'Ben',
    location: 'Irvine'
  }
  res.json(user);
})

app.get('/todos/:user', function(req, res) {
  if(req.params.user === 'Ben') {
    myClient.connect(url, function(err, db) {
      if(!err) {
        console.log('Connected to server');
        var tasks = db.collection('tasks');

        tasks.find({}).toArray(function(err, docs) {
          if(!err) {
            db.close();
            res.send(docs);
          }
        });
      }
    });
  }
  else {
    res.sendStatus(404);
  }
})

app.post('/todo', jsonParser, function(req, res) {
  var newTask = req.body.task;

  myClient.connect(url, function(err, db) {
    if(!err) {
      console.log('Connected to server');

      var tasks = db.collection('tasks');
      tasks.insert({task: newTask}, function(error, results) {
        db.close();
        res.send();
      });
    }
    else {
      res.sendStatus(500);
    }
  })
})

app.listen(1337);

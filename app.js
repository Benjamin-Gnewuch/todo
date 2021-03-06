var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var url = 'mongodb://localhost/test';

var mongo = require('mongodb');
var myClient = mongo.MongoClient;

app.use(express.static('./public'));

app.get('/user/:username', function(req, res) {

  myClient.connect(url, function(err, db) {
    if(!err) {
      console.log('Connected to server');

      var users = db.collection('todo.users');
      var user = req.params.username;

      users.find({user: user}).toArray(function(err, docs) {
        if(!err) {
          db.close();
          console.log(docs);
          res.send(docs);
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });

  // var user = {
  //   name: 'Ben',
  //   location: 'Irvine'
  // }
  // res.json(user);
});

app.post('/todo', jsonParser, function(req, res) {
  var newTask = req.body.task;
  var dueDate = req.body.date;
  myClient.connect(url, function(err, db) {
    if(!err) {
      console.log('Connected to server');

      var tasks = db.collection('todo.tasks');
      tasks.insert({task: newTask, date: dueDate}, function(error, results) {
        db.close();
        res.send();
      });
    }
    else {
      res.sendStatus(500);
    }
  })
})

app.get('/todos/:user', function(req, res) {
  if(req.params.user === 'Ben') {
    myClient.connect(url, function(err, db) {
      if(!err) {
        console.log('Connected to server');
        var tasks = db.collection('todo.tasks');

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

app.delete('/todoFinish/:task', function(req, res) {
  var finishedTask = req.params.task;

  myClient.connect(url, function(err, db) {
    if(!err) {
      console.log('Connected to server');

      var tasks = db.collection('todo.tasks');
      tasks.remove({task: finishedTask}, function(error, results) {
        db.close();
        res.send();
      });
    }
    else {
      res.sendStatus(500);
    }
  })
})

if(!require.main.loaded) {
  var server = app.listen(1337);
}

module.exports = app;

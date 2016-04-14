var express = require('express');
var app = express();

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
    var todos = ['Learn Javascript.', 'Go home.'];
    res.send(todos);
  } else {
    res.sendStatus(404);
  }
})

app.listen(1337);

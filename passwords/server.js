var express = require('express');
var app = express();

var secret = require('./secret.json');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/secret', function(req, res) {
  res.sendFile(__dirname + '/secret.html');
});

app.get('/secret2', function(req, res) {
  res.sendFile(__dirname + '/secret2.html');
});

app.get ('/login', function(req, res){
  if (req.query.password === secret.password) {
  	res.redirect('/secret')
  } else {
  	res.redirect('/')
  }
});
app.listen(3000);
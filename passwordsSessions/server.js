var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser'); //we need this because we are using post with a form.
var app = express();

var secret = require('./secret.json');


app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: secret.password,
  resave: false,
  saveUninitialized: true
}));

app.post('/session', function(req, res){
  if (req.body.password === secret.password) { //needs to be req.body when it is post.
  	req.session.valid_user = true
  	res.redirect('/secret')
  } else {
  	res.redirect('/')
  }//basically we are saying if the params = the password it should post this stuff and the session should start.
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/secret', function(req, res) {
  if (req.session.valid_user === true) { //we are in the session here so if the session is running, send them this file
  	//otherwise send them back to login.
  	res.sendFile(__dirname + '/secret.html');
  } else {
  	res.redirect('/')
  }
});

app.get('/secret2', function(req, res) {
  if (req.session.valid_user === true) { //we are in the session here so if the session is running, send them this file
  	//otherwise send them back to login.
  	res.sendFile(__dirname + '/secret2.html');
  } else {
  	res.redirect('/')
  }
});
app.listen(3000);
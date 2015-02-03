var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser'); //we need this because we are using post with a form.
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("authentication_exercises.db");
var app = express();
var secret = require('./secret.json');

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: "penguin",
  resave: false,
  saveUninitialized: true
}));

//this is to create a user and store it in the database.
app.post('/user', function(req, res) {
  
  user = {
    "username": req.body.username,
    "password": req.body.password
  }

  db.run("INSERT INTO users (username, password) VALUES (?,?)", user.username, user.password, function(err){
      if(err) { throw err; }
  });

  if (user.password !== req.body.confirm_password) { //if the passwords don't match = restart
    res.redirect('/')
  }
  else { //if passwords match = start the session.
        req.session.valid_user = true
        res.redirect('/secret')
      }
});

//this part is the log in AKA checking if the user exists.
app.post('/session', function(req, res){ //basically we are saying that the values are equal to whatever we put in the form.
  
    db.get("SELECT * FROM users WHERE username=? AND password=?", req.body.username, req.body.password, function(err,row){
      if(err) { throw err; }
      if(row) { //row = our return. So if we get information back start the session.
        req.session.valid_user = true
        res.redirect('/secret')
      } 
      else {
        res.redirect('/')
      }
    })
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
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(3000);
app.get('/', function(req, res) {  res.render('index');});
app.get('/index', function(req, res) {  res.render('index');});
app.get('/about', function(req, res) {  res.render('about');});
app.get('/editProfile', function(req, res) {  res.render('editProfile');});
app.get('/faceRecognition', function(req, res) {  res.render('faceRecognition');});
app.get('/getstarted.html', function(req, res) {  res.render('getstarted.html');});

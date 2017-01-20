var express = require('express');
var app = express();                              //creating app with express
var bodyParser = require('body-parser');          //pull data from POST requests
var mongoose = require('mongoose');               //connect to MongoDB
var methodOverride = require('method-override');  //simulate DELETE and PUT
var path = require('path');                       //creating app with express
var fs = require('fs');                           //for file read and write
var urlencodedParser = bodyParser.urlencoded({ extended: true });


//static files - middleware
app.use('/', express.static(__dirname));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(methodOverride());

var json_resume = require("https://github.com/karthikaa127/angularjs_portfolio/blob/master/data/data.json");  //__dirname+"/data/resume.json"

//routing based on service request
app.get('/skills', function (req,res) {
  var skillset = [];
  json_resume.skills.forEach(function(element) {
    for (var property in element.keywords) {
      if (element.keywords.hasOwnProperty(property)) {
        var obj = {};
        obj["skill"] = property;
        obj["percent"] = element.keywords[property];
        skillset.push(obj);
      }
    }

  });
  res.send(skillset);
});
app.post('/todo', urlencodedParser, function (req,res) {
  if(err) res.send(err);
  res.json();
});
app.delete('/todo/:item', function (req,res) {
  if(err) res.send(err);
  res.json();
});

app.get('*', function (req,res) {
  res.sendFile(__dirname+'/index.html');
})

//listen to port
app.listen(3000);
console.log('listening to port 3000');

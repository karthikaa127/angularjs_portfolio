var express = require('express');
var app = express();                              //creating app with express
var bodyParser = require('body-parser');          //pull data from POST requests
var methodOverride = require('method-override');  //simulate DELETE and PUT
var path = require('path');                       //creating app with express
var fs = require('fs');                           //for file read and write
var urlencodedParser = bodyParser.urlencoded({ extended: true });


//static files - middleware
app.use('/', express.static(__dirname));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(methodOverride());

var json_resume = require(__dirname+"/data/resume.json");
var contact_data = require(__dirname+"/data/contact.json");

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

app.get('/profile', function (req,res) {
  res.send(json_resume.basics);
});

app.post('/contacts', urlencodedParser, function (req,res) {
  contact_data.data.push(req.body);
  fs.writeFile(__dirname+'/data/contact.json', JSON.stringify(contact_data), null, "\t");
  res.json(req.body);
});

app.get('*', function (req,res) {
  res.sendFile(__dirname+'/index.html');
})

//listen to port
app.listen(3000);
console.log('listening to port 3000');

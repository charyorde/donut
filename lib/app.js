var app = require(__dirname + '/../server').app
var express = require(__dirname + '/../server').express
var Donut = require('./lib/donut')
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var P = require('bluebird');

var jsonParser = bodyParser.json({ type: 'application/json' } );

// Router middleware
// Protective middleware to validate access token
app.use(function(req, res, next) {
    
})

/**
 * Service to bake a new Donut
 * A new Donut is baked when the start button is clicked.
 */ 
app.post('/bake', jsonParser, function(req, res) {
  console.log('"Log in time": %d, "UA": %s', new Date(), req.ua);
  if (!req.body) return res.sendStatus(400);
  if(!req.accepts('application/json')) {
    return res.sendStatus(406);
  }

  // invoke Donut.bake
  // Initiate a new bake based on the stored configuration
  // emit an event to bake a new Donut
  var Roll = new Donut(ingredients)
    
  return res.status(200).send('OK')
  
})

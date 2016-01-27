var app = require(__dirname + '/../server').app
var express = require(__dirname + '/../server').express
var Donut = require('./donut')
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var P = require('bluebird');
var mustache = require('mustache')
var amqp = require('rabbit.js').createContext('amqp://test:Wordpass15@192.168.10.29:5672')

var jsonParser = bodyParser.json({ type: 'application/json' } );

app.set('views', __dirname + '/../views')
app.set('view engine', 'mustache');
app.use('/static', express.static('static'));
app.use('/static', express.static('public'));
app.use('/static', express.static('files'));

// Router middleware
// Protective middleware to validate access token
app.use(function(req, res, next) {
  return next()   
})

app.get('/ping', function(req, res) {
  console.log('Donut got cooked!')
  return res.status(200).send('Donut got cooked!')
})

/**
 * Service to bake a new Donut
 * A new Donut is baked when the start button is clicked.
 * @param iterationVersion
 */ 
app.post('/bake', jsonParser, function(req, res) {
  console.log('"Baking start time": %d, "UA": %s', new Date(), req.ua);
  if (!req.body) return res.sendStatus(400);
  if(!req.accepts('application/json')) {
    return res.sendStatus(406);
  }

  var iterationVersion = req.body.iterationVersion

  // invoke Donut.bake
  // Initiate a new bake based on the stored configuration
  // emit an event to bake a new Donut
  var Roll = new Donut({version: iterationVersion})
    
  return res.status(200).send('OK')
  
})

module.exports = router;

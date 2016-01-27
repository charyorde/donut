var util = require('util')
  , events = require('events')
  , async = require('async')
  , Promise = require('bluebird')
  , _ = require('underscore')
  , ingredients = require(__dirname + '/../ingredients/specimen').ingredients
  , httpconn = require('./http')
var request = Promise.promisifyAll(require("request"));

/**
 * Only selected donut ingredients
 * would be cooked
 */ 
function Donut(options) {

  var self = this
  var tasks = {}
  var obj = {}
  // load ingredients based on iteration version
  this.version = options.version
  //this.ingredients = options.ingredients
  this.ingredients = ingredients[this.version][0]
      
  events.EventEmitter.call(this);
  // map each item in ingredients to a series of functions
  _.each(this.ingredients, function(value, key) {
    //obj[item] = heatUp
    console.log('known ingredient', value)
    if (value['enabled']) {
      obj[key] = function(fn) {
        self.bake(value, function(err, res) {
          if(err) {
            fn(err)
          }
          else {
            fn(null, res)
          }
        })
      }
    }
  })
  console.log("obj", obj)
  _.extend(tasks, obj)

  async.series(tasks,
    function(err, result) {
      if (err) {
        return err
      }
      else {
        return result
      }
    }
  )
}

/**
 * Bake the Donut
 */ 
Donut.prototype.bake = function(params, fn) {
  var method = params['method']

  switch(method) {
    case 'GET':
      this.bakeGet(params, function(err, res) {
        if (err) {
          return fn(err)
        }
        else {
          return fn(null, res)
        }
      })
    
    case 'POST':
      this.bakePost(params, function(err, res) {
        if(err) {
          return fn(err)
        }
        else {
          return fn(null, res)
        }
      })
  }
}

Donut.prototype.bakePost = function(params, fn) {
  console.log("baking POST")
  var body = params['requestParams']
    , method = params['method']
    , token = params['bearerToken']
    , expected = params['expectedResponse']
    , feature = params['feature']
  
  var options = httpconn.requestOptions({
    resource: params['serviceName'],
    resourcePath: params['path'],
    method: method,
    headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' + token },
    body: body,
    json: true
  });
  
  console.log('options', options)
  httpconn.PromisePostWithRequest(options)
  /*request.postAsync({
    uri: 'http://localhost:3000/v1/authenticate',
    method: 'POST',
    body: body,
    json: true,
    headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' + token },
  })*/
  .then(function(response) {
    if (response.statusCode == 200) {
      //console.log("login body", response.body)
      var respKeys = _.keys(response.body)
      // compare result and fire success event
      function isFound(item, fn) {
        if(_.contains(expected, item)) {
          fn(true)
        } else fn(false)
      }
      async.some(respKeys, isFound, function(result) {
        if (result) {
          console.log("%s passed", feature)
          // tell the world
          // Donut.emit('test_pass', feature + ' passed')
          return fn(null, result)
        }
        else return fn(result)
      })
    }
    else {
      // fire failure event
      console.log('Auth response', response.statusCode)
      return fn(helpers.newErr(response.body, response.statusCode))
    }
  })
  .catch(function(e) {
    console.log('Request failed', e)
    return fn(e)
  })
}

Donut.prototype.bakeGet = function(params, fn) {
  var body = params['requestParams']
    , method = params['method']
    , token = params['bearerToken']
  
  var options = httpconn.requestOptions({
    resource: params['serviceName'],
    resourcePath: params['resourcePath'],
    method: method,
    headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' + token}
  });
  
  httpconn.PromiseGetWithRequest(options, body)
  .spread(function(response, body) {
  
  })
}

/**
 * Validate expected obj keys with actual.
 */ 
Donut.prototype.validateKeys = function(obj) {

}

/**
 * Heats up using the supplied ingredient
 */ 
Donut.prototype.heatUp = function(fn, params) {

}

module.exports = Donut

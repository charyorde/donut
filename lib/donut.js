var util = require('util')
  , events = require('events')
  , async = require('async')
  , Promise = require('bluebird')
  , _ = require('underscore')

/**
 * Only selected donut ingredients
 * would be cooked
 */ 
function Donut(options) {

  var self = this
  var tasks = {}
  var obj = {}
  this.ingredients = options.ingredients
      
  events.EventEmitter.call(this);
  // map each item in ingredients to a series of functions
  _.each(this.ingredients, function(value, key) {
    //obj[item] = heatUp
    obj[key] = function(fn) {
      self.bake(value, function(err, res) {
        if(err) {
        
        }
        else {
          fn(null, res)
        }
      })
    }
  })
  _.extend(tasks, obj)

  async.series(tasks,
    function(err, result) {
      return fn(err, result)
    }
  )
}

/**
 * Bake the Donut
 */ 
this.prototype.bake = function(params, fn) {
}

/**
 * Heats up using the supplied ingredient
 */ 
this.prototype.heatUp = function(fn, params) {

}

module.exports = Donut

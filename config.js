var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv()
var rabbitUri = null
var redisups = null

if(!appEnv.isLocal) {
  // rabbit ups
  rabbitService = appEnv.getService('rabbitmq')
  rabbitCreds = rabbitService.credentials
  var rabbitObj = {
    protocol: 'amqp',
    slashes: true,
    auth: [rabbitCreds.username, rabbitCreds.password].join(':'),
    hostname: rabbitCreds.host,
    port: rabbitCreds.port
  }
  rabbitUri = url.format(rabbitObj)

  // redis ups
  redisups = appEnv.getService('redis')
  console.log("redisups", redisups)
}

var vcap_services;
var vcap_application
if(process.env.VCAP_SERVICES) {
  vcap_services = JSON.parse(process.env.VCAP_SERVICES)
  console.log(vcap_services)
}
if(process.env_VCAP_APPLICATION) {
  vcap_application = JSON.parse(process.env.VCAP_APPLICATION)
  console.log(vcap_application)
}

var config = {
  local: {
    appname: 'donut',
    mode: 'local',
    port: process.env.VCAP_APP_PORT || 3006,
    protocol: 'http',
    uri: 'http://localhost:3006',
    token_secret: 'useraccountservice',
    uas: {
      host: 'uas.apps.yookosapps.com',
      path: '/v1',
      //port: 3000,
      uri: 'http://localhost:3000/'
    },
    socialgraph: {
      host: 'socialgraph.apps.yookore.net/api/v1',
      port: 80
    },
    blogpost: {
      host: 'blogpost.apps.yookore.net',
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: null,
      testhost: '192.168.10.98',
      cluster: []
    },
    rabbit: {
      uri: 'amqp://localhost',
      user: 'guest',
      pass: 'guest',
      testhosturi: 'amqp://test:Wordpass15@192.168.10.29:5672'
    },
    db: {
      postgres: {
        uri: 'postgres://root:P@ssw0rd15@localhost:5432/uaa',
        host: 'localhost',
        name: 'uaa',
        port: 5432
      }
    }
  }
}
module.exports = function(mode) {
  var env = !appEnv.isLocal ? appEnv.app.space_name : 'local'
  return config[mode || env || 'local'] || config.local;
};
module.exports.cfenv = appEnv

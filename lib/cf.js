var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv()

function cf() {
  
  this.isLocal = appEnv.isLocal
  this.env = !this.isLocal ? appEnv.app.space_name : 'local'
}

cf.create = function() {
  return new cf()
};

cf.prototype.cassandra = function() {
  return !this.isLocal ? appEnv.services["ih-cassandra"][0].credentials.address : undefined
};

cf.prototype.redis = function() {
  return !this.isLocal ? appEnv.getService('redis') : undefined
};

cf.prototype.rabbit = function() {
  if (!this.isLocal) {
    rabbitService = appEnv.getService('rabbitmq')
    rabbitCreds = rabbitService.credentials
    var rabbitObj = {
      protocol: 'amqp',
      slashes: true,
      auth: [rabbitCreds.username, rabbitCreds.password].join(':'),
      hostname: rabbitCreds.host,
      port: rabbitCreds.port
    }
    
    return url.format(rabbitObj)
  }
};

module.exports = cf

var cfConfig = require('./lib/cf')
  , cf = cfConfig.create()

var redis = cf.redis.call(cf, null)
  , rabbit = cf.rabbit.call(cf, null)
  , cassandra = cf.cassandra.call(cf, null)

env = cf.env
appname = cf.appname
spaceName = cf.mode
appUri = cf.appUri

var config = {
  local: {
    appname: 'yookore-proxy',
    mode: 'local',
    port: 3002,
    protocol: 'http',
    uri: 'http://localhost:3002',
    policyConfig: './strong-gateway/server/policy-config-dev.json',
    auth: {
      uri: 'http://localhost:3000/auth/'
    },
    content: {
      uri: 'http://192.168.10.123:8000/api/'
    },
    activities: {
      uri: 'http://192.168.10.15/stream/'
    },
    audio: {
      uri: 'http://192.168.10.125:8080/audio/'
    },
    audiodata: {
      uri: 'http://192.168.10.125/data/'
    },
    statics: {
      uri: 'http://localhost:3005/statics/'
    },
    media: {
      uri: 'http://192.168.10.123:8000/media/'
    },
    search: {
      uri: 'http://192.168.10.20:9200/info/'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
    }
  },
  dev: {
    appname: appname,
    mode: spaceName,
    port: process.env.VCAP_APP_PORT,
    protocol: 'http',
    uri: appUri,
    policyConfig: './strong-gateway/server/policy-config-dev.json',
    auth: {
      uri: 'http://192.168.10.144:3000/auth/'
    },
    content: {
      uri: 'http://192.168.10.123:8000/api/'
    },
    activities: {
      uri: 'http://192.168.10.15/stream/'
    },
    audio: {
      uri: 'http://192.168.10.125:8080/audio/'
    },
    audiodata: {
      uri: 'http://192.168.10.125/data/'
    },
    statics: {
      uri: 'http://192.168.10.144:3005/statics/'
    },
    media: {
      uri: 'http://192.168.10.123:8000/media/'
    },
    search: {
      uri: 'http://192.168.10.20:9200/info/'
    },
    redis: {
      host: redis ? redis.credentials.host : undefined,
      port: redis ? redis.credentials.port : undefined,
      cluster: [{
        port: 6379,
        host: '192.168.10.98'
        }, {
          port: 6379,
          host: '192.168.10.4'
        }, {
          port: 6379,
          host: '192.168.10.5'
      }]
    }
  },
  production: {
    appname: appname,
    mode: spaceName,
    port: process.env.VCAP_APP_PORT,
    protocol: 'https',
    uri: appUri,
    policyConfig: './strong-gateway/server/policy-config.json',
    auth: {
      uri: 'http://192.168.10.144:3000/auth/'
    },
    content: {
      uri: 'http://192.168.10.123:8000/api/'
    },
    activities: {
      uri: 'http://192.168.10.15/stream/'
    },
    audio: {
      uri: 'http://192.168.10.125:8080/audio/'
    },
    audiodata: {
      uri: 'http://192.168.10.125/data/'
    },
    statics: {
      uri: 'http://192.168.10.144:3005/statics/'
    },
    media: {
      uri: 'http://192.168.10.123:8000/media/'
    },
    search: {
      uri: 'http://192.168.10.20:9200/info/'
    },
    redis: {
      host: 'redis.yookos.com',
      port: 6379
    },
  }
};
module.exports = function(mode) {
  /*var env;
  if(process.env.YOOKORE_PROXY_ENV_NAME) {
    env = process.env.YOOKORE_PROXY_ENV_NAME
  }*/
  return config[mode || env || 'local'] || config.local;
};

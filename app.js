var config = require('./config')()
var app = require('./server').app
var cors = require('cors')
  , _ = require('lodash')
//var proxy = require('./index')
//var proxyOptions = require('./config.json');
//var rateLimit = require('./strong-gateway/server/middleware/rate-limiting/metrics-limiter')
var routeToMiddlewareMatcher = require('./strong-gateway/server/policy-middleware')

var policyConfig = require(config.policyConfig);

app.use(cors());

// register policy with middleware
var middleware = routeToMiddlewareMatcher(policyConfig);

// Middleware to validate access token
var authParams = middleware['auth']['uas']
  , auth = []
authParams.forEach(function(param) {
  auth.push(param.params)
})
app.use(require('./middleware/auth')(auth))

// Proxy middleware
//console.dir(middleware, {color: true, depth: null})
var proxyParams = middleware['proxies']['./middleware/proxy']
  , rules = []
proxyParams.forEach(function(param) {
  rules.push(param.params.rules)
})
//console.log(_.flatten(rules))
app.use(require('./strong-gateway/server/middleware/proxy/index')({"rules": _.flatten(rules)}))

// Rate limiting middleware
var rateLimitingParams = middleware['routes:after']['./middleware/rate-limiting-policy']
  , rateLimit = []
rateLimitingParams.forEach(function(param) {
  rateLimit.push(param.params)
})
app.use(require('./strong-gateway/server/middleware/rate-limiting/metrics-limiter')(rateLimit))

app.get('/', function(req, res) {
  res.send("Http Proxy running successfully")
})

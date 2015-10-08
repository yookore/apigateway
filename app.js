var config = require('./config')()
var app = require('./server').app
var cors = require('cors');
var proxy = require('./index')
var proxyOptions = require('./config.json');
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
/*app.use(function(req, res, next) {
  console.log('Middleware: Validating access token')
  // Allow some paths without protecttion
  var path = req.path
  console.log(auth.isProtectedResource(path))
  // Validate access token in req
  // If req doesn't contain an access_token, and it's not a trusted client reject it. 
  if (!req.headers.authorization && !auth.isProtectedResource(path)) {
    next()
  }
  else if (!req.headers.authorization && auth.isProtectedResource(path)) {
    console.log('Unauthorized access. Rejecting request from ', req.ip)
    return res.sendStatus(401)
  }
})*/

// Proxy middleware
//console.dir(middleware, {color: true, depth: null})
var proxyParams = middleware['proxies']['./middleware/proxy']
  , rules = []
proxyParams.forEach(function(param) {
  rules.push(param.params)
})
app.use(require('./strong-gateway/server/middleware/proxy/index')(rules))

// Rate limiting middleware
var rateLimitingParams = middleware['routes:after']['./middleware/rate-limiting-policy']
  , rateLimit = []
rateLimitingParams.forEach(function(param) {
  rateLimit.push(param.params)
})
app.use(require('./strong-gateway/server/middleware/rate-limiting/metrics-limiter')(rateLimit))

/*app.use(proxy({
  "rules": [
    "^/auth/(.*)$ " + config.auth.uri + "$1 [P]",
    "^/statics/(.*)$ " + config.statics.uri + "$1 [P]",
    "^/api/(.*)$ " + config.content.uri + "$1 [P]",
    "^/stream/(.*)$ " + config.activities.uri + "$1 [P]",
    "^/audio/(.*)$ " + config.audio.uri + "$1 [P]",
    "^/media/(.*)$ " + config.media.uri + "$1 [P]",
    "^/info/(.*)$ " + config.search.uri + "$1 [P]",
    "^/data/(.*)$ " + config.audiodata.uri + "$1 [P]"
  ]
}));*/

app.get('/', function(req, res) {
  res.send("Http Proxy running successfully")
})

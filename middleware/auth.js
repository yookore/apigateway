module.exports = function(options) {
  
  options = options || {};
  allowed_paths = null
  options.forEach(function(option) {
    allowed_paths = option.allowed_paths
  })

  return function Auth(req, res, next) {
    var path = req.path

    if (!req.headers.authorization && !isProtectedResource(path, allowed_paths)) {
      next()
    }
    else if (!req.headers.authorization && isProtectedResource(path, allowed_paths)) {
      console.log('Unauthorized access. Rejecting request from ', req.ip)
      return res.sendStatus(401)
    }
  }
};

function isProtectedResource(path, allowed_paths) {
  var unprotected = allowed_paths
  return unprotected.indexOf(path) == -1
}

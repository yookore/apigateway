var config = require('./config')()
var app = require('./server').app
var cors = require('cors');
var proxy = require('./index')
var proxyOptions = require('./config.json');

app.use(cors());

//app.use(proxy(proxyOptions));
app.use(proxy({
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
}));

app.get('/', function(req, res) {
  res.send("Http Proxy running successfully")
})

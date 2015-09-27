var Router = require("Router");
var UADetector = require('UADetector');

var appRouter = new Router();



appRouter.get("/hello", function(req,res) {
  res.setBody({message: "Hello World!"});
});

var helloService = spring.getBean("helloService");
appRouter.get("/hello-spring", function(req,res) {
  res.setBody(helloService.getHelloMessage());
});

appRouter.get("/uadetector",function(req,res) {
  res.setBody({
    your_useragent_is : req.headers['user-agent'],
    UADetector_says_this : UADetector(req),
    username : "jomski2009"
  });
});


var echoModule = require('/modules/echoModule');
appRouter.get("/echo/:message", function(req,res, message) {
  res.setBody(echoModule.echo(message));
});

appRouter.all('/*catchall', function(req,res) {
  res.setBody({
    links :[
    {title: 'Hello world', href: req.baseUrl+'/hello'},
    {title: 'Hello world, using a Spring Bean to return the hello message ', href: req.baseUrl+'/hello-spring'},
    {title: 'Echos the message back. Also an example of module definition and loading.', href: req.baseUrl+'/echo/{message}', templated: true},
    {title: 'Echos the message "hello"', href: req.baseUrl+'/echo/hello'}
  ]});
});

module.exports = appRouter;

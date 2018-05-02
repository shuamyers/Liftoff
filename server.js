var express = require('express');
var cors = require('cors');
var app = express();

var corsOptions = {
	origin: /http:\/\/127.0.0.1:\d+/,
	credentials: true
};

app.use(cors(corsOptions))



var http = require('http').Server(app);
var bodyParser = require('body-parser')
const clientSessions = require('client-sessions');

var UserService = require('./services/UserService')
var SocketService = require('./services/SocketService')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static('front'));


app.use(clientSessions({
  cookieName: 'session',
  secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
  
}));


global.isLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.end('Not allowed');
  } else {
    next();
  }
}


SocketService.init(http);

const addUserRoutes = require('./routes/UserRoutes.js')
addUserRoutes(app)
const addDogRoutes = require('./routes/DogRoutes.js')
addDogRoutes(app)

http.listen(3000, () => {
  console.log('listening on *:3000');
});


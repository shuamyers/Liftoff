const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
var parseurl = require('parseurl');
const clientSessions = require('client-sessions');


const corsOptions = {
  origin: /http:\/\/localhost:\d+/,
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(clientSessions({
  cookieName: 'session',
  secret: 'th1is3DK5fa2be6u5asn',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

global.isLoggedIn = (req, res, next) => {
  console.log(req.session)
  if (!req.session || !req.session.user) {
    res.end('Not allowed');
  } else {
    next();
  }
}

const addUserRoutes = require('./routes/UserRoutes.js')
addUserRoutes(app)
const addProjRoutes = require('./routes/ProjRoutes.js')
addProjRoutes(app)
const addPledgeRoutes = require('./routes/PledgeRoutes.js')
addPledgeRoutes(app)
const addCommentRoutes = require('./routes/CommentRoutes.js')
addCommentRoutes(app)

http.listen(3000, () => {
  console.log('listening on *:3000');
});
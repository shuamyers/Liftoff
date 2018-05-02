var UserService = require('../services/UserService')

module.exports = app => {
  app.post('/login', (req, res) => {

    const user = req.body;
    UserService.checkLogin(user).then(userFromDB => {
      console.log('userFromDB', userFromDB)
      if (userFromDB) {
        console.log('Login!', req.session);
        delete userFromDB.password;
        req.session.user = userFromDB;

        res.json({ token: 'Beareloginr: puk115th@b@5t', user: userFromDB });
      } else {
        console.log('Login NOT Successful');
        req.session.user = null;
        res.status(403).send({ error: 'Login failed!' });
      }
    });
  });

  app.post('/register', function (req, res) {
    var user = req.body;
    UserService.addUser(user)
      .then(addedUser => res.json(addedUser))
      .catch(err => res.status(403).send({ error: `Register failed, ERROR:${err}` }));
  });

  app.post('/logout', function (req, res) {
    req.session.reset();
    res.end('Loggedout');
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    res.end(`Profile of ${req.session.user.name}`);
  });



};



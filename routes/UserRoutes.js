const UserService = require('../services/UserService');

module.exports = app => {

  app.post('/login', (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    }
    const user = req.body;
    UserService.checkLogin(user).then(userFromDB => {
      if (userFromDB) {
        delete userFromDB.pass;
        req.session.user = userFromDB;
        res.json(userFromDB);
      } else {
        req.session.user = null;
      }
    }).catch(err => res.status(403).send({ error: `Login failed, ERROR:${err}` }));
  });

  app.post('/register', (req, res) => {
    const user = req.body;
    UserService.addUser(user)
      .then(addedUser => {
        delete addedUser.pass;
        req.session.user = addedUser;
        res.json(addedUser);
      })
      .catch(err => res.status(403).send({ error: `Register failed, ERROR:${err}` }));
  });
  app.put('/updateWallet', (req, res) => {
    var user = req.body;
    UserService.updateWallet(user)
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(403).send({ error: `Register failed, ERROR:${err}` }));
  });

  app.put('/favorite', (req, res) => {
    var data = req.body;
    UserService.addFavorite(data)
      .then(updatedUser =>{
        console.log('updatedUser')
        res.json(updatedUser)
        
      } )
      .catch(err => res.status(403).send({ error: `Register failed, ERROR:${err}` }));
  });

  app.post('/logout', (req, res) => {
    req.session.reset();
    res.end('Loggedout');
  });

  app.get('/user/:id', (req, res) => {
    const userId = req.params.userId;
    UserService.getById(userId).then(userFromDb =>res.json(userFromDb))
    .catch(err => res.status(500).send(err.message));
  });

  // app.get('/profile', isLoggedIn, (req, res) => {
  //   res.end(`Profile of ${req.session.user.name}`);
  // });

};
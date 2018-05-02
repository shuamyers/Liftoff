var DogService = require('../services/DogService')

module.exports = app => {
  app.get('/dog', isLoggedIn, (req, res) => {
    console.log('DOG: ', req.session);
    DogService.query(req.session.user._id).then(dogs => {
      console.log('DOGS: ', dogs);
      res.json(dogs)
    })

  });
  app.post('/dog', isLoggedIn, (req, res) => {
    const dog = req.body;
    dog.userId = req.session.user._id; 
    DogService.add(dog).then(addedDog => {
      res.json(addedDog)
    })

  });

}
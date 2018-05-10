const ProjService = require("../services/ProjService");
const PROJ_URL = "/proj";
const url = require('url')

module.exports = app => {

  //ADD
  app.post(PROJ_URL, (req, res) => {
    const proj = req.body;
    // proj.userId = req.session.user._id;
    ProjService.add(proj).then(addedProj => {
      res.json(addedProj);
    });
  });

  // Get By ID
  app.get(`${PROJ_URL}/:projId`, (req, res) => {
    const projId = req.params.projId;
    ProjService.getById(projId)
      .then(proj => res.json(proj))
      .catch(err => res.status(500).send(err.message));
  });

  // Remove
  app.delete(`${PROJ_URL}/:projId`, (req, res) => {
    const projId = req.params.projId;
    if (!projId) res.status(500).send("PROJ-ID to delete.");
    ProjService.remove(projId)
      .then(_ => res.send(`Proj ID: ${projId} has been deleted successfully.`))
      .catch(err => res.status(500).send(`Proj delete failed, ERROR: ${err}`));
  });

  // Update
  app.put(PROJ_URL, (req, res) => {
    const proj = req.body;
    if (!proj._id) res.status(500).send("You have to bring me Proj Object.");
    ProjService.update(proj)
      .then(_ => res.json())
      .catch(err => res.status(500).send(`proj delete failed, ERROR: ${err}`));
  });

  app.put(`${PROJ_URL}/updateFundsRaised`, (req, res) => {
    var proj = req.body;
    console.log('got in funds raised',proj)
    ProjService.updateFundsRaised(proj)
      .then(updatedProj => res.json(updatedProj))
      .catch(err => res.status(403).send({ error: `Register failed, ERROR:${err}` }));
  });

    // Query
    app.get(PROJ_URL, (req, res) => {
      ProjService.query(req.query)
        .then(projs => {
          
          res.json(projs);
        })
        .catch(err => res.status(500).send(err.message));
    });
};
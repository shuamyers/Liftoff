const ProjService = require("../services/ProjService");
const PROJ_URL = "/proj";

module.exports = app => {
  //Query
  app.get(PROJ_URL, (req, res) => {
    console.log("PROJ: ", req);

    // ProjService.query(req.session.user._id).then(projs => {
    ProjService.query(req.query).then(projs => {
      console.log("PROJS: ", projs);
      res.json(projs);
    });
  });

  //ADD
  app.post(PROJ_URL, (req, res) => {
    const proj = req.body;
    console.log("newProj", proj);
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
    console.log('proj',proj)
    if (!proj._id) res.status(500).send("You have to bring me Proj Object.");
    ProjService.update(proj)
      .then(_ => res.json())
      .catch(err => res.status(500).send(`proj delete failed, ERROR: ${err}`));
  });
};

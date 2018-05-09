const PledgeService = require("../services/PledgeService");
const PLEDGE_URL = "/pledge";
const url = require('url')

module.exports = app => {

  //ADD
  app.post(PLEDGE_URL, (req, res) => {
      const pledge = req.body;
    console.log('db ruting ', pledge)
    // pledge.userId = req.session.user._id;
    PledgeService.add(pledge).then(addedPledge => {
      res.json(addedPledge);
    });
  });

  // Get By ID
  app.get(`${PLEDGE_URL}/user/:userId`, (req, res) => {
    const userId = req.params.userId;
    console.log('userId',userId)
    PledgeService.getByUserId(userId)
      .then(pledge => res.json(pledge))
      .catch(err => res.status(500).send(err.message));
  });

  app.get(`${PLEDGE_URL}/proj/:projId`, (req, res) => {
    const projId = req.params.projId;
    PledgeService.getByProjId(projId)
      .then(pledge => res.json(pledge))
      .catch(err => res.status(500).send(err.message));
  });

  // Remove
  app.delete(`${PLEDGE_URL}/:pledgeId`, (req, res) => {
    const pledgeId = req.params.pledgeId;
    if (!pledgeId) res.status(500).send("PLEDGE-ID to delete.");
    PledgeService.remove(pledgeId)
      .then(_ => res.send(`Pledge ID: ${pledgeId} has been deleted successfully.`))
      .catch(err => res.status(500).send(`Pledge delete failed, ERROR: ${err}`));
  });

  // Update
//   app.put(PLEDGE_URL, (req, res) => {
//     const pledge = req.body;
//     console.log('pledge', pledge)
//     if (!pledge._id) res.status(500).send("You have to bring me Pledge Object.");
//     PledgeService.update(pledge)
//       .then(_ => res.json())
//       .catch(err => res.status(500).send(`pledge delete failed, ERROR: ${err}`));
//   });

    // Query
    app.get(PLEDGE_URL, (req, res) => {
      PledgeService.query(req.query)
        .then(pledges => {
          res.json(pledges);
        })
        .catch(err => res.status(500).send(err.message));
    });
};

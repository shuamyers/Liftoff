const CommentService = require("../services/CommentService");
const COMMENT_URL = "/comment";
const url = require('url')

module.exports = app => {

  //ADD
  app.post(COMMENT_URL, (req, res) => {
      const comment = req.body;
    console.log('db ruting ', comment)
    // comment.userId = req.session.user._id;
    CommentService.add(comment).then(addedComment => {
      res.json(addedComment);
    });
  });

  // Get By ID
  app.get(`${COMMENT_URL}/user/:userId`, (req, res) => {
    const userId = req.params.userId;
    console.log('userId',userId)
    CommentService.getByUserId(userId)
      .then(comment => res.json(comment))
      .catch(err => res.status(500).send(err.message));
  });

  app.get(`${COMMENT_URL}/proj/:projId`, (req, res) => {
    const projId = req.params.projId;
    CommentService.getByProjId(projId)
      .then(comment => res.json(comment))
      .catch(err => res.status(500).send(err.message));
  });

  // Remove
  app.delete(`${COMMENT_URL}/:commentId`, (req, res) => {
    const commentId = req.params.commentId;
    if (!commentId) res.status(500).send("COMMENT-ID to delete.");
    CommentService.remove(commentId)
      .then(_ => res.send(`Comment ID: ${commentId} has been deleted successfully.`))
      .catch(err => res.status(500).send(`Comment delete failed, ERROR: ${err}`));
  });

  // Update
//   app.put(COMMENT_URL, (req, res) => {
//     const comment = req.body;
//     console.log('comment', comment)
//     if (!comment._id) res.status(500).send("You have to bring me Comment Object.");
//     CommentService.update(comment)
//       .then(_ => res.json())
//       .catch(err => res.status(500).send(`comment delete failed, ERROR: ${err}`));
//   });

    // Query
    app.get(COMMENT_URL, (req, res) => {
      CommentService.query(req.query)
        .then(comments => {
          res.json(comments);
        })
        .catch(err => res.status(500).send(err.message));
    });
};

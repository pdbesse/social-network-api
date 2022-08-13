const router = require('express').Router();

// /api/thoughts
// GET all thoughts, GET thought by _id, POST new thought (push thought _id to user's thoughts array field), PUT by _id, DELETE by _id
// /api/thoughts/:thoughtId/reactions
// POST new reaction stored in a thought's reactions array field, DELETE by reaction's reactionId value


module.exports = router;
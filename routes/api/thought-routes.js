const router = require('express').Router();
const {
    getThought,
    getOneThought,
    createThought,
    editThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
.get(getThought)
.post(createThought);

router.route('/:thoughtId')
.get(getOneThought)
.put(editThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
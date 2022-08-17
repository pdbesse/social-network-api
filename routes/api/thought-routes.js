const router = require('express').Router();
const {
    getThought,
    getOneThought,
    createThought,
    editThought,
    deleteThought
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
.get(getThought)
.post(createThought);

router.route('/:thoughtId')
.get(getOneThought)
.put(editThought)
.delete(deleteThought);


module.exports = router;
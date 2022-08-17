const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId')
.get(getOneUser)
.put(editUser)
.delete(deleteUser);


module.exports = router;
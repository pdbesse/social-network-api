const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId')
.get(getOneUser)
.put(editUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);


module.exports = router;
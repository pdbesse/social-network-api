const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');

// /api/users
// GET all, GET by _ID (included thoughts and friends), POST new, PUT by _id, DELETE by _id (remove thoughts as bonus)
// /api/users/:userId/friends/:friendId
// POST new friend to user's friend list, DELETE to remove friend from friend's list

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET user by id
router.get('/:userId', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.userId, {
            include: [
                {
                    model: Thought,
                }
            ]
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id.' })
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// PUT user by id
router.put('/:userId', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                userId: req.params.userId,
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'No user found with this id.' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                userId: req.params.userId,
            },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// // POST new friend to user's friend list
// router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//         const userData = await User.create({
//             username: req.body.username,
//             password: req.body.password,
//         });
//         res.status(200).json(userData);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// // DELETE friend from user's friend list
// router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//         const userData = await User.destroy({
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if (!userData) {
//             res.status(404).json({ message: 'No user found with that id!' });
//             return;
//         }

//         res.status(200).json(userData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;
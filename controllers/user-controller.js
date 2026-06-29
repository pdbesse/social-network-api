const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getOneUser(req, res) {
    User.findById(req.params.userId)
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json(err));
  },

  editUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, {
      runValidators: true,
      new: true,
    })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json({ message: 'User deleted successfully' })
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json({ message: 'Friend added successfully', user })
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : res.json({ message: 'Friend deleted successfully', user })
      )
      .catch((err) => res.status(500).json(err));
  },
};
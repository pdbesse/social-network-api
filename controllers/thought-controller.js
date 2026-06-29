const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getOneThought(req, res) {
    Thought.findById(req.params.thoughtId)
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    User.findById(req.body.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with that id' });
        }

        return Thought.create(req.body).then((thought) =>
          User.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          ).then(() =>
            res.status(201).json({
              message: 'Thought created successfully',
              thought,
            })
          )
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  editThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      runValidators: true,
      new: true,
    })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json({ message: 'Thought deleted successfully' })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
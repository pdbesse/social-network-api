const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .select('-__v')
            .populate('reactions')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json('Thought added')
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },
    editThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json({ message: 'Thought deleted' })
            )
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            })
    },
    // addReaction(req,res) {
    //     Thought.findOne({_id: req.params.thoughtId})
    //         .then((thought) =>
    //         !thought
    //             ? res.status(400).json({message: 'No thought found with that id'}
    //             : res.json))
    // }
};
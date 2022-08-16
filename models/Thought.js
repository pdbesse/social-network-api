const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.types.ObjectId,
        default: new ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter to format
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: 'Please enter a thought!',
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter to format
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
})

const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
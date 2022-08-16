const mongoose = require('mongoose');

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
        get: 
    },
    username: {
        type: String,
        required: true,
    },
    friends: [{}]
})

const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
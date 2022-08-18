const { Schema, model, Types } = require('mongoose');
const formatDateTime = require('../utils/helper')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
            get: () => formatDateTime
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: () => formatDateTime
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;
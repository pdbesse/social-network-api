const { Schema, model } = require('mongoose');

// const validateEmail = (email) => {
//     const re = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
//     return re.test(email);
// };

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
            // validate: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                reference: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                reference: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const User = model('User', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})


module.exports = User;
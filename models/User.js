const mongoose = require('mongoose');

const validateEmail = (email) => {
    const re = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trimmed: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        trimmed: true,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/',
            "Please enter a valid email address",
        ],
    },
    thoughts: [{}],
    friends: [{}]
})

const User = model('User', userSchema);


module.exports = User;
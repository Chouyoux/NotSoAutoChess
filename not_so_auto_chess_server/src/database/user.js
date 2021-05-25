const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        pseudonym: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        auth_key: {
            type: String
        },
        friends: {
            type: [String]
        },
        invitations_received: {
            type: [String]
        },
        invitations_pending: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
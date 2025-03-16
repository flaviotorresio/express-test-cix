const mongoose = require("mongoose");
const  userSchema  = require("../schemas/userSchema");

const User = mongoose.model('User', userSchema);

class UserModel {
    async createUser(user) {
        return await User.create(user);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email: email });
    }

    async getUsers() {
        return await User.find({});
    }
}

module.exports = UserModel;
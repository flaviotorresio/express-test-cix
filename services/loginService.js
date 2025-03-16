const UserModel = require("../repositories/models/userModel");
const validatePassword = require("../utils/hashUtil");
const { createSigner } = require('fast-jwt')


class LoginService {

    /**
     * 
     * @param {UserModel} userModel 
     */
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(username, password) {
        console.log(`username: ${username} password: ${password}`);
        const user = await this.getUser(username,password);
        const resultValidatePassword= await validatePassword(password, user.password);
        console.log(`resultValidatePassword: ${resultValidatePassword}`);
        if(!resultValidatePassword) {
            return false;
        }
        const token = await this.createJwt(user);
        console.log(`token: ${token}`);
        console.log('done')
        return token;
    }

    async getUser(username) {
        this.user = await this.userModel.getUserByEmail(username);        
        return this.user;
    }
    async createJwt(user) {
        const signer = createSigner({ key: 'supersecret' });
        const token = signer({ user: user.email , name: user.name }); ;
        return token;
    }

}

module.exports = LoginService;
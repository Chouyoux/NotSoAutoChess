const User = require('../models/user');
const DBUser = require("../database/user");

const validateEmail = require("../utils/validateEmail");
const randomString = require("../utils/randomString");

class UsersController {
    constructor() {
        if (!UsersController.instance) {
            this._users = [];
            this.collect()
            .then(() => {
                this.count();
            });

            setInterval(function(controller) {
                controller.save();
            }, 20*60*1000, this);


            UsersController.instance = this;
        }

        return UsersController.instance;
    }

    async collect(){

        for await (const user of DBUser.find()) {
            this._users.push(new User(user._id, user.pseudonym, user.email, user.password, user.auth_key, user.friends, user.invitations_pending, user.invitations_received));
        }

    }

    async save(){

        console.log("Saving...");

        for (var i = 0; i < this._users.length ; i++){

            let user = this._users[i];
            

            if (user._id){

                let filter = {_id : user._id};
                let update = {
                    pseudonym: user.pseudonym,
                    email: user.email,
                    password: user.password,
                    friends: user.friends,
                    invitations_pending: user.invitations_pending,
                    invitations_received: user.invitations_received,
                    auth_key: user.auth_key
                };

                await DBUser.findOneAndUpdate(filter, update);

            }

            else {

                let user_to_save = new DBUser({
                    pseudonym: user.pseudonym,
                    email: user.email,
                    password: user.password,
                    friends: user.friends,
                    invitations_pending: user.invitations_pending,
                    invitations_received: user.invitations_received,
                    auth_key: user.auth_key
                });

                await user_to_save.save();
                this._users[i]._id = user_to_save._id;

            }

        }

        console.log("Saving done!");

    }

    pseudonymIsUsed(pseudonym){

        for (var i = 0; i < this._users.length ; i++){
            if (pseudonym === this._users[i].pseudonym){
                return true;
            }
        }
        return false;

    }

    emailIsUsed(email){

        for (var i = 0; i < this._users.length ; i++){
            if (email === this._users[i].email){
                return true;
            }
        }
        return false;

    }
    
    add(pseudonym, email, password){

        if (pseudonym.length < 3 || pseudonym.length > 16){
            throw new Error("Pseudonym's length should be between 3 and 16 characters.");
        }

        if (!validateEmail(email)) {
            throw new Error("Incorrectly formatted email.");
        }

        if (email.length < 5 || email.length > 128){
            throw new Error("Email's length should be between 5 and 128 characters.");
        }

        if (password.length < 3 || password.length > 128){
            throw new Error("Password's length should be between 3 and 128 characters.");
        }

        if (this.pseudonymIsUsed(pseudonym)){
            throw new Error("Sorry, the pseudonym \"" + pseudonym + "\" is already taken.");
        }

        if (this.emailIsUsed(email)){
            throw new Error("Sorry, the email \"" + email + "\" is already taken.");
        }

        this._users.push(new User(null, pseudonym, email, password, null, null, null, null));

    }

    authenfityPseudonymePassword(pseudonym, password){

        for (var i = 0; i < this._users.length ; i++){

            let user = this._users[i];

            if (user.pseudonym === pseudonym && user.password === password){

                const key = UsersController.generateAuthKey(user._id);
                this._users[i].auth_key = key;
                return user._id;

            }

        }

        return null;

    }

    authentifyAuthKey(auth_key){

        for (var i = 0; i < this._users.length ; i++){

            let user = this._users[i];

            if (user.auth_key === auth_key){

                return user._id;

            }

        }

        return null;

    }

    getUserById(_id){

        for (var i = 0; i < this._users.length ; i++){

            let user = this._users[i];

            if (user._id.toString() === _id.toString()){

                return user;

            }

        }

        return null;

    }

    setSocketById(_id, socket){

        for (var i = 0; i < this._users.length ; i++){

            let user = this._users[i];

            if (user._id === _id){

                this._users[i].socket = socket

            }

        }

    }

    count(){

        let count = 0;
        this._users.forEach(() => {count++;})
        console.log("There are " + count + " users subscribed");

    }

    static generateAuthKey(_id){

        return _id + randomString(32);

    }

}

const instance = new UsersController();
Object.freeze(instance);

module.exports = instance;

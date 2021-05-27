const Users = require('../controllers/users');
const DBUser = require("../database/user");
const validateEmail = require("../utils/validateEmail");

module.exports = function (socket) {

    socket.on('userAdd', function (data, callback) { // {pseudonym, email, password1, password2}

        if (!data.pseudonym) {
            callback({ success: false, message: "No pseudonym provided." });
            res.status(400);
            res.send({ "code": 400, "message": "No pseudonym provided." });
            return;
        }

        if (!data.email) {
            callback({ success: false, message: "No email provided." });
            return;
        }

        if (!data.password1) {
            callback({ success: false, message: "No password1 provided." });
            return;
        }

        if (!data.password2) {
            callback({ success: false, message: "No password2 provided." });
            return;
        }

        if (data.pseudonym.length < 3 || data.pseudonym.length > 16) {
            callback({ success: false, message: "Pseudonym's length should be between 3 and 16 characters." });
            return;
        }

        if (data.password1.length < 3 || data.password1.length > 64) {
            callback({ success: false, message: "Password's length should be between 3 and 64 characters." });
            return;
        }

        if (data.password1 !== data.password2) {
            callback({ success: false, message: "Passwords don't match." });
            return;
        }

        if (!validateEmail(data.email)) {
            callback({ success: false, message: "Incorrectly formatted email." });
            return;

        }

        if (Users.pseudonymIsUsed(data.pseudonym)) {
            callback({ success: false, message: "Sorry, the pseudonym \"" + data.pseudonym + "\" is already taken." });
            return;
        }

        if (Users.emailIsUsed(data.email)) {
            callback({ success: false, message: "Sorry, the email \"" + data.email + "\" is already taken." });
            return;
        }

        const user = new DBUser({
            pseudonym: data.pseudonym,
            email: data.email,
            password: data.password1
        });

        user.save()
          .then((result) => {
            console.log(data.pseudonym + " (" + data.email + ") just created an account.")
          })
          .catch((err) => console.log(err));


        Users.add(data.pseudonym, data.email, data.password1);
        const final_user = Users.getUserByPseudonym(data.pseudonym);
        final_user._id = user._id;

    });

}
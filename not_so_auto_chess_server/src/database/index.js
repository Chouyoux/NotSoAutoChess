const pw = "ENB2hhkgm2cQ9g75SwtUKkHnKxw6CfTNq2Zpt49pEbpryfwZ7eGTERD6h3rApjVW";
const DB_URI = "mongodb+srv://chouyoux:"+pw+"@notsoautochess.toiop.mongodb.net/NotSoAutoChessDB?retryWrites=true&w=majority";

const mongoose = require('mongoose');

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("Connected to Database !"))
    .catch((err) => console.log(err));

module.exports = mongoose;
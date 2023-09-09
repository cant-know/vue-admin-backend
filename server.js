const express  = require("express");
const bodyParser  = require("body-parser");
const mongoose  = require("mongoose");
const passport  = require("passport");

const app = express();

const users  = require("./routes/api/users");
const profiles = require("./routes/api/profiles")

const db = require('./config/keys').mongoURI

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(db,{ useNewUrlParser: true }).then(() => {
  console.log('mongodb connect')
}).catch((error) => console.log(error))

app.use(passport.initialize());
require('./config/passport')(passport)

app.use('/api/users',users)
app.use('/api/profiles',profiles)

app.listen(4000,() => {
  console.log('server running on port 4000')
})
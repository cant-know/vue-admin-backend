const UserModel = require('../models/UserModel')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const keys  = require("./keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log(jwt_payload)
  UserModel.findOne({id: jwt_payload.id}, (err, user) => {
    if(err){
      console.log(err)
      return done(err, false)
    }
    if(user){
      // console.log(user)
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}));
}
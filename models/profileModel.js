const mongoose  = require("mongoose");
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type:{
    type: String,
  },
  describe:{
    type: String,
  },
  expend:{
    type: String,
    required: true
  },
  incode:{
    type: String,
    required: true
  },
  cash:{
    type: String,
    required: true
  },
  remark:{
    type: String
  }
})

module.exports = ProfileModel = mongoose.model('profile', ProfileSchema)
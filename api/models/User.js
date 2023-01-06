const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
      username:{
            type: String,
            required: true
      },
      email:{
            type: String,
            required: true
      },
      password:{
            type: String,
            required: true
      },
      isAdmin: {
            type: Boolean,
            default: false,
            // required: true
      },
      Followers:{
            type: Array,
      },
      Following:{
            type: Array,
      },
      profile:{
            type: String
      }
})

module.exports = mongoose.model("User", UserSchema);
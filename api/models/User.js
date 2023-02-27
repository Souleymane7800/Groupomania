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
            type: String,
            // default: 'https://firebasestorage.googleapis.com/v0/b/groupomania-8bf54.appspot.com/o/static%2Fmedia%2Fprofile.5faf09a7795d28bf5a2b.png?alt=media&token=c1c7107a-e8cc-45cf-9868-ae39e2f6dc99'
      }
})

module.exports = mongoose.model("User", UserSchema);
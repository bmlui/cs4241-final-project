const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  }, // the user's github id
  username: String, // the user's github username (will be unique)
  displayName: String, // the user's name
  description:{
    type: String,
    default: "Description",
  }, // user description
  settings: {
    color: String,
    darkMode: Boolean,
    anonymous: Boolean,
  },
  profileUrl: String, // url to the user's github profile
  avatarUrl: String, // url to the user's github avatar
  location: String, // the user's location
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // an array of the user's contacts
});

const User = mongoose.model("User", userSchema);

module.exports = User;

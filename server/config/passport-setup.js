const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/userModel");
const mongoose = require("mongoose");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("profile: ", profile);
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          // make a new user
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            description: "Default Description",
            profileUrl: profile.profileUrl,
            avatarUrl: profile.photos[0].value,
            location: profile._json.location,
            contacts: [],
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// saves the user id to the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// retrieves the user id from the session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

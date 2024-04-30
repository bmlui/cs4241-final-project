const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          if (!profile.displayName) {
            profile.displayName = profile.username;
          }
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            avatarUrl: profile.photos[0].value,
            location: profile._json.location,
            bio: "Default Bio",
            colors: {
              mainColor: "bg-red",
              darkColor: "bg-red-dark",
              lightColor: "bg-red-light",
            },
            contacts: [],
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Not using session serialization methods anymore

const passport = require("passport");
const jwt = require("jsonwebtoken");

// Function to handle GitHub authentication
const githubAuth = (req, res, next) => {
  const authenticate = passport.authenticate("github");
  authenticate(req, res, next);
};

// Function to handle callback from GitHub after authentication
const githubCallback = (req, res, next) => {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_FRONTEND_ORIGIN
      : process.env.DEV_FRONTEND_ORIGIN;

  passport.authenticate(
    "github",
    { failureRedirect: redirectUrl },
    (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: "Authentication failed" });
      }
      if (!user) {
        console.log("User not found");
        return res.redirect(redirectUrl);
      }
      // User is authenticated, now issue a JWT
      const token = jwt.sign(
        {
          id: user._id, // Ensure your user model has a unique identifier field
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token valid for 1 hour
      );

      // Redirect to frontend with token
      console.log(`Redirecting to ${redirectUrl} with token.`);
      res.redirect(`${redirectUrl}?token=${token}`);
    }
  )(req, res, next);
};

module.exports = {
  githubAuth,
  githubCallback,
};

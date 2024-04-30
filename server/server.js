const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const http = require("http");
const passport = require("passport");
const corsMiddleware = require("./config/corsConfig");
const authenticateToken = require("./config/jwtConfig"); // Ensure this path is correct
const { init: initSocket } = require("./config/socketConfig");

dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Database setup
require("./config/database");

// Passport setup
require("./config/passport-setup");
app.use(passport.initialize());

// Middleware for development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware to check if the user is authenticated using JWT
function isAuthenticated(req, res, next) {
  // console.log("current token: ", req.headers["authorization"]);
  // console.log("User's token data: ", req.user);
  if (req.user) {
    return next();
  } else {
    console.log("User is not authenticated");
    return res.status(401).json({ error: "User is not authenticated" });
  }
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use(
  "/api/user",
  authenticateToken,
  isAuthenticated,
  require("./routes/userRoutes")
);
app.use(
  "/api/chat",
  authenticateToken,
  isAuthenticated,
  require("./routes/chatRoutes")
);

// Server setup
const server = http.createServer(app);
const io = initSocket(server); // Initialize Socket.IO with the HTTP server

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

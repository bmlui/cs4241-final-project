const User = require("../models/userModel");
const Mongoose = require("mongoose");

const getUser = (req, res) => {
  if (!req.user) {
    return res.json({ message: "No user is logged in." });
  }
  if (!req.user.displayName) {
    req.user.displayName = req.user.username;
  }
  res.json({
    user: req.user,
    message: `${req.user.username} is logged in.`,
  });
};

const addUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "User ID is required." });
  }
  if (!req.user) {
    console.log("User not logged in.");
    return res
      .status(401)
      .json({ error: "You must be logged in to add a user." });
  }
  try {
    const currentUser = await User.findById(req.user._id);
    const userToAdd = await User.findById(req.params.id);

    if (!userToAdd) {
      return res.status(404).json({ error: "User not found." });
    }
    if (currentUser.contacts.includes(userToAdd._id)) {
      return res.status(400).json({ error: "User is already a contact." });
    }
    currentUser.contacts.push(userToAdd._id);
    await currentUser.save();
    res.json({ message: "User added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the user." });
  }
};

const removeUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "User ID is required." });
  }
  if (!req.user) {
    console.log("User not logged in.");
    return res
      .status(401)
      .json({ error: "You must be logged in to remove a user." });
  }
  try {
    const currentUser = await User.findById(req.user._id);
    const userToRemove = await User.findById(req.params.id);

    if (!userToRemove) {
      return res.status(404).json({ error: "User not found." });
    }
    // Check if the user to remove is in the current user's contacts
    const index = currentUser.contacts.indexOf(userToRemove._id);
    if (index === -1) {
      return res.status(400).json({ error: "User is not in your contacts." });
    }
    // Remove the user from contacts
    currentUser.contacts.splice(index, 1);
    await currentUser.save();
    res.json({ message: "User removed successfully from contacts." });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while removing the user from contacts.",
    });
  }
};

const getContacts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must be logged in." });
  }
  try {
    const user = await User.findById(req.user._id).populate("contacts");
    for (let i = 0; i < user.contacts.length; i++) {
      if (!user.contacts[i].displayName) {
        user.contacts[i].displayName = user.contacts[i].username;
      }
    }
    res.json({ contacts: user.contacts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving contacts." });
  }
};

const searchUser = async (req, res) => {
  const { term } = req.query;
  if (!term || term.length < 1) {
    // code goes here but doesnt front end doesnt see error json
    return res.status(400).json({ error: "Search term is required." });
  }

  try {
    // Search for users based on the search term using Mongoose
    const results = await User.find({
      $or: [
        { username: { $regex: term, $options: "i" } }, // Case-insensitive username search
        { displayName: { $regex: term, $options: "i" } }, // Case-insensitive display name search
      ],
    });
    // if no displayName for user then use username as displayName
    results.forEach((user) => {
      if (!user.displayName) {
        user.displayName = user.username;
      }
    });
    res.json({ results });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users." });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Find a user by ID using Mongoose
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (!user.displayName) {
      user.displayName = user.username;
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user by ID." });
  }
};

module.exports = {
  getUser,
  searchUser,
  getContacts,
  getUserByID,
  addUser,
  removeUser,
};

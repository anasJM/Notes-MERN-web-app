require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.ConnectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello!" });
});

// *********** create account *********** //
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }

  // check if the user already exist
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }

  // creating the user
  const user = new User({
    fullName,
    email,
    password,
  });

  // save the user in the DB
  await user.save();

  // TOKEN
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// *********** Login *********** //
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }

  // check if the user already exist
  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found!" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// *********** Add Note *********** //
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;
  // console.log(user.user._id);
  // console.log(user);

  if (!title) {
    return res.status(400).json({ error: true, message: "Enter the title" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "Enter the content" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user.user._id,
    });

    await note.save();

    return res.json({
      error: false,
      message: "Note added successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

// ********** Edit note *********** //
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      message: "Note has been updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

app.listen(8000);

module.exports = app;

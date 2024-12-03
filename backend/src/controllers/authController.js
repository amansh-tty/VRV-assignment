const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: `User registered with username: ${username}` });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login request for username: ${username}`); // Add this
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User with ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid password` });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`User ${username} logged in successfully`); // Add this
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { register, login };

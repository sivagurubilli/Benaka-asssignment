const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwtUtils");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { registerSchema, loginSchema } = require("../Validations/ValidationSchema");

// Register
const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({ accessToken, refreshToken, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout (Optional for refresh token clearing)
const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { register, login, logout };

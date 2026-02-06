const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.getUsers = async (req, res) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await User.find().select("-password");
    } else {
      users = await User.findById(req.user.id).select("-password");
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.json({
    message: "User Registered",
    user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    message: "Login Successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    },
  });
};

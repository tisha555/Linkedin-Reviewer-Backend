import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email });
  res.status(201).json(user);
};


export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};


export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};


export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateMe = async (req, res) => {
  const { name, email } = req.body;

  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  ).select("-password");

  res.json(updated);
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ message: "Old password incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};

export const deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Account deleted" });
};

// new
// export const createUser = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).json({ message: "Request body is missing" });
//   }

//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "Name and email are required" });
//   }

//   const exists = await User.findOne({ email });
//   if (exists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const user = await User.create({ name, email });
//   res.status(201).json(user);
// };

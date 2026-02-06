const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const task = await Task.create({
    ...req.body,
    user: req.user.id,
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  let tasks;
  if (req.user.role === "admin") {
    tasks = await Task.find({}).populate("user", "name email");
  } else {
    tasks = await Task.find({
      user: req.user.id,
    });
  }

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied: Insufficient Permissions" });
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied: Insufficient Permissions" });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task Deleted" });
};

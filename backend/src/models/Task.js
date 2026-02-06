const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;

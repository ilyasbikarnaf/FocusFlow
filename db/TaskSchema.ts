import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    enum: ["todo", "in_progress", "done"],
    default: "Todo",
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "Medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: null,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

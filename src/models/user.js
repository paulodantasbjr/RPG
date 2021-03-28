const mongoose = require("../database");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

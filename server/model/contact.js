const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    name: {
      type: String,
      require: [true, "Please provide contact name"],
    },

    email: {
      type: String,
      require: [true, "Please provide contact email"],
    },

    phone: {
      type: String,
      unique: true,
      require: [true, "Please provide Phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);

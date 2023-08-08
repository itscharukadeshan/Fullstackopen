/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  published: {
    type: Number,
    minlength: 4,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
  },
  genres: {
    type: [String],
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model("Book", schema);

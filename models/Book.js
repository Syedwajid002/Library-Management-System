const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, unique: true, required: true },
  publicationDate: { type: Date },
  genre: { type: String },
  copies: { type: Number, default: 1, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publicationYear: Number,
  coverImage: String,
  description: String,
  averageRating: Number,
  purchaseOptions: [{ platform: String, url: String, price: Number }],
  reviews: [{ rating: Number, comment: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['tbr', 'reading', 'read'], required: true },
});

module.exports = mongoose.model('UserBook', userBookSchema);
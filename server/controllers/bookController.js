const Book = require('../models/Book');
const UserBook = require('../models/UserBook');
const axios = require('axios');

const getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
};

const addBook = async (req, res) => {
  const { isbn } = req.body;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const bookData = response.data.items[0].volumeInfo;
    const newBook = new Book({
      title: bookData.title,
      author: bookData.authors?.join(', '),
      genre: bookData.categories?.[0],
      description: bookData.description,
      isbn,
      publicationYear: bookData.publishedDate?.split('-')[0],
      coverImage: bookData.imageLinks?.thumbnail,
      googleBooksId: response.data.items[0].id,
      averageRating: bookData.averageRating,
      purchaseOptions: [{ platform: 'Google Books', url: response.data.items[0].saleInfo.buyLink || '', price: 0 }], // Placeholder
      addedBy: req.user._id,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book data' });
  }
};

const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    Object.assign(book, req.body);
    const updated = await book.save();
    res.json(updated);
  } else res.status(404).json({ message: 'Book not found' });
};

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: 'Book removed' });
  } else res.status(404).json({ message: 'Book not found' });
};

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    book.reviews.push({ user: req.user._id, rating, comment });
    await book.save();
    res.status(201).json({ message: 'Review added' });
  } else res.status(404).json({ message: 'Book not found' });
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, addReview };
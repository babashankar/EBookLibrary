import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const MyBooksPage = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();
  const [tbr, setTbr] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    if (userId) {
      const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
      const userBooks = savedBooks.filter(book => book.userId === userId);
      setTbr(userBooks.filter(b => b.status === 'tbr'));
      setReading(userBooks.filter(b => b.status === 'reading'));
      setRead(userBooks.filter(b => b.status === 'read'));
    }
  }, [userId]);

  const updateBookStatus = (book, newStatus) => {
    const updatedBook = { ...book, status: newStatus };
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    const bookIndex = savedBooks.findIndex(b => b.googleBooksId === book.googleBooksId && b.userId === userId);
    if (bookIndex > -1) {
      savedBooks[bookIndex] = updatedBook;
    } else {
      savedBooks.push(updatedBook);
    }
    localStorage.setItem('books', JSON.stringify(savedBooks));
    const refreshedUserBooks = savedBooks.filter(b => b.userId === userId);
    setTbr(refreshedUserBooks.filter(b => b.status === 'tbr'));
    setReading(refreshedUserBooks.filter(b => b.status === 'reading'));
    setRead(refreshedUserBooks.filter(b => b.status === 'read'));
  };

  const removeBook = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    const updatedBooks = savedBooks.filter(b => b.googleBooksId !== book.googleBooksId || b.userId !== userId);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    const refreshedUserBooks = updatedBooks.filter(b => b.userId === userId);
    setTbr(refreshedUserBooks.filter(b => b.status === 'tbr'));
    setReading(refreshedUserBooks.filter(b => b.status === 'reading'));
    setRead(refreshedUserBooks.filter(b => b.status === 'read'));
  };

  if (!userId) {
    return <div className="container mx-auto p-4 text-center">Please log in to view your books.</div>;
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-40 bg-teal-600 border-2 border-dashed border-teal-600 rounded-xl">
      <FaPlus className="text-4xl text-gold-600 mb-2" />
      <p className="text-gold-600 font-medium">Add Books</p>
    </div>
  );

  const BookActionButtons = ({ book }) => (
    <div className="flex space-x-2 mt-3">
      <button
        onClick={() => updateBookStatus(book, 'tbr')}
        className="bg-gold-500 text-teal-700 p-2 rounded-full hover:bg-gold-600 transition-colors"
      >
        To Be Read
      </button>
      <button
        onClick={() => updateBookStatus(book, 'reading')}
        className="bg-gold-500 text-teal-700 p-2 rounded-full hover:bg-gold-600 transition-colors"
      >
        Reading
      </button>
      <button
        onClick={() => updateBookStatus(book, 'read')}
        className="bg-gold-500 text-teal-700 p-2 rounded-full hover:bg-gold-600 transition-colors"
      >
        Read
      </button>
      <button
        onClick={() => removeBook(book)}
        className="bg-gold-500 text-teal-700 p-2 rounded-full hover:bg-gold-600 transition-colors"
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-teal-800 mb-6">My Book Collection</h1>
      <h2 className="text-3xl font-bold text-teal-700 mb-4">To Be Read</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {tbr.length > 0 ? (
          tbr.map(book => (
            <div key={book.googleBooksId} className="relative">
              <BookCard book={book} />
              <BookActionButtons book={book} />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      <h2 className="text-3xl font-bold text-teal-700 mb-4">Reading</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {reading.length > 0 ? (
          reading.map(book => (
            <div key={book.googleBooksId} className="relative">
              <BookCard book={book} />
              <BookActionButtons book={book} />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      <h2 className="text-3xl font-bold text-teal-700 mb-4">Read</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {read.length > 0 ? (
          read.map(book => (
            <div key={book.googleBooksId} className="relative">
              <BookCard book={book} />
              <BookActionButtons book={book} />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
import { FaStar } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';

const BookCard = ({ book, onClick, buttonText }) => {
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(book);
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-teal-700 to-teal-800 text-white shadow-lg rounded-xl p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-teal-600 relative overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gold-200/500 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-56 object-cover rounded-lg"
          onError={(e) => { e.target.src = 'https://placehold.co/200x300'; }}
        />
        <div className="absolute top-2 right-2 bg-gold-200 text-white rounded-full p-1">
          <MdFavoriteBorder className="text-lg" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-3 truncate">{book.title}</h3>
      <p className="text-gray-200 text-sm mt-1">{book.author}</p>
      <div className="flex items-center mt-2">
        <FaStar className="text-gold-200 mr-1" />
        <span className="text-gray-100">{book.averageRating ? `${book.averageRating}/5` : 'N/A'}</span>
      </div>
      <p className="text-xs text-gray-300 mt-1">ISBN: {book.isbn}</p>
      {buttonText && (
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-3 w-full bg-gold-500 text-white py-2 rounded-lg hover:bg-salmon-600 transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default BookCard;
import { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { FaBars, FaTimes } from 'react-icons/fa';
  import useAuth from '../hooks/useAuth';

  const Navbar = () => {
    const { logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-teal-800 text-white fixed top-0 left-0 w-full z-50 shadow-md h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link to="/" className="text-2xl font-bold">E-Book Library</Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gold-500">Home</Link>
            <Link to="/bookshelf" className="hover:text-gold-500">Bookshelf</Link>
            <Link to="/mybooks" className="hover:text-gold-500">My Books</Link>
            <Link to="/about" className="hover:text-gold-500">About</Link>
            {user ? (
              <button onClick={logout} className="hover:text-gold-500">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-gold-500">Login</Link>
                <Link to="/register" className="hover:text-gold-500">Register</Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-teal-800 p-4 space-y-2 z-40">
              <Link to="/" className="block hover:text-gold-500" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/mybooks" className="block hover:text-gold-500" onClick={() => setIsOpen(false)}>My Books</Link>
              <Link to="/about" className="block hover:text-gold-500" onClick={() => setIsOpen(false)}>About</Link>
              {user ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left hover:text-gold-500">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="block hover:text-gold-500" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/register" className="block hover:text-gold-500" onClick={() => setIsOpen(false)}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;
import { Link, useLocation } from 'react-router-dom';
import { FaBook, FaUser, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-primary text-#3d5b58 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <FaBook className="mr-2" />
          <Link to="/" className="text-xl font-bold text-teal-700">E-Book Library</Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className={`text-teal-700 hover:text-teal-900 hover:text-shadow-shine ${location.pathname === '/' ? 'font-bold' : ''}`}>Home</Link>
          <Link to="/bookshelf" className={`text-teal-700 hover:text-teal-900 hover:text-shadow-shine ${location.pathname === '/bookshelf' ? 'font-bold' : ''}`}>Bookshelf</Link>
          <Link to="/mybooks" className={`text-teal-700 hover:text-teal-900 hover:text-shadow-shine ${location.pathname === '/mybooks' ? 'font-bold' : ''}`}>My Books</Link>
          <Link to="/about" className={`text-teal-700 hover:text-teal-900 hover:text-shadow-shine ${location.pathname === '/about' ? 'font-bold' : ''}`}>About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <FaUser className="cursor-pointer" onClick={() => { /* Profile modal */ }} />
              <FaSignOutAlt className="cursor-pointer" onClick={logout} />
            </>
          ) : (
            <Link to="/login" className="bg-accent px-4 py-2 rounded">Login / Register</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
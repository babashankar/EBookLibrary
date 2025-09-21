import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-gold-200 p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Online Book Library. All rights reserved.</p>
      <div className="mt-2">
        <a href="/about" className="text-gold-500 hover:underline mx-2">About</a>
        <a href="/contact" className="text-gold-500 hover:underline mx-2">Contact</a>
        <a href="/privacy" className="text-gold-500 hover:underline mx-2">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white p-4 text-center min-h-[60px]">
      <p className="text-sm">&copy; {new Date().getFullYear()} Online Book Library. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4 flex-wrap">
        <a href="/about" className="text-gold-500 hover:underline text-sm">About</a>
        <a href="/contact" className="text-gold-500 hover:underline text-sm">Contact</a>
        <a href="/privacy" className="text-gold-500 hover:underline text-sm">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-black py-3 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Designed & Developed by <span className="font-semibold">Aksshat Srivastava</span>
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/sriakshat5/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://akshat-srivastava-navy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

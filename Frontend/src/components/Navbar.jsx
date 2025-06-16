import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white flex items-center justify-between px-6 md:px-12 h-12 w-screen border-b border-white">
      <h2 className="text-3xl hover:text-sky-400 cursor-pointer transition-all duration-300 hover:scale-110">
        Quiz
      </h2>

      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <ul
        className={`
          absolute top-12 left-0 w-full bg-black text-white flex flex-col
          md:static md:w-auto md:flex md:flex-row md:space-x-10 md:text-lg
          ${menuOpen ? "flex" : "hidden"}
        `}
      >
        <li className="border-b border-white md:border-none">
          <Link
            to="/"
            className="block px-4 py-2 hover:underline hover:text-sky-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="border-b border-white md:border-none">
          <Link
            to="/Score-Board"
            className="block px-4 py-2 hover:underline hover:text-sky-500"
            onClick={() => setMenuOpen(false)}
          >
            Score-Board
          </Link>
        </li>
        <li className="border-b border-white md:border-none">
          <Link
            to="/about"
            className="block px-4 py-2 hover:underline hover:text-sky-500"
            onClick={() => setMenuOpen(false)}
          >
            Rules
          </Link>
        </li>
        <li className="border-b border-white md:border-none">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:underline hover:text-sky-500"
            onClick={() => setMenuOpen(false)}
          >
            SignIn
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

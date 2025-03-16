import React, { useState } from "react";

type NavLink = {
  label: string;
  url: string;
};

type NavbarProps = {
  links: NavLink[];
};

const Navbar = ({ links }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="bg-blue-500 p-4 sm:hidden">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">Logo</div>
          <div>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          } fixed top-0 right-0 bottom-0 bg-white w-3/4 transition-all duration-300 ease-in-out transform z-10`}
        >
          <div className="flex flex-col h-full justify-between items-end p-4">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-gray-800 hover:text-gray-600 mb-4"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={closeMenu}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="bg-blue-500 p-4 hidden justify-between sm:flex">
        <div className="text-white font-semibold">Logo</div>
        <div className="space-x-4">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-white hover:text-gray-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

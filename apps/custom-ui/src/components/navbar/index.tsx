import { useState } from "react";

type NavLink = {
  label: string;
  url: string;
};

type NavbarProps = {
  links: NavLink[];
};

export const Navbar = ({ links }: NavbarProps) => {
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
      <nav className="bg-blue-600 p-4 sm:hidden relative">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg">Logo</div>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
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

        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 z-30 p-5 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={closeMenu}
            className="text-gray-800 self-end block mb-6"
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-gray-800 hover:text-blue-600 text-lg"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="bg-blue-600 p-4 hidden sm:flex justify-between items-center">
        <div className="text-white font-bold text-lg">Logo</div>
        <div className="space-x-6">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-white hover:text-gray-200 text-lg"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

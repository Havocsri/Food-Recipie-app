import { FaHome, FaRegHeart, FaThLarge, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      navigate(`/search/${searchText}`);
    }
  };

  return (
    <nav className="flex w-full max-w-8xl flex-wrap items-center justify-between gap-3 bg-ink-900 px-4 py-3 shadow-2xl sm:px-6">

      {/* Logo */}
      <div className="flex shrink-0 items-center cursor-pointer">
        <img
          src={logo}
          alt="Recipe Explorer Logo"
          className="h-10 w-20 object-contain sm:h-12 sm:w-25"
        />

        <h1 className="whitespace-nowrap text-lg font-bold mr-3 shadow-2xl hover:shadow-gold-500 text-cream sm:text-xl">
          Recipe <span className="text-gold-500">Explorer</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center w-full flex-wrap justify-center gap-2 sm:gap-4 lg:w-auto lg:flex-nowrap lg:gap-6 xl:gap-10">

        {/* Home */}
        <Link
          to="/"
          className="flex gap-1 items-center  rounded-full px-2 py-1 font-bold text-cream transition cursor-pointer hover:bg-gold-400 hover:text-ink-900 sm:px-3"
        >
          <FaHome />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Search Bar */}
        <div className="order-last flex w-full items-center rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 sm:order-none sm:w-80 lg:w-96 xl:w-xl">
          <FaSearch className="mr-2 shrink-0 text-ink-900" />

          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search  recipes..."
            className="min-w-0 flex-1 outline-none"
          />

          <button
            className="ml-2 shrink-0 rounded-full bg-ink-900 px-3 py-1 text-sm font-medium text-gold-400 transition hover:bg-ink-700 sm:px-5"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Categories */}
        <Link
          to="/categories"
          className="flex items-center gap-2 rounded-full px-2 py-1 font-bold text-cream transition cursor-pointer hover:bg-gold-400 hover:text-ink-900 sm:px-3"
        >
          <FaThLarge />
          <span className="hidden sm:inline">Categories</span>
        </Link>

        {/* Favorites */}
        <Link
          to="/favorites"
          className="flex items-center gap-1 rounded-full px-2 py-1 font-bold text-cream transition cursor-pointer hover:bg-gold-400 hover:text-ink-900 sm:px-3"
        >
          <FaRegHeart />
          <span className="hidden sm:inline">Favorites</span>
        </Link>

      </div>
    </nav>
  );
};

export default NavBar;
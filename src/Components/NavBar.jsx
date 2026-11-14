import { FaHome, FaRegHeart, FaThLarge, FaSearch, } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      navigate(`/search/${searchText}`);
      
    }
  };

  return (
    <nav className=" flex w-full max-w-8xl items-center justify-between bg-ink-900 px-6 py-3 shadow-2xl ">

      {/* Logo */}
      <div className="flex items-center  cursor-pointer ">
        <img src={logo} alt="Recipe Explorer Logo"
          className="h-12 w-25 object-contain" />


        <h1 className="whitespace-nowrap text-xl font-bold  mr-3  shadow-2xl  hover:shadow-gold-500 text-cream">
          Recipe <span className="text-gold-500">Explorer</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-10">

        {/* Home */}
        <Link to="/" className="flex gap-1 items-center font-bold text-cream transition cursor-pointer hover:bg-gold-400 px-3 py-1 rounded-full hover:text-ink-900">
          <FaHome />
          <span>Home</span>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 w-xl bg-gray-100 focus-within:shadow shadow-gray-300">
          <FaSearch className="mr-2 text-ink-900" />

          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
           // onKeyDown={(event) => {
              // if (event.key == "Enter") {
              //   handleSearch();
              // }
            //}}
            placeholder="Search  recipes..."
            className="w-40 flex-1 outline-none " />
          <button className="ml-2 flex justify-end rounded-full bg-ink-900 px-5 py-1 text-sm font-medium text-gold-400 transition hover:bg-ink-700" onClick={handleSearch}> Search
          </button>
        </div>

        {/* Categories */}
        <Link to="/categories" className="flex gap-2 items-center font-bold text-cream transition cursor-pointer hover:bg-gold-400 px-3 py-1 rounded-full hover:text-ink-900 ">
          <FaThLarge />
          <span >Categories</span>
        </Link>

        {/* Favorites */}
        <Link to="/favorites" className="flex gap-1 items-center font-bold text-cream transition  cursor-pointer hover:bg-gold-400 px-3 py-1 rounded-full hover:text-ink-900">
          < FaRegHeart />
          <span>Favorites</span>
        </Link>

      </div>
    </nav>
  );
};

export default NavBar;

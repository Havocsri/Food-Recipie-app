import { FaHome,  FaRegHeart, FaThLarge, FaSearch, } from "react-icons/fa";

import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className=" flex w-full max-w-8xl items-center justify-between bg-ink-900 px-6 py-3 shadow-2xl ">
      
      {/* Logo */}
          <div className="flex items-center  cursor-pointer ">
              <img src={logo} alt="Recipe Explorer Logo"
          className="h-12 w-25 object-contain"/>
        

        <h1 className="whitespace-nowrap text-xl font-bold  mr-3  text-cream">
          Recipe <span className="text-gold-500">Explorer</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-10">
        
        {/* Home */}
        <div className="flex gap-1 items-center font-bold text-muted transition  border-b-2 border-transparent cursor-pointer hover:border-cream hover:text-cream">
          <FaHome />
          <span>Home</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 w-xl bg-cream  focus-within:shadow shadow-gray-300">
          <FaSearch className="mr-2 text-gray-400" />

          <input
            type="text"
            placeholder="Search  recipes..."
                className="w-40 flex-1 outline-none "
                  />
                    <button className="ml-2 flex justify-end rounded-full bg-gold-400 px-5 py-1 text-sm font-medium text-ink-900 transition hover:bg-gold-500">
      Search
    </button>
        </div>

        {/* Categories */}
        <div className="flex gap-1 items-center font-bold text-muted transition border-b-2 cursor-pointer border-transparent hover:border-cream hover:text-cream">
          <FaThLarge />
          <span>Categories</span>
        </div>

        {/* Favorites */}
        <div className="flex gap-1 items-center font-bold text-muted transition border-b-2 border-transparent cursor-pointer hover:border-cream hover:text-cream">
          < FaRegHeart />
          <span>Favorites</span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import food1 from "../assets/image-1.png";
import food2 from "../assets/image-2.png";
import food3 from "../assets/images-3.png";
import food4 from "../assets/images-4.png";
import { FaSearch, FaArrowRight } from "react-icons/fa";
const HeroSection = () => {

  const foodImages = [food1, food2, food3, food4];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const nextImage = (prevImage + 1) % foodImages.length;
        return nextImage;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <section className="p-10 flex min-h-125 w-100% max-w-8xl items-center justify-between overflow-hidden py-14  bg-ink-900">

        {/* Left Side - Welcome Content */}
        <div className="w-1/2">

          {/* Small Tag */}
          <p className="inline-block rounded-full  px-5 py-2 font-medium text-gold-500">
            ✨ Discover • Cook • Enjoy
          </p>

          {/* Heading */}
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white">
            Welcome to <br />

            <span className="text-gold-500">
              Recipe{" "} Explorer !
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Discover delicious recipes from around the  world.
            Search, explore and cook your favorite dishes easily !
          </p>

          {/* Button */}
          < button><Link to="/categories" className="mt-7 flex items-center gap-4 rounded-full bg-gold-400 px-6 py-3 font-semibold text-ink-900 transition duration-300 hover:scale-97 hover:bg-gold-500">
            <FaSearch />
            Explore Recipes
            <FaArrowRight />
          </Link></button>

        </div>

        {/* Right Side - Food Image */}
        <div className="flex w-1/2 justify-center">

          <img
            src={foodImages[currentImage]}
            alt="Delicious Food"
            className="w-200 h-100   max-w-lg object-cover rounded-xl shadow-lg transition duration-500 hover:scale-99"
          />

        </div>


      </section>
    </>
  )
}

export default HeroSection

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import food1 from "../assets/image-1.png";
import food2 from "../assets/image-2.png";
import food3 from "../assets/images-3.png";
import food4 from "../assets/images-4.png";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  // This array holds all the food images used in the hero section.
  const foodImages = [food1, food2, food3, food4];

  // This state keeps track of which image is currently displayed.
  const [currentImage, setCurrentImage] = useState(0);

  // This effect changes the image automatically every 2 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        // Move to the next image. When it reaches the end, start again from the beginning.
        const nextImage = (prevImage + 1) % foodImages.length;
        return nextImage;
      });
    }, 2000);

    // Stop the timer when the component is removed from the page.
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="p-10 flex min-h-125 w-100% max-w-8xl items-center justify-between overflow-hidden py-14 bg-ink-900">
        {/* Left side: welcome text and button */}
        <div className="w-1/2">
          {/* Small tag under the header */}
          <p className="inline-block rounded-full px-5 py-2 font-medium text-gold-500">
            ✨ Discover • Cook • Enjoy
          </p>

          {/* Main heading of the homepage */}
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white">
            Welcome to <br />
            <span className="text-gold-500">Recipe Explorer !</span>
          </h1>

          {/* Short description about the app */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Discover delicious recipes from around the world. Search, explore and cook your
            favorite dishes easily!
          </p>

          {/* This button moves the user to the categories page */}
          <button>
            <Link
              to="/categories"
              className="mt-7 flex items-center gap-4 rounded-full bg-gold-400 px-6 py-3 font-semibold text-ink-900 transition duration-300 hover:scale-97 hover:bg-gold-500"
            >
              <FaSearch />
              Explore Recipes
              <FaArrowRight />
            </Link>
          </button>
        </div>

        {/* Right side: image slider area */}
        <div className="flex w-1/2 flex-col items-center justify-center">
          <img
            src={foodImages[currentImage]}
            alt="Delicious Food"
            className="w-200 h-100 max-w-lg object-cover rounded-xl shadow-lg transition duration-500 hover:scale-99"
          />

          {/* These dots let the user select a different food image */}
          <div className="mt-4 flex gap-2">
            {foodImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`h-3 w-3 rounded-full border border-cream ${currentImage == index ? "bg-muted" : "bg-transparent"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

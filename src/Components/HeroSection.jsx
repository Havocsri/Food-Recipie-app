
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
      <section className="flex min-h-125 w-full max-w-8xl flex-col items-center justify-between gap-10 overflow-hidden bg-ink-900 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:gap-6 lg:px-10 lg:py-14">

        {/* Left side: welcome text and button */}
        <div className="w-full md:w-1/2">

          {/* Small tag under the header */}
          <p className="inline-block rounded-full px-3 py-2 text-sm font-medium text-gold-500 sm:px-5 sm:text-base">
            ✨ Discover • Cook • Enjoy
          </p>

          {/* Main heading of the homepage */}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:mt-6 lg:text-5xl">
            Welcome to <br />
            <span className="text-gold-500">Recipe Explorer !</span>
          </h1>

          {/* Short description about the app */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Discover delicious recipes from around the world. Search, explore and cook your
            favorite dishes easily!
          </p>

          {/* This button moves the user to the categories page */}
          <Link
            to="/categories"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-900 transition duration-300 hover:scale-97 hover:bg-gold-500 sm:mt-7 sm:gap-4 sm:px-6 sm:text-base"
          >
            <FaSearch />
            Explore Recipes
            <FaArrowRight />
          </Link>
        </div>

        {/* Right side: image slider area */}
        <div className="flex w-full flex-col items-center justify-center md:w-1/2">

          <img
            src={foodImages[currentImage]}
            alt="Delicious Food"
            className="h-64 w-full max-w-lg rounded-xl object-cover shadow-lg transition duration-500 hover:scale-99 sm:h-80 lg:h-100"
          />

          {/* These dots let the user select a different food image */}
          <div className="mt-4 flex gap-2">
            {foodImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`h-3 w-3 rounded-full border border-cream ${
                  currentImage == index ? "bg-muted" : "bg-transparent"
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

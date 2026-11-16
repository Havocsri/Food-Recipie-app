
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-ink-700 bg-ink-900 text-cream">

      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-8 px-5 py-10 sm:px-6 sm:py-12 md:grid-cols-3 md:gap-8 lg:gap-10">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">
            Recipe <span className="text-gold-500">Explorer</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted sm:mt-4 sm:text-base">
            Discover delicious recipes from around the world.
            Search your favorite meals, explore categories and
            learn how to cook amazing dishes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-gold-500 sm:text-lg">
            Quick Links
          </h3>

          <div className="mt-3 flex flex-col gap-3 text-sm text-muted sm:mt-4 sm:text-base">

            <Link
              to="/"
              className="transition hover:text-gold-500"
            >
              Home
            </Link>

            <Link
              to="/categories"
              className="transition hover:text-gold-500"
            >
              Categories
            </Link>

            <Link
              to="/favorites"
              className="transition hover:text-gold-500"
            >
              Favorites
            </Link>

          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-base font-semibold text-gold-500 sm:text-lg">
            Explore Recipes
          </h3>
           {/* Showcase text only; these items are not links. */}
          <ul className="mt-3 space-y-3 text-sm text-muted sm:mt-4 sm:text-base">
            <li>Search delicious recipes</li>
            <li>Explore food categories</li>
            <li>View ingredients and instructions</li>
            <li>Watch recipe videos</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-ink-700">

        <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 text-center text-xs text-muted sm:px-6 sm:py-5 sm:text-sm">

          © 2026 Recipe Explorer • Made for food lovers

        </div>

      </div>

    </footer>
  );
};

export default Footer;

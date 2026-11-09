import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-t border-ink-700 bg-ink-900 text-cream">

      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 ">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold">
            Recipe <span className="text-gold-500">Explorer</span>
          </h2>

          <p className="mt-4 leading-7 text-muted">
            Discover delicious recipes from around the world.
            Search your favorite meals, explore categories and
            learn how to cook amazing dishes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gold-500">
            Quick Links
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-muted">

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
          <h3 className="text-lg font-semibold text-gold-500">
            Explore Recipes
          </h3>

          <ul className="mt-4 space-y-3 text-muted">
            <li> Search delicious recipes</li>
            <li> Explore food categories</li>
            <li>View ingredients and instructions</li>
            <li> Watch recipe videos</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-ink-700">

        <div className="mx-auto flex max-w-7xl justify-center px-6 py-5 text-center text-sm text-muted">

          © 2026 Recipe Explorer • Made for food lovers 

        </div>

      </div>

    </footer>
  );
};

export default Footer;
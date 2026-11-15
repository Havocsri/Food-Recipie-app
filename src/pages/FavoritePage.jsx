import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const navigate = useNavigate();

  // Get saved favorite recipes from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Remove a recipe from favorites
  const removeFavorite = (event, id) => {
    event.stopPropagation();

    const updatedFavorites = favorites.filter(
      (recipe) => recipe.idMeal != id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">
      <h1 className="text-center text-3xl font-bold">
        My <span className="text-gold-500">Favorites</span>
      </h1>

      {favorites.length === 0 ? (
        <p className="mt-10 text-center text-xl text-cream">
          Your favorite recipes will appear here ❤️
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="relative cursor-pointer overflow-hidden rounded-xl bg-ink-800 transition hover:-translate-y-1"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-48 w-full object-cover"
              />

              {/* Remove from favorites */}
              <button
                onClick={(event) =>
                  removeFavorite(event, recipe.idMeal)
                }
                className="absolute right-3 top-3 rounded-full bg-cream p-3 text-xl text-red-500 cursor-pointer"
              >
                <FaHeart />
              </button>

              <div className="p-4">
                <h2 className="font-bold">{recipe.strMeal}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";


const RecipePage = () => {
  // This gets the category name from the URL.
  // Example: /recipe/chicken -> name = "chicken"
  const { name } = useParams();

  // This stores all recipes from the selected category.
  const [recipes, setRecipes] = useState([]);

  // This is used to move to another page when a recipe card is clicked.
  const navigate = useNavigate();

  // Load saved favorite recipes from localStorage 
  const [Favorite, setFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // This runs when the category name changes.
  // It fetches all recipes in that category from the API.
  useEffect(() => {
    const controller = new AbortController();

    const getRecipes = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe page");
        }
        const data = await response.json();

        if (!data.meals) {
          throw new Error("Recipes are not found");
        }

        // If there are no meals, keep the array empty.
        setRecipes(data.meals || []);
        setLoading(false);
      } catch {
        if (error.name != "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    getRecipes();

    // Cancel the request if the page changes or unmounts.
    return () => controller.abort();
  }, [name]);

  // This function adds or removes a recipe from favorites.
  const toggleFavorite = (event, recipe) => {
    event.stopPropagation();

    setFavorite((prev) => {
      const alreadyExists = prev.some(
        (item) => item.idMeal === recipe.idMeal
      );

      if (alreadyExists) {
        return prev.filter(
          (item) => item.idMeal !== recipe.idMeal
        );
      }

      return [...prev, recipe];
    });
  };

   // Save favorites to localStorage whenever the favorites list changes.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Favorite));
  }, [Favorite]);


  // If data is still loading, show a loading animation.
  if (loading) {
    return (
      <div className=" h-100 flex items-center justify-center bg-ink-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold-500 border-t-transparent"></div>
      </div>
    );
  }


  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">
      <div className="mx-auto max-w-8xl">
         {/* Navigates back to the previous page. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
          <button
           onClick={() => navigate(-1)}
           className="justify-self-start rounded-lg bg-gold-500 px-2 lg:px-4 py-2 text-sm font-bold  text-ink-900 transition hover:translate-y-0.5 hover:bg-gold-400">
               ← Back to Categories
          </button>
         {/* Title of the page showing the selected category name */}
         <h1 className="text-3xl flex gap-3 sm:mt-3 font-bold md:text-5xl">
          {name}
           <span className="text-gold-500">Recipes</span>
         </h1>
       </div>

        {/* Small subtitle under the heading */}
        <p className="mt-3 text-xl md:text-3xl flex justify-center text-muted">
          Explore delicious {name} recipes
        </p>

        {/* This part shows all the recipe cards in a grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="overflow-hidden rounded-xl bg-ink-900 transition duration-300 border border-ink-900 hover:border-gold-400 hover:-translate-y-1"
            >
              <div className="relative">
                {/* Recipe image displayed on each card */}
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-103"
                />

                {/* This button adds the recipe to favorites or removes */}
                <button
                  onClick={(event) => toggleFavorite(event, recipe)}
                  className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg"
                >
                  {Favorite.some(
                    (item) => item.idMeal === recipe.idMeal
                  ) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>

              {/* Recipe name shown below the image */}
              <div className="p-4">
                <h2 className="text-lg flex justify-center items-center font-semibold">
                  {recipe.strMeal}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default RecipePage;
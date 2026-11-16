import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const RecipeDetails = () => {
  // This gets the recipe id from the URL.
  const { id } = useParams();
const navigate = useNavigate();
  // This stores the selected recipe details.
  const [recipe, setRecipe] = useState(null);

  //loading statement 
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // This runs when the recipe id changes.
  // It fetches one recipe from the API using its ID.
  useEffect(() => {
    const controller = new AbortController();

    const getRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }

        const data = await response.json();

        if (!data.meals) {
          throw new Error("recipe is not found")
        }

        setRecipe(data.meals[0]);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setLoading(false);
        }
      }

    };

    getRecipeDetails();


    // Cancel the request when the component changes or closes.
    return () => controller.abort();
  }, [id]);

  // If data is still loading, show a loading animation.
  if (loading) {
    return (
      <div className=" h-150 flex items-center justify-center bg-ink-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold-500 border-t-transparent"></div>
      </div>
    );
  }

// Toggles the recipe's favorite status and saves it to localStorage.
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const alreadyExists = prev.some(
        (item) => item.idMeal === recipe.idMeal
      );

      let updatedFavorites;

      if (alreadyExists) {
        updatedFavorites = prev.filter(
          (item) => item.idMeal !== recipe.idMeal
        );
      } else {
        updatedFavorites = [...prev, recipe];
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };



  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">
      <div className="mx-auto max-w-8xl">
         {/* Navigates back to the previous page. */}
        <button
           onClick={() => navigate(-1)}
           className="mb-6 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-bold  text-ink-900 transition hover:translate-y-0.5 hover:bg-gold-400">
               ← Back to Recipes
        </button>
        <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center">
           <div className="relative">
            {/* This is the big recipe image on the left side. */}
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="h-80 w-175 rounded-2xl cursor-pointer transition hover:translate-y-1 object-cover"
            />

            {/* Button to add or remove this recipe from favorites. */}
            <button
              onClick={toggleFavorite}
              className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg"
            >
              {favorites.some(
                (item) => item.idMeal == recipe.idMeal
              ) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>

          {/* This is the recipe name and extra details like category and area. */}
          <div>
            <h1 className="mb-5 text-3xl font-bold md:text-5xl">
              {recipe.strMeal}
            </h1>

             <div className="flex items-center gap-4">
            <p className="text-xl text-gold-400 mt-3">
              {recipe.strCategory} • {recipe.strArea}
            </p>

            {recipe.strCountry && (
              <p className="mt-3 text-xl text-cream">
                Country:{" "}
                <span className="text-gold-500">
                  {recipe.strCountry}
                </span>
              </p>
            )}

            {recipe.strTags && (
              <div className="mt-3 flex gap-2">
                <span className="text-cream">🏷️ Tags:</span>

                <div className="flex gap-2">
                  {recipe.strTags.split(",").map((tag) => (
                    <span key={tag} className="text-gold-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              )}
              </div>
          </div>
        </div>

        {/* This section shows all the ingredients needed for the recipe. */}
        <h2 className="mt-10 text-3xl font-bold text-gold-500">Ingredients</h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = recipe[`strIngredient${index + 1}`];
            const measure = recipe[`strMeasure${index + 1}`];

            // Skip empty ingredient values.
            if (!ingredient || ingredient.trim() === "") {
              return null;
            }

            return (
              <div
                key={index}
                className="rounded-lg bg-ink-800 p-3"
              >
                {ingredient} - {measure}
              </div>
            );
          })}
        </div>

        {/* This section shows the cooking steps for the recipe. */}
        <h2 className="mt-10 text-3xl font-bold text-gold-500">Instructions</h2>

        <p className="mt-5 whitespace-pre-line leading-8">{recipe.strInstructions}</p>

        {/* If a YouTube link exists, show a button to watch the recipe video. */}
        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-gold-500 px-6 py-3 font-semibold text-ink-900 transition hover:scale-105"
          >
            ▶ Watch Recipe Video
          </a>
        )}
      </div>
    </section>
  );
};

export default RecipeDetails;
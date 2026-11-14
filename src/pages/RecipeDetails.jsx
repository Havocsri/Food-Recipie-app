import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const RecipeDetails = () => {
  // This gets the recipe id from the URL.
  const { id } = useParams();

  // This stores the selected recipe details.
  const [recipe, setRecipe] = useState(null);

  //loading statement 
  const [loading, setLoading] = useState(true);

  // This runs when the recipe id changes.
  // It fetches one recipe from the API using its ID.
  useEffect(() => {
    const controller = new AbortController();
   
    const getRecipeDetails = async () => {
      
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



  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center">
          <div className="relative">
            {/* This is the big recipe image on the left side. */}
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="h-80 w-175 rounded-2xl cursor-pointer transition hover:translate-y-1 object-cover"
            />

            {/* Favorite button for the recipe */}
            <button className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg">
              <FaRegHeart />
            </button>
          </div>

          {/* This is the recipe name and extra details like category and area. */}
          <h1 className="text-3xl mb-25 font-bold md:text-5xl">
            {recipe.strMeal}

            <p className="mt-3 text-xl flex gap-7 text-gold-400">
              {recipe.strCategory} • {recipe.strArea}

              {recipe.strCountry && (
                <p className="text-cream text-xl">
                  Country :{" "}
                  <span className="text-gold-500">{recipe.strCountry}</span>
                </p>
              )}

              {recipe.strTags && (
                <div className="flex gap-1">
                  <p className="text-cream">🏷️ Tags :</p>

                  <div className="flex gap-2">
                    {recipe.strTags.split(",").map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </p>
          </h1>
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
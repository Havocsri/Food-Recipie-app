import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const RecipeDetails = () => {
  
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` );

      const data = await response.json();

      setRecipe(data.meals[0]);
    };

    getRecipeDetails();
  }, [id]);

  // API loading
  if (!recipe) {
    return (
      <div className="min-h-screen bg-ink-900 p-10 text-center text-cream">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">
      <div className="mx-auto max-w-8xl">
              <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center ">
                  

{/* Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className=" h-80 w-175 rounded-2xl cursor-pointer transition hover:translate-y-1 object-cover"/>

        {/* Recipe Name */}
        <h1 className="text-3xl mb-25 font-bold  md:text-5xl">
                      {recipe.strMeal}
                       {/* Category */}
        <p className="mt-3 text-xl text-gold-400">
          {recipe.strCategory} • {recipe.strArea}
        </p>
        </h1>
              </div>
              

        {/* Ingredients */}
        <h2 className="mt-10 text-3xl font-bold text-gold-500">
          Ingredients
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient =
              recipe[`strIngredient${index + 1}`];

            const measure =
              recipe[`strMeasure${index + 1}`];

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

        {/* Instructions */}
        <h2 className="mt-10 text-3xl font-bold text-gold-500">
          Instructions
        </h2>

        <p className="mt-5 whitespace-pre-line leading-8 ">
          {recipe.strInstructions}
        </p>

        {/* YouTube Video */}
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
import { useEffect, useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { FaRegHeart,FaHeart } from "react-icons/fa";

const RecipePage = () => {
  
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [Favorite, setFavorite] = useState([]);

 
  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    };

    getRecipes();
  }, [name]);

  const toggleFavorite = (event, id) => {
    event.stopPropagation();
    setFavorite((prev) =>
      prev.includes(id) ? prev.filter((favoriteId) => favoriteId != id) : [...prev, id]);
  };




  return (
    <section className="min-h-screen bg-ink-900 px-6 py-12 text-cream">

      <div className="mx-auto max-w-8xl">

        {/* Heading */}
        <h1 className="text-3xl flex gap-3  font-bold md:text-4xl">
          {name}
          <span className="text-gold-500 ">
            Recipes
          </span>
        </h1>

        <p className="mt-2 text-xl  text-muted">
          Explore delicious {name} recipes
        </p>

        {/* Recipes Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {recipes.map((recipe) => (
              <div     
              key={recipe.idMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="  overflow-hidden rounded-xl bg-ink-900 transition duration-300 border border-ink-900 hover:border-gold-400 hover:-translate-y-1"
            >
             <div className="relative">
              {/* Recipe Image */}
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-103"
              />
                <button onClick={(event) => toggleFavorite(event, recipe.idMeal) }
                  className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg" >
                   {Favorite.includes(recipe.idMeal) ? (<FaHeart className="text-red-500" /> ) : (<FaRegHeart />)}
               </button>
              </div>


              {/* Recipe Name */}
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
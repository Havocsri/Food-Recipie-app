import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
const SearchPage = () => {
    const { query } = useParams();

    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();
    const [Favorite, setFavorite] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const getRecipes = async () => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );

            const data = await response.json();

            setRecipes(data.meals || []);
        };

        getRecipes();
    }, [query]);

    const toggleFavorite = (event, id) => {
        event.stopPropagation();
        setFavorite((prev) =>
            prev.includes(id) ? prev.filter((favoriteId) => favoriteId != id) : [...prev, id]);
    };

    const handleCategory = async (category) => {
        setSelectedCategory(category);

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        const data = await response.json();

        setRecipes(data.meals || []);
    };

    return (
        <div className="mx-auto flex max-w-8xl bg-ink-900 gap-8 px-7 py-8">

            {/* LEFT SIDE - FILTER */}
            <aside className="w-64 rounded-xl text-xl p-10">
                <h2 className="text-2xl font-bold text-gray-400">
                    Filters :
                </h2>

                <div className="mt-6">
                    <h3 className="text-3xl font-semibold  text-gold-500">
                        Categories
                    </h3>

                    <button className="mt-3 block cursor-pointer text-cream" onClick={() => handleCategory("Chicken")}>
                        Chicken
                    </button>

                    <button className="mt-3 block cursor-pointer text-cream" onClick={() => handleCategory("Beef")}>
                        Beef
                    </button>

                    <button className="mt-3 block cursor-pointer text-cream " onClick={() => handleCategory("Dessert")}>
                        Dessert
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-3xl font-semibold text-gold-500">
                        Ingredients
                    </h3>

                    <button className="mt-3 block rounded-full   cursor-pointer text-cream">
                        Chicken
                    </button>

                    <button className="mt-3 block cursor-pointer text-cream">
                        Rice
                    </button>

                    <button className="mt-3 block cursor-pointer text-cream">
                        Tomato
                    </button>
                </div>
            </aside>

            {/* RIGHT SIDE - RECIPES */}
            <main className="flex-1">

                <h1 className="text-2xl text-cream font-bold">
                    Search Results for{" "}
                    <span className="text-gold-500">
                        {query}
                    </span>
                </h1>

                {recipes.length == 0 ? (
                    <p className="mt-8 text-red-600">
                        No recipes found
                    </p>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {recipes.map((recipe) => (
                            <div
                                key={recipe.idMeal}
                                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                                className="cursor-pointer overflow-hidden rounded-xl bg-ink-900 text-cream transition hover:-translate-y-1 relative"
                            >
                                <img
                                    src={recipe.strMealThumb}
                                    
                                    className="h-48 w-full object-cover"
                                />


                                <button onClick={(event) => toggleFavorite(event, recipe.idMeal)}
                                    className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg" >
                                    {Favorite.includes(recipe.idMeal) ? (<FaHeart className="text-red-500" />) : (<FaRegHeart />)}
                                </button>

                                <div className="p-4">
                                    <h2 className="font-bold">
                                        {recipe.strMeal}
                                    </h2>

                                    <p className="mt-2 text-sm text-gold-500">
                                        {selectedCategory || recipe.strCategory}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
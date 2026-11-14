import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const SearchPage = () => {
    // This page shows the recipes that match the user search.
    // The URL contains a parameter called "query".
    const { query } = useParams();

    // This keeps the list of matching recipes.
    const [recipes, setRecipes] = useState([]);

    // This helps us move to another page when a recipe card is clicked.
    const navigate = useNavigate();

    // This keeps the list of favorite recipe IDs.
    const [Favorite, setFavorite] = useState([]);

    // These are used for the category and ingredient filters.
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // This runs when the search word changes.
    // It fetches recipes from the MealDB API using the search .
    useEffect(() => {
        const getRecipes = async () => {
            try {
                setLoading(true);
                setError("");
                // Reset previous filter selection when searching
                setSelectedCategory("");
                setSelectedIngredient("");
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
                );


                if (!response.ok) {
                    throw new Error("Failed to search recipes");
                }

                const data = await response.json();

                // If no meals are found, show an empty list.
                setRecipes(data.meals || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        getRecipes();
    }, [query]);


    // This function adds or removes a recipe from favorite list.
    // It also stops the click from opening the recipe page when heart button is clicked.
    const toggleFavorite = (event, id) => {
        event.stopPropagation();
        setFavorite((prev) =>
            prev.includes(id) ? prev.filter((favoriteId) => favoriteId != id) : [...prev, id]
        );
    };

    // This function loads recipes by selected category.
    const handleCategory = async (category) => {
        try {
            setError("");
            setSelectedCategory(category);
            setSelectedIngredient("");
            setLoading(true);
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );

            if (!response.ok) {
                throw new Error("Failed to load category recipes");
            }

            const data = await response.json();
            setRecipes(data.meals || []);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // This runs once when the page loads.
    // It gets all category names from the API.
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
                );
                if (!response.ok) {
                    throw new Error("Failed to load categories");
                }


                const data = await response.json();
                setCategories(data.meals || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        getCategories();
    }, []);




    // This is a fixed list of ingredient buttons shown in the filter area.
    const ingredientList = [
        "Cheese",
        "egg",
        "Rice",
        "Tomato",
        "Potato",
    ];

    // This function loads recipes by selected ingredient.
    const handleIngredient = async (ingredient) => {
        try {
            setError("");
            setSelectedIngredient(ingredient);
            setSelectedCategory("");
            setLoading(true);

            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
            );
            if (!response.ok) {
                throw new Error("Failed to load ingredient recipes");
            }


            const data = await response.json();

            setRecipes(data.meals || []);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };



    // If data is still loading, show a loading animation.
    if (loading) {
        return (
            <div className=" h-100 flex items-center justify-center bg-ink-900">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-8xl bg-ink-900 gap-8 px-7 py-8">
            {/* LEFT SIDE - FILTER */}
            {/* This part shows the category and ingredient filters on the left side. */}
            <aside className="w-64 rounded-xl text-xl p-10">
                <h2 className="text-2xl font-bold bg-ink-800 rounded-full px-3 py-1 inline text-cream">
                    Filters :
                </h2>

                <div className="mt-6">
                    <h3 className="text-3xl font-semibold text-gold-500">
                        Categories
                    </h3>

                    {categories.map((category) => (
                        <button
                            key={category.strCategory}
                            onClick={() => handleCategory(category.strCategory)}
                            className={`mt-3 block cursor-pointer transition ${selectedCategory == category.strCategory ? "text-ink-900 bg-gold-500 rounded-full px-3"
                                : !selectedCategory &&
                                    !selectedIngredient && query?.toLowerCase() === category.strCategory.toLowerCase()
                                    ? "text-ink-900 bg-gold-500 rounded-full px-3"
                                    : "text-cream transition hover:translate-y-1"
                                }`}
                        >
                            {category.strCategory}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    <h3 className="text-3xl font-semibold text-gold-500">
                        Ingredients
                    </h3>

                    {ingredientList.map((ingredient) => (
                        <button
                            key={ingredient}
                            onClick={() => handleIngredient(ingredient)}
                            className={`mt-3 block cursor-pointer transition ${selectedIngredient === ingredient
                                    ? "text-ink-900 bg-gold-500 rounded-full px-3"
                                    : !selectedIngredient &&
                                        !selectedCategory &&
                                        query?.toLowerCase() === ingredient.toLowerCase()
                                        ? "text-ink-900 bg-gold-500 rounded-full px-3"
                                        : "text-cream transition hover:translate-y-1"
                                }`}
                        >
                            {ingredient}
                        </button>
                    ))}
                </div>
            </aside>

            {/* RIGHT SIDE - RECIPES */}
            {/* This part shows the recipe results on the right side. */}
            <main className="flex-1">
                <h1 className="text-2xl text-cream font-bold">
                    {selectedCategory ? (
                        <>
                            Category Results for{" "}
                            <span className="text-gold-500">{selectedCategory}</span>
                        </>
                    ) : selectedIngredient ? (
                        <>
                            Ingredient Results for{" "}
                            <span className="text-gold-500">{selectedIngredient}</span>
                        </>
                    ) : (
                        <>
                            Search Results for{" "}
                            <span className="text-gold-500">{query}</span>
                        </>
                    )}
                </h1>
                {error ? (
                    <p className="mt-8 text-4xl text-red-600 flex  justify-center">
                        {error}
                    </p>
                ) : recipes.length == 0 ? (
                    <p className="mt-8 text-3xl flex  justify-center text-red-600">No recipes found</p>
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

                                <button
                                    onClick={(event) => toggleFavorite(event, recipe.idMeal)}
                                    className="absolute right-3 top-3 rounded-full bg-cream cursor-pointer p-3 text-xl text-ink-900 shadow-lg"
                                >
                                    {Favorite.includes(recipe.idMeal) ? (
                                        <FaHeart className="text-red-500" />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </button>

                                <div className="p-4">
                                    <h2 className="font-bold">{recipe.strMeal}</h2>

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
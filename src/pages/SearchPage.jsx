
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

    // Load saved favorite recipes from localStorage 
    const [Favorite, setFavorite] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");

        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

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
            <div className="h-100 flex items-center justify-center bg-ink-900">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-8xl flex-col gap-5 bg-ink-900 px-3 py-5 sm:px-6 sm:py-8 lg:flex-row lg:gap-8 lg:px-7">

            {/* LEFT SIDE - FILTER */}
            {/* This part shows the category and ingredient filters on the left side. */}
            <aside className="w-full min-w-0 rounded-xl p-3 text-base sm:p-5 lg:w-64 lg:shrink-0 lg:p-10 lg:text-xl">

                <h2 className="inline rounded-full bg-ink-800 px-3 py-1 text-xl font-bold text-cream sm:text-2xl">
                    Filters :
                </h2>

                <div className="mt-4 sm:mt-5 lg:mt-6">
                    <h3 className="text-2xl font-semibold text-gold-500 sm:text-3xl">
                        Categories
                    </h3>

                    <div className="mt-2 flex gap-3 overflow-x-auto whitespace-nowrap pb-3 lg:mt-3 lg:flex-col lg:items-start lg:gap-0 lg:overflow-visible lg:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category.strCategory}
                                onClick={() => handleCategory(category.strCategory)}
                                className={`shrink-0 cursor-pointer transition lg:mt-3 lg:block ${selectedCategory == category.strCategory ? "text-ink-900 bg-gold-500 rounded-full px-3"
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
                </div>

                <div className="mt-3 sm:mt-5 lg:mt-8">
                    <h3 className="text-2xl font-semibold text-gold-500 sm:text-3xl">
                        Ingredients
                    </h3>

                    <div className="mt-2 flex gap-3 overflow-x-auto whitespace-nowrap pb-3 lg:mt-3 lg:flex-col lg:items-start lg:gap-0 lg:overflow-visible lg:pb-0">
                        {ingredientList.map((ingredient) => (
                            <button
                                key={ingredient}
                                onClick={() => handleIngredient(ingredient)}
                                className={`shrink-0 cursor-pointer transition lg:mt-3 lg:block ${selectedIngredient === ingredient
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
                </div>
            </aside>

            {/* RIGHT SIDE - RECIPES */}
            {/* This part shows the recipe results on the right side. */}
            <main className="min-w-0 flex-1">

                <h1 className="text-xl font-bold text-cream sm:text-2xl">
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
                    <p className="mt-8 flex justify-center text-center text-2xl text-red-600 sm:text-4xl">
                        {error}
                    </p>
                ) : recipes.length == 0 ? (
                    <p className="mt-8 flex justify-center text-center text-xl text-red-600 sm:text-3xl">
                        No recipes found
                    </p>
                ) : (
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-6 lg:grid-cols-3">

                        {recipes.map((recipe) => (
                            <div
                                key={recipe.idMeal}
                                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                                className="relative cursor-pointer overflow-hidden rounded-xl bg-ink-900 text-cream transition hover:-translate-y-1"
                            >
                                <img
                                    src={recipe.strMealThumb}
                                    className="h-52 w-full object-cover sm:h-48"
                                />

                                {/* Adds or removes this recipe from favorites without opening its details. */}
                                <button
                                    onClick={(event) => toggleFavorite(event, recipe)}
                                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-cream p-3 text-xl text-ink-900 shadow-lg"
                                >
                                    {Favorite.some(
                                        (item) => item.idMeal === recipe.idMeal
                                    ) ? (
                                        <FaHeart className="text-red-500" />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </button>

                                <div className="p-3 sm:p-4">
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

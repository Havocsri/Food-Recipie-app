import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
   const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php" , {signal:controller.signal}
        );

        if (!response.ok) {
          throw new Error("test error");
        }

        const data = await response.json();

        setCategories(data.categories);
      } catch (error) {
        if (error.name !="AbortError") {
          setError("Could not load categories . Please check your internet connection and try again.")
        }
      }
    };

    getCategories();
    return () => controller.abort();
  }, []);

  return (
    <section className=" bg-ink-900 px-6 py-9 text-cream">

      {/* Page Heading */}
      <div className="mx-auto  max-w-8xl">

        <h1 className="text-5xl flex justify-center gap-6 font-bold">
          All <span className="text-gold-500">Categories</span>
        </h1>

        <p className="mt-5 flex text-xl justify-center text-muted">
          Explore delicious recipes from around the world , discover new flavors , and find the perfect dish .
        </p>

        {error && <p className="mt-10  text-center text-red-400">{error}</p>}
        

        {/* Categories Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {categories.map((category) => (
            <div onClick={() => navigate(`/category/${category.strCategory}`)}
              key={category.idCategory}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 transition duration-300 hover:-translate-y-2 hover:border-gold-500" >

              {/* Category Image */}
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-103"
              />

              {/* Category Name */}
              <div className="p-4 text-center">

                <h2 className="text-lg font-semibold">
                  {category.strCategory}
                </h2>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;
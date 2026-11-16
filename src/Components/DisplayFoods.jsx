
import beef from '../assets/beef.png';
import chicken from '../assets/chicken.png';
import vegeterain from '../assets/vegeterian.png';
import dessert from '../assets/dessert.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Categories = () => {
  const Navigate = useNavigate();

  const categories = [
    {
      name: "Beef",
      image: beef,
    },
    {
      name: "Chicken",
      image: chicken,
    },
    {
      name: "Dessert",
      image: dessert,
    },
    {
      name: "Vegetarian",
      image: vegeterain,
    },
  ];

  return (
    <section className="bg-ink-900 px-4 py-6 text-cream sm:px-6 sm:py-8 lg:py-10">

      {/* Heading */}
      <div className="mx-auto max-w-8xl">

        <h2 className="text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
          Explore <span className="text-gold-500">Categories</span>
        </h2>

        <p className="mt-3 text-center text-base text-muted sm:mt-5 sm:text-xl lg:text-2xl">
          Discover delicious recipes from different categories
        </p>

        {/* Category Cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => Navigate(`/category/${category.name}`)}
              className="group cursor-pointer overflow-hidden rounded-xl bg-ink-900 transition duration-300 hover:-translate-y-2"
            >

              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-103 sm:h-44 lg:h-40"
              />

              <h3 className="flex items-center justify-between p-4 text-base font-semibold sm:text-lg">
                {category.name}
                <span className="rounded-full bg-gold-500 px-2 py-1 text-xl text-ink-900">
                  <FaArrowRight />
                </span>
              </h3>

            </div>
          ))}

        </div>

        <div className="mt-10 flex justify-center transition duration-300 hover:scale-97 sm:mt-12 lg:mt-15">
          <Link
            to="/categories"
            className="mt-2 flex items-center justify-center gap-3 rounded-full bg-gold-500 px-5 py-2 text-base font-bold text-ink-900 sm:text-lg lg:text-xl"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

      </div>

    </section>
  );
};

export default Categories;

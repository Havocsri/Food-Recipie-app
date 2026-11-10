import beef from '../assets/beef.png';
import chicken from '../assets/chicken.png';
import vegeterain from '../assets/vegeterian.png';
import dessert from '../assets/dessert.png';
import { Navigate, useNavigate } from 'react-router-dom';
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
    <section className="bg-ink-900 px-6 py-6 text-cream">

      {/* Heading */}
      <div className="mx-auto max-w-8xl">

        <h2 className="text-center text-3xl font-bold">
          Explore <span className="text-gold-500">Categories</span>
        </h2>

        <p className="mt-5 text-center text-2xl text-muted">
          Discover delicious recipes from different categories
        </p>

        {/* Category Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">

          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => Navigate(`/category/${category.name}`)}
              className="group cursor-pointer overflow-hidden rounded-xl bg-ink-900 transition duration-300 hover:-translate-y-2"
            >

              <img
                src={category.image}
                alt={category.name}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-103"
              />

              <h3 className="p-4 text-center flex justify-between text-lg font-semibold">
                      {category.name}
                        <span className="text-xl px-2 text-ink-900 bg-gold-500 rounded-full  py-1">
                         < FaArrowRight/>
                        </span>
                  </h3>
                  
              </div>
              
          ))}
                 
        </div>
                     <div className=' flex justify-center transition duration-300  hover:scale-97' >
                      <Link to="/categories" className='flex gap-3 mt-15 px-5 py-1 font-bold bg-gold-500 rounded-full text-xl  text-ink-900 items-center justify-center'>View All< FaArrowRight/></Link>
                     </div>
      </div>

    </section>
  );
};

export default Categories;
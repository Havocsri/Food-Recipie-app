import Home from "./pages/Home"
import NavBar from "./Components/NavBar"
import { Route, Routes } from "react-router-dom"
import Categories from "./pages/Catogories"
 import Footer from "./Components/Footer";
import RecipePage from "./pages/RecipePage"
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/FavoritePage"
import SearchPage from "./pages/SearchPage";



function App() {


  return (
    <>
      <NavBar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:name" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
        <Footer></Footer>
      

    </>
  )
}

export default App

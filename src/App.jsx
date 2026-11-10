import Home from "./pages/Home"
import NavBar from "./Components/NavBar"
import { Route, Routes } from "react-router-dom"
import Categories from "./pages/Catogories"
import Footer from "./Components/Footer"
import RecipePage from "./pages/RecipePage"
import RecipeDetails from "./pages/RecipeDetails";



function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:name" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />}/>
        </Routes>
        <Footer></Footer>
       
     </>
  )
}

export default App

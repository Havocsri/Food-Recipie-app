import Home from "./pages/Home"
import NavBar from "./Components/NavBar"
import { Route, Routes } from "react-router-dom"
import Categories from "./pages/Catogories"
import Footer from "./Components/Footer"




function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
         <Route path="/categories" element={<Categories/>}  />

       </Routes>

         <Footer></Footer>
       
     </>
  )
}

export default App

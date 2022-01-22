import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './Nav';
import About from './Components/About';
import Home from './Components/Home';
import Tweets from './Components/Tweets';
import TAPI from "./Components/TAPI";


function App() {
  return <BrowserRouter>
  <Nav />
  <Routes>
   
  <Route path= "/"  element={<Home />} />
  <Route path= "/about"  element={<About  />} />
  <Route path= "/tweets"  element={<Tweets />} />
  <Route path = "/tapi" element={<TAPI />} />

   </Routes>
  
  </BrowserRouter>;
}

export default App;

import React, { createContext, useEffect, useState } from "react" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./Home"
import NavBar from "./NavBar"
import Footer from "./Footer"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import Products from "./Products"
import Login from "./Login";
import Register from "./Register";
import axios from 'axios'
import CreateProducts from "./CreateProducts";
import ProductIndividual from "./ProductIndividual";
import Profile from "./Profile";
import {Helmet} from "react-helmet";
import People from "./People";
import PeopleIndividual from "./PeopleIndividual";

export const userContext = createContext() 

function App() {

  const [user, setUser] = useState({}) // use this 

axios.defaults.withCredentials = true;

useEffect(() => {
  axios.get('https://iloilo-coffee-house-api.vercel.app/')
    .then(user => {
      setUser(user.data);
      console.log(user.data);
    })
    .catch(err => console.log(err));
}, []);

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Iloilo Coffee House</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <meta name="description" content="Helmet application" />
    </Helmet>

    <userContext.Provider value={user}>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/createproducts" element={<CreateProducts/>} />
        <Route path="/products/:id" element={<ProductIndividual/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/people" element={<People/>} />
        <Route path="/people/:id" element={<PeopleIndividual/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </userContext.Provider>
    </>
  )
}

export default App

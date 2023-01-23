import React from 'react';
import '../resources/styles/App.css';

import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";
import About from "./About";
import Transliterate from "./Transliterate";
import Acknowledgement from "./Acknowledgement";

function App() {

  return (
    <>
        <NavbarMenu />
        <div className="container" style={{backgroundColor: '#161617'}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/transliterate" element={<Transliterate />} />
                <Route path="/acknowledgement" element={<Acknowledgement />} />
            </Routes>
        </div>
    </>
  );
}

export default App;


import React, {useEffect} from 'react';
import '../resources/styles/App.scss';

import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";
import About from "./About";
import Acknowledgement from "./Acknowledgement";
import Contacts from "./Contacts";
import WebFont from 'webfontloader';

function App() {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Noto+Sans+Palmyrene:400,700&display=swap']
            }
        });
    }, []);


    return (
    <>
        <NavbarMenu />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/acknowledgement" element={<Acknowledgement />} />
            </Routes>
        </div>
    </>
  );
}

export default App;


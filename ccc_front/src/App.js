// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./js/utils/Layout";
import Home from "./js/pages/Home";
import About from "./js/pages/About";
import AddUrl from "./js/pages/AddUrl";
import Urls from "./js/pages/Urls";

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/addurl" element={<AddUrl />} />
                    <Route exact path="/urls" element={<Urls />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;

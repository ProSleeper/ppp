// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./js/utils/Layout";
import Home from "./js/pages/Home";
import AddUrl from "./js/pages/Add_url";
import VAUrls from "./js/pages/VA_url";

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/add_url" element={<AddUrl />} />
                    <Route exact path="/va_url" element={<VAUrls />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;

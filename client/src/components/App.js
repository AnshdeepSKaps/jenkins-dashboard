import React from 'react'
import Jobs from '../Pages/Jobs'
import Links from '../Pages/Links';
// import Navbar from './Navbar'
// import base64 from 'react-native-base64'
// 

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/links" element={<Links />} />
                <Route path="/" element={<Jobs />} />
            </Routes>
        </BrowserRouter >
    )
}

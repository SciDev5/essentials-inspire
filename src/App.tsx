import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./pages/_routing/AllRoutes";

export default function App() {


    return (
        <BrowserRouter>
            <AllRoutes/>
        </BrowserRouter>
    );
}

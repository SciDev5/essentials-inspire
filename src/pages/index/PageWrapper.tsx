import React from "react";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../_routing/AllRoutes";

export default function PageWrapper() {
    return (
        <>
            <nav>
                <Link to="/">Essential Inspire</Link>
            </nav>
            <Link to={"/"+routes.flappyBad}>Flappybad</Link>
            <Outlet/>
        </>
    );
}
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageWrapper from "../index/PageWrapper";
import Pages from "./Pages";

export const routes = {
    flappyBad: "flappy",
} as const;



export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PageWrapper/>}>
                <Route path={routes.flappyBad} element={<Pages.FlappyBad/>} />
            </Route>
        </Routes>
    );
}
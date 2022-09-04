import React from "react";
import { Route, Routes } from "react-router-dom";
import PageWrapper from "../index/PageWrapper";
import Pages from "./Pages";

export const routes = {
    flappyBad: "flappy",
    qrMaker: "qrmake",
    qrDataViewLink: "ql/:type/:data/:isBinary",
} as const;

export const baseURI = process.env.PUBLIC_URL || window.location.origin;


export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PageWrapper/>}>
                <Route path={routes.flappyBad} element={<Pages.FlappyBad/>} />
                <Route path={routes.qrMaker} element={<Pages.QRMaker/>} />
                <Route path={routes.qrDataViewLink} element={<Pages.QRGeneratedLink/>} />
            </Route>
        </Routes>
    );
}
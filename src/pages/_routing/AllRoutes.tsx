import React from "react";
import { Route, Routes } from "react-router-dom";
import PageWrapper from "../index/PageWrapper";
import Pages from "./Pages";

export const routes = {
    flappybird: "flappy",
    tetris: "tetris",
    mahtTrainer: "matht",
    algebraExecutor: "al-ex",
    qrMaker: "qrmake",
    qrDataViewLink: "ql/:type/:data/:isBinary",
    cTool:"ctool",
} as const;

export const baseURI = process.env.PUBLIC_URL || window.location.origin;


export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PageWrapper/>}>
                <Route path={routes.flappybird} element={<Pages.FlappyBad/>} />
                <Route path={routes.qrMaker} element={<Pages.QRMaker/>} />
                <Route path={routes.qrDataViewLink} element={<Pages.QRGeneratedLink/>} />
                <Route path={routes.tetris} element={<Pages.Tertis/>} />
                <Route path={routes.mahtTrainer} element={<Pages.MahtTraienr/>} />
                <Route path={routes.algebraExecutor} element={<Pages.AlgebraExecutor/>} />
                <Route path={routes.cTool} element={<Pages.CTool/>} />
            </Route>
        </Routes>
    );
}
import { css } from "@emotion/css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../_routing/AllRoutes";

export default function PageWrapper() {
    return (
        <>
            <nav className={css({
                display:"flex",
                borderBottom: "1px solid",
                lineHeight: "2em",
                "> a": {
                    paddingInline: ".5em",
                    textDecoration: "none",
                    color: "inherit",
                    borderInlineEnd: "1px solid",
                    "&:hover": {
                        backgroundColor: "#000000",
                        color: "#ffffff",
                    },
                },
            })}>
                <Link to="/">Essential Inspire</Link>
                <Link to={"/"+routes.flappyBad}>Flappybad</Link>
                <Link to={"/"+routes.qrMaker}>QRMaker</Link>
            </nav>
            <Outlet/>
        </>
    );
}
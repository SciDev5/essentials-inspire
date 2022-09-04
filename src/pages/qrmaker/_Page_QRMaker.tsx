import React from "react";
import QRDataEmbed from "./QRDataEmbed";
import QRLinkEmbed from "./QRLinkEmbed";

export default function _Page_QRMaker() {
    return (
        <div>
            <h1>qr code maker</h1>
            <QRLinkEmbed/>
            <QRDataEmbed/>
        </div>
    );
}
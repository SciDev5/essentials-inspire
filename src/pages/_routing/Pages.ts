import _Page_FlappyBad from "../flappy-bad/_Page_FlappyBad";
import _Page_QRDataView from "../qrmaker/_Page_QRDataView";
import _Page_QRMaker from "../qrmaker/_Page_QRMaker";

const Pages = {
    FlappyBad: _Page_FlappyBad,
    QRMaker: _Page_QRMaker,
    QRGeneratedLink: _Page_QRDataView,
} as const;
export default Pages;
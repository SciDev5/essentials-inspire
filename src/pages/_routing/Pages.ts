import _Page_AlgebraExecutor from "../algebra-executor/_Page_AlgebraExecutor";
import _Page_CTool from "../ctool/_Page_CTool";
import _Page_FlappyBad from "../flappy-bad/_Page_FlappyBad";
import _Page_MahtTrainer from "../maht-trainer/_Page_MahtTrainer";
import _Page_QRDataView from "../qrmaker/_Page_QRDataView";
import _Page_QRMaker from "../qrmaker/_Page_QRMaker";
import _Page_Tertis from "../tertis/_Page_Tertis";

const Pages = {
    FlappyBad: _Page_FlappyBad,
    Tertis: _Page_Tertis,
    QRMaker: _Page_QRMaker,
    QRGeneratedLink: _Page_QRDataView,
    MahtTraienr: _Page_MahtTrainer,
    AlgebraExecutor: _Page_AlgebraExecutor,
    CTool: _Page_CTool,
} as const;
export default Pages;
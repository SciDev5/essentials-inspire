export default function minimalURIEncode(str:string) {
    return str.replace(/[!@#$%&+/]/g,v=>{
        const k = v.charCodeAt(0).toString(16);
        return "%"+["00","0"+k,k][k.length];
    });
}
import JSZip from "jszip";
export default async function downloadZip(zip:JSZip, name:string) {

    const blob = await zip.generateAsync({
        type:"blob",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = name.trim() + (name.trim().endsWith(".zip") ? "" : ".zip");
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
}
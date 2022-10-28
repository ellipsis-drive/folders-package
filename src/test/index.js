import { EllipsisDrive } from "../lib";


let cb = (layer) => {
    console.log("Clicked on layer:");
    console.log(layer);
};

let div = document.getElementById("test");

let options = {
    div: div, 
    cb: cb,
    searchIncludeFolders: true,
    showVector: true,
    showRaster: true,
    allowExpandMaps: true
}

let myDrive = new EllipsisDrive(options);
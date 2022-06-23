import { EllipsisDrive } from "../lib";


let cb = (map, layer) => {
    console.log("I am a callback!");
    console.log(map);
    console.log(layer);
};

let div = document.getElementById("test");

let options = {
    div: div, 
    cb: cb,
    searchIncludeFolders: true,
    showVector: true,
    showRaster: true,
}

let myDrive = new EllipsisDrive(options);
import { EllipsisDrive } from "../lib";


let cb = (block) => {
    console.log("I am a callback!");
    console.log(block);
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
import { EllipsisDrive } from "../lib";


let cb = (block) => {
    console.log("I am a callback!");
    console.log(block);
};

let div = document.getElementById("test");
let myDrive = new EllipsisDrive({ div: div, cb: cb });
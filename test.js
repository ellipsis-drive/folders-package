import Drive from './index.js';

let cb = (block) => {
    console.log("I am a callback!");
    console.log(block);
} 

let div = document.getElementById("test");
let myDrive = new Drive({div: div, callback: cb});
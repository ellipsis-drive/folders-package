### Ellipsis Drive Folder package

This package allows you to easily use Ellipsis Drive on your website.

![Gif of the folders package](https://github.com/ellipsis-drive/folders-package/blob/main/img/folders.gif)

### Installing the folder package

All releases of this package are listed in the release list on github here. To install this library, simply find the latest .js file in there, and put it in the directory of your project.

### Importing the package

With script tags

NPM is coming

### Using the package

Import the folders package. Construct a Drive object, passing an object as paramater containing two variables:

1. "div", an HTML element where the folder browser should be displayed in
2. "cb", the callback function to be called when a block is clicked

An example:

test.html

    <html>
        <head>
            <script type="module" src="test.js">
            </script>
        </head>
        <body>
            <div id="test">
            </div>
        </body>
    </html>

test.js

    import Drive from './folders.js';

    let cb = (block) => {
    console.log("I am a callback!");
    console.log(block);
    }

    let div = document.getElementById("test");
    let myDrive = new Drive({div: div, callback: cb});

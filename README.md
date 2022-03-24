### Ellipsis Drive Folder package

This package allows you to easily use Ellipsis Drive on your website.

![Gif of the folders package in action](https://github.com/ellipsis-drive/folders-package/blob/main/img/folders.gif)

### Installing the folder package

All releases of this package are listed in the release list on github here. To install this library, simply find the latest .js file in there, and put it in the directory of your project.

### Importing the package

This will be added later.

### Using the package

Place folders.js in your project directory. Construct an EllipsisDrive object, passing an object as paramater containing two or three variables:

1. "div", an HTML element where the folder browser should be displayed in.
2. "cb" (semi-optional), the callback function to be called when a block is clicked. A default callback is provided, but please provide your own.
3. "token" (optional), the (Ellipsis) api token to be used.

If no token is provided, the user will be prompted to log in. The user will be redirected to Ellipsis Drive, and, after succesfully loging in, will be returned to the current page.

![Image of the log in prompt](https://github.com/ellipsis-drive/folders-package/blob/main/img/login.png)

An example of the package:

test.html

```html
<html>
  <head>
    <script src="https://raw.githubusercontent.com/ellipsis-drive/folders-package/npm-support/build/ellipsis-folders.js"></script>
  </head>
  <body>
    <div id="test"></div>
    <script>
      let cb = (block) => {
        console.log("I am a callback!");
        console.log(block);
      };
      let div = document.getElementById("test");
      let myDrive = new EllipsisDrive({ div: div, cb: cb });
    </script>
  </body>
</html>
```

### Ellipsis Drive Folder package

This package allows you to display a minified Ellipsis Drive file system in your app. This is needed if you wish to enable users to browse and load their Ellipsis Drive content on a map within your app.

![Gif of the folders package in action](https://github.com/ellipsis-drive/folders-package/blob/main/img/ellipsis_drive_demo.gif)

### Installing the folder package

All releases of this package are listed in the release list on github here. To install this library, simply find the latest .js file in there, and put it in the directory of your project.

### Using the package

Place folders.js in your project directory. Construct an EllipsisDrive object, passing an object as paramater containing the following properties:

1. "div", an HTML element where the folder browser should be displayed in.
2. "cb" (semi-optional), the callback function to be called when a layer is clicked. The callback will receive all relevant metadata of the layer that was clicked. The callback can be used to for example load the layer on a map within the app or any other relevant action.
3. "token" (optional), the (Ellipsis) api token to be used.
4. "showRaster" (optional, default true), determines whether raster layers should be displayed.
5. "showVector" (optional, default true), determines whether vector layers should be displayed.
6. "searchIncludeFolders" (optional, default true), determines whether search results should include folders or not.
7. "onLogInClick" (optional), a function to handle what happens if the user wishes to authenticate. The onLogInClick can be used to use the OAuth authorize call. To setup OAuth follow the steps as listed [here](https://docs.ellipsis-drive.com/developers/api-v3/oauth).

If no token is provided, the user will be prompted to log in. In case no "onLogInClick" is provided. The user will be redirected to Ellipsis Drive, and, after succesfully loging in, will be returned to the current page.

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
      let cb = (layer) => {
        console.log("Clicked on layer:");
        console.log(layer);
      };
      let div = document.getElementById("test");
      let myDrive = new EllipsisDrive({ div: div, cb: cb });
    </script>
  </body>
</html>

```

### Aftermath
After the user clicked a layer you most likely want to display the layer in question on a map. To do so you can use one of the packages listed [here](https://github.com/ellipsis-drive). The package to choose depends on the map library you use (for example mapLibre or Leaflet). In case you do not wish to use these packages you can use standard protocols such as [XYZ](https://docs.ellipsis-drive.com/developers/api-v3/path-raster/timestamps/tile-service) or [vector tiles](https://docs.ellipsis-drive.com/developers/api-v3/ogc-protocols/mvt) to stream the layer in your app.

### Directing to Ellipsis Drive
If you need the user to perform some action within the Ellipsis Drive app you can redirect to the relevant url with (?token={the user token}) in the url. This will ensure the user will be correctly logged in when landing in Ellipsis Drive.

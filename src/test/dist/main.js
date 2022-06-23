/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/EllipsisBlock.js":
/*!**********************************!*\
  !*** ./src/lib/EllipsisBlock.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass EllipsisBlock {\n    type = undefined;\n    name = undefined;\n    id = undefined;\n    layers = undefined;\n    showExpanded = false;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EllipsisBlock);\n\n//# sourceURL=webpack://ellipsis-folders/./src/lib/EllipsisBlock.js?");

/***/ }),

/***/ "./src/lib/EllipsisDrive.js":
/*!**********************************!*\
  !*** ./src/lib/EllipsisDrive.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _EllipsisBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EllipsisBlock.js */ \"./src/lib/EllipsisBlock.js\");\n/* harmony import */ var _EllipsisFolder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EllipsisFolder.js */ \"./src/lib/EllipsisFolder.js\");\n\n\n\nclass EllipsisDrive {\n  BLUE = \"#089EC8\";\n  GRAY = \"rgba(0, 0, 0, 0.87)\";\n  SVGGRAY = \"rgba(0, 0, 0, 0.54)\";\n\n  APIURL = \"https://api.ellipsis-drive.com/v1\";\n\n  DEPTHFACTOR = 30;\n  DEPTHCONSTANT = 0;\n\n  debounce = (func, timeout = 300) => {\n    let timer;\n    return (...args) => {\n      clearTimeout(timer);\n      timer = setTimeout(() => {\n        func.apply(this, args);\n      }, timeout);\n    };\n  };\n\n  arrowDown = (depth = 0) => {\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M7 10l5 5 5-5z\"></path></svg>`;\n    svg1.style.fill = this.SVGGRAY;\n    svg1.style.height = \"15px\";\n    svg1.style.width = \"15px\";\n    svg1.style.cursor = \"pointer\";\n    svg1.style.transition = \"transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms\";\n    svg1.style.marginLeft = `${\n      this.DEPTHCONSTANT + this.DEPTHFACTOR * depth\n    }px`;\n    svg1.classList.add(\"ellipsis-folder-arrow-down\");\n    return svg1;\n  };\n\n  arrowRight = (depth = 0) => {\n    let elem = this.arrowDown(depth);\n    elem.classList.remove(\"ellipsis-folder-arrow-down\");\n    elem.classList.add(\"ellipsis-folder-arrow-right\");\n    elem.style.transform = \"rotate(-90deg)\";\n    return elem;\n  };\n\n  refreshSVG = (depth = 0) => {\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.innerHTML = `\n      <svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" enable-background=\"new 0 0 65 65\" y=\"0px\" x=\"0px\" viewBox=\"0 0 65 65\">\n        <path d=\"m32.5 4.999c-5.405 0-10.444 1.577-14.699 4.282l-5.75-5.75v16.11h16.11l-6.395-6.395c3.18-1.787 6.834-2.82 10.734-2.82 12.171 0 22.073 9.902 22.073 22.074 0 2.899-0.577 5.664-1.599 8.202l4.738 2.762c1.47-3.363 2.288-7.068 2.288-10.964 0-15.164-12.337-27.501-27.5-27.501z\"/>\n        <path d=\"m43.227 51.746c-3.179 1.786-6.826 2.827-10.726 2.827-12.171 0-22.073-9.902-22.073-22.073 0-2.739 0.524-5.35 1.439-7.771l-4.731-2.851c-1.375 3.271-2.136 6.858-2.136 10.622 0 15.164 12.336 27.5 27.5 27.5 5.406 0 10.434-1.584 14.691-4.289l5.758 5.759v-16.112h-16.111l6.389 6.388z\"/>\n      </svg>`;\n    svg1.style.height = \"15px\";\n    svg1.style.width = \"15px\";\n    svg1.style.cursor = \"pointer\";\n    svg1.setAttribute(\"viewBox\", \"0 0 24 24\");\n    svg1.style.fill = this.BLUE;\n    //svg1.style.marginLeft = this.DEPTHFACTOR * depth;\n    return svg1;\n  };\n\n  getFolderSVG = (id, depth = 0) => {\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.style.height = \"23px\";\n    svg1.style.width = \"23px\";\n    svg1.style.position = \"relative\";\n    svg1.style.bottom = \"5px\";\n    svg1.style.fill = this.SVGGRAY;\n    svg1.style.cursor = \"pointer\";\n    svg1.style.marginLeft = `${\n      this.DEPTHCONSTANT + this.DEPTHFACTOR * depth + 10\n    }px`;\n    svg1.style.float = \"left\";\n    svg1.classList.add(\"ellipsis-folder-icon\");\n\n    switch (id) {\n      case \"myMaps\":\n        svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.09 5.37516C10.71 4.99516 10.2 4.78516 9.67 4.78516H4.5C3.4 4.78516 2.51 5.68516 2.51 6.78516L2.5 18.7852C2.5 19.8852 3.4 20.7852 4.5 20.7852H20.5C21.6 20.7852 22.5 19.8852 22.5 18.7852V8.78516C22.5 7.68516 21.6 6.78516 20.5 6.78516H12.5L11.09 5.37516ZM15.502 16.8819C14.7572 16.8818 14.0374 16.6134 13.4745 16.1257C12.9116 15.6381 12.5433 14.9641 12.4372 14.227H15.502V13.3459H12.4372C12.5136 12.8141 12.727 12.3113 13.0566 11.8869C13.3862 11.4626 13.8205 11.1313 14.317 10.9256C14.8135 10.7199 15.355 10.6469 15.8882 10.7138C16.4214 10.7807 16.9281 10.9852 17.3583 11.3072L18.0025 10.6632C17.4141 10.192 16.7045 9.89662 15.9555 9.81103C15.2065 9.72545 14.4485 9.85315 13.769 10.1794C13.0894 10.5057 12.5158 11.0173 12.1144 11.6552C11.713 12.2932 11.5 13.0315 11.5 13.7852C11.5 14.5388 11.713 15.2772 12.1144 15.9151C12.5158 16.553 13.0894 17.0646 13.769 17.3909C14.4485 17.7172 15.2065 17.8449 15.9555 17.7593C16.7045 17.6737 17.4141 17.3783 18.0025 16.9071L17.3583 16.2632C16.8232 16.6655 16.1716 16.8827 15.502 16.8819ZM17.9847 15.6338C18.3836 15.1005 18.5989 14.4524 18.5983 13.7865C18.5996 13.1212 18.3854 12.4735 17.9878 11.9401C17.9861 11.9379 17.9852 11.9353 17.9852 11.9325C17.9852 11.9298 17.9861 11.9271 17.9878 11.925L18.6125 11.2983C18.6136 11.297 18.615 11.2961 18.6165 11.2954C18.618 11.2947 18.6197 11.2944 18.6214 11.2944C18.623 11.2944 18.6247 11.2947 18.6262 11.2954C18.6277 11.2961 18.6291 11.297 18.6302 11.2983C19.1934 12.0058 19.5 12.8832 19.5 13.7874C19.5 14.6915 19.1934 15.569 18.6302 16.2764C18.6291 16.2777 18.6277 16.2787 18.6262 16.2794C18.6247 16.28 18.623 16.2804 18.6214 16.2804C18.6197 16.2804 18.618 16.28 18.6165 16.2794C18.615 16.2787 18.6136 16.2777 18.6125 16.2764L17.9847 15.6489C17.983 15.6467 17.9821 15.6441 17.9821 15.6413C17.9821 15.6386 17.983 15.6359 17.9847 15.6338Z\"></path></svg>`;\n        break;\n      case \"shared\":\n        svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z\"></path></svg>`;\n        break;\n      case \"favorites\":\n        svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2.06 11L15 15.28 12.06 17l.78-3.33-2.59-2.24 3.41-.29L15 8l1.34 3.14 3.41.29-2.59 2.24.78 3.33z\"></path></svg>`;\n        break;\n      default:\n        svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\"></path></svg>`;\n    }\n    return svg1;\n  };\n\n  getVectorSVG = (depth) => {\n    let div = document.createElement(\"div\");\n    div.style.backgroundColor = \"#3F51B5\";\n    div.style.borderRadius = \"50%\";\n    div.style.height = \"20px\";\n    div.style.width = \"20px\";\n    div.style.alignItems = \"center\";\n    div.style.display = \"flex\";\n    div.style.float = \"left\";\n    div.style.marginLeft = \"10px\";\n\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.style.height = \"15px\";\n    svg1.style.cursor = \"pointer\";\n    svg1.style.float = \"left\";\n    svg1.classList.add(\"ellipsis-vector-icon\");\n    svg1.innerHTML = `<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"draw-polygon\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path fill=\"#FFFFFF\" d=\"M384 352c-.35 0-.67.1-1.02.1l-39.2-65.32c5.07-9.17 8.22-19.56 8.22-30.78s-3.14-21.61-8.22-30.78l39.2-65.32c.35.01.67.1 1.02.1 35.35 0 64-28.65 64-64s-28.65-64-64-64c-23.63 0-44.04 12.95-55.12 32H119.12C108.04 44.95 87.63 32 64 32 28.65 32 0 60.65 0 96c0 23.63 12.95 44.04 32 55.12v209.75C12.95 371.96 0 392.37 0 416c0 35.35 28.65 64 64 64 23.63 0 44.04-12.95 55.12-32h209.75c11.09 19.05 31.49 32 55.12 32 35.35 0 64-28.65 64-64 .01-35.35-28.64-64-63.99-64zm-288 8.88V151.12A63.825 63.825 0 0 0 119.12 128h208.36l-38.46 64.1c-.35-.01-.67-.1-1.02-.1-35.35 0-64 28.65-64 64s28.65 64 64 64c.35 0 .67-.1 1.02-.1l38.46 64.1H119.12A63.748 63.748 0 0 0 96 360.88zM272 256c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16-16-7.18-16-16zM400 96c0 8.82-7.18 16-16 16s-16-7.18-16-16 7.18-16 16-16 16 7.18 16 16zM64 80c8.82 0 16 7.18 16 16s-7.18 16-16 16-16-7.18-16-16 7.18-16 16-16zM48 416c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16-16-7.18-16-16zm336 16c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16z\"></path></svg>`;\n    div.appendChild(svg1);\n    return div;\n  };\n\n  getRasterSVG = (depth) => {\n    let div = document.createElement(\"div\");\n    div.style.backgroundColor = \"#00796B\";\n    div.style.borderRadius = \"50%\";\n    div.style.height = \"20px\";\n    div.style.width = \"20px\";\n    div.style.alignItems = \"center\";\n    div.style.display = \"flex\";\n    div.style.float = \"left\";\n    div.style.marginLeft = \"10px\";\n\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.style.height = \"15px\";\n    svg1.style.fill = \"#FFFFFF\";\n    svg1.style.cursor = \"pointer\";\n    svg1.style.float = \"left\";\n    svg1.classList.add(\"ellipsis-raster-icon\");\n    svg1.innerHTML = `<svg focusable=\"false\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z\"></path></svg>`;\n    div.appendChild(svg1);\n    return div;\n  };\n\n  authError = false;\n\n  defaultSettings = {\n    loggedIn: false,\n    token: null,\n    types: \"\",\n    cb: (data) => {\n      console.log(\n        \"Default callback is called, please provide your own callback!\"\n      );\n    },\n    icon: \"default\",\n    div: null,\n    showRaster: true,\n    showVector: true,\n    searchIncludeFolders: true,\n  };\n\n  settings = {};\n\n  constructor(options = {}) {\n    // root of the folder structure\n    this.root = {\n      name: \"ellipsis-folder-root\",\n      text: \"ellipsis-folder-root\",\n      id: \"ellipsis-folder-root\",\n      trueRoot: true,\n      showExpanded: true,\n      foldersExpanded: true,\n      folders: [\n        new _EllipsisFolder_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"My Drive\", \"myMaps\", \"myMaps\", 0, true),\n        new _EllipsisFolder_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Shared with me\", \"shared\", \"shared\", 0, true),\n        new _EllipsisFolder_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Favorites\", \"favorites\", \"favorites\", 0, true),\n      ],\n      blocks: [],\n    };\n\n    console.log(this.defaultSettings)\n    console.log(options)\n\n    this.settings = { ...this.defaultSettings, ...options };\n\n    this.searching = false;\n    this.activeSearch = false;\n    this.searchString = \"\";\n\n    this.searchResults = [];\n\n    if (!(\"div\" in options)) {\n      console.warn(\"EllipsisDrive: no div is provided!\");\n      return;\n    }\n\n    if (\"token\" in options) {\n      this.settings.token = options.token;\n      this.settings.loggedIn = true;\n    } else {\n      // find out if there's a token for us in the url\n      const queryString = window.location.search;\n      const urlParams = new URLSearchParams(queryString);\n      if (urlParams.has(\"token\")) {\n        this.settings.token = urlParams.get(\"token\");\n        this.settings.loggedIn = true;\n      }\n    }\n\n    this.searchBarDiv = this.getSearchBar();\n    this.normalDiv = document.createElement(\"div\");\n\n    this.searchBarDiv.setAttribute(\"id\", \"ellipsis-drive-searchbar\");\n    this.normalDiv.setAttribute(\"id\", \"ellipsis-drive-explorer\");\n\n    this.settings.div.style.backgroundColor = \"#f5f5f5\";\n    this.settings.div.style.overflow = \"scroll\";\n\n    this.settings.div.appendChild(this.searchBarDiv);\n    this.settings.div.appendChild(this.normalDiv);\n\n    console.log(\"TESTTESTTEST\");\n    console.log(this.settings);\n\n    this.render();\n  }\n\n  bouncingOnClick = (folder, input) => {\n    folder.showExpanded = !folder.showExpanded;\n    this.render();\n  };\n\n  onClick = this.debounce(this.bouncingOnClick, 100);\n\n  p = (str, depth = 0) => {\n    let elem = document.createElement(\"p\");\n    elem.innerText = str;\n    elem.style.paddingLeft = `${\n      this.DEPTHCONSTANT + this.DEPTHFACTOR * depth + 40\n    }px`;\n    elem.classList.add(\"ellipsis-folder-p\");\n    elem.style.fontFamily = `\"Roboto Condensed\",\"Roboto\",\"Helvetica\",\"Lucida Sans Unicode\",\"sans-serif\"`;\n    return elem;\n  };\n\n  /**\n   * @param {EllipsisFolder}\n   * @param {string} either \"folder\" or \"map\"\n   */\n  getListFolder = async (folder, type = \"folder\", isRoot = false) => {\n    let url = \"\";\n    url = isRoot\n      ? `${this.APIURL}/path/listRoot`\n      : `${this.APIURL}/path/listFolder`;\n\n    let params = {\n      root: folder.id,\n      pathId: folder.id,\n      type: type,\n    };\n\n    let headers = {\n      \"Content-Type\": \"application/json\",\n      Authorization: `Bearer ${this.settings.token}`,\n    };\n\n    let request = await fetch(url, {\n      method: \"POST\",\n      body: JSON.stringify(params),\n      headers: headers,\n    });\n\n    return request.json();\n  };\n\n  fixFolder = (inputFolder) => {\n    // we might also just return inputFolder but add the 'text' field\n    let folder = new _EllipsisFolder_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    folder.name = inputFolder.name;\n    folder.id = inputFolder.id;\n    folder.text = inputFolder.name;\n    folder.obj = inputFolder;\n    return folder;\n  };\n\n  fixBlock = (inputBlock) => {\n    let block = new _EllipsisBlock_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    block.type = inputBlock.type;\n    block.id = inputBlock.id;\n    block.name = inputBlock.name;\n    block.obj = inputBlock;\n    if (block.type == \"map\") {\n      block.layers = inputBlock.mapLayers;\n    } else {\n      block.layers = inputBlock.geometryLayers; //check\n    }\n    return block;\n  };\n\n  expandFolder = (folder) => {\n    folder.foldersExpanded = true;\n    let isRoot = folder.root;\n    let folders = this.getListFolder(folder, \"folder\", isRoot);\n    let blocks = this.getListFolder(folder, \"map\", isRoot);\n    Promise.all([folders, blocks]).then((values) => {\n      if (!(\"result\" in values[0])) {\n        console.warn(\n          \"EllipsisDrive: Authentication error, your token might be invalid\"\n        );\n        this.render();\n        return;\n      }\n      folder.folders = values[0].result.map(this.fixFolder);\n      folder.blocks = values[1].result.map(this.fixBlock);\n      folder.folders.map((childfolder) => {\n        childfolder.depth = folder.depth + 1;\n      });\n      folder.blocks.map((childblock) => {\n        childblock.depth = folder.depth + 1;\n      });\n      this.render();\n    });\n  };\n\n  attachMouseEnter = (elem, extra, refresh) => {\n    elem.style.color = this.GRAY;\n    if (!extra) {\n      extra = [];\n    }\n\n    elem.style.cursor = \"pointer\";\n\n    let turnColor = (color, svgcolor, onEnter) => {\n      let func = () => {\n        if (refresh != null) {\n          if (onEnter) {\n            refresh.style.display = \"initial\";\n          } else {\n            refresh.style.display = \"none\";\n          }\n        }\n\n        elem.style.color = color;\n\n        if (refresh != null) {\n          refresh.style.color = svgcolor;\n        }\n\n        for (const extr of extra) {\n          extr.style.fill = svgcolor;\n        }\n      };\n      return func;\n    };\n\n    elem.onmouseenter = turnColor(this.BLUE, this.BLUE, true);\n    elem.onmouseleave = turnColor(this.GRAY, this.SVGGRAY, false);\n\n    if (refresh != null && false) {}\n\n    for (const extr of extra) {\n      extr.onmouseenter = turnColor(this.BLUE, this.BLUE, true);\n      extr.onmouseleave = turnColor(this.GRAY, this.SVGGRAY, false);\n    }\n\n    return elem;\n  };\n\n  renderBlock = (block) => {\n    let div = document.createElement(\"div\");\n\n    if (block.type == \"map\" && !this.settings.showRaster) {\n      div.style.display = \"none\";\n    }\n\n    if (block.type == \"shape\" && !this.settings.showVector) {\n      div.style.display = \"none\";\n    }\n\n    let elem = this.p(`${block.name}`, block.depth);\n    elem.style.marginLeft = \"20px\";\n\n    let arrow = block.showExpanded\n      ? this.arrowDown(block.depth)\n      : this.arrowRight(block.depth);\n    let icon =\n      block.type == \"map\"\n        ? this.getRasterSVG(block.depth)\n        : this.getVectorSVG(block.depth);\n\n    elem = this.attachMouseEnter(elem, [arrow, icon]);\n\n    arrow.style.float = \"left\";\n\n    let func = () => {\n      block.showExpanded = !block.showExpanded;\n      this.render();\n    };\n\n    elem.onclick = func;\n    icon.onclick = func;\n    arrow.onclick = func;\n\n    div.appendChild(arrow);\n    div.appendChild(icon);\n    div.appendChild(elem);\n\n    if (block.showExpanded) {\n      for (const layer of block.layers) {\n        if (layer.deleted) {\n          continue;\n        }\n        let layerelem = this.p(layer.name, block.depth);\n        layerelem.style.marginLeft = \"20px\";\n        layerelem = this.attachMouseEnter(layerelem);\n        layerelem.onclick = () => {\n          this.settings.cb(block.obj, layer);\n        };\n\n        div.appendChild(layerelem);\n      }\n    }\n\n    return div;\n  };\n\n  renderFolder = (folder) => {\n    let div = document.createElement(\"div\");\n    div.setAttribute(\"id\", `${folder.id}`);\n    div.classList.add(\"ellipsis-folder\");\n\n    let startdiv = document.createElement(\"div\");\n    startdiv.setAttribute(\"id\", `${folder.id}_start`);\n\n    let enddiv = document.createElement(\"div\");\n    enddiv.setAttribute(\"id\", `${folder.id}_end`);\n\n    div.appendChild(startdiv);\n    div.appendChild(enddiv);\n\n    // don't display the 'root' name\n    // and don't attach an onclick listener\n\n    if (!folder.trueRoot) {\n      startdiv.onclick = (input) => this.onClick(folder, input);\n      let toBeAdded = this.p(`${folder.text}`, folder.depth);\n      toBeAdded.style.marginLeft = \"20px\";\n\n      let arrow = folder.showExpanded\n        ? this.arrowDown(folder.depth)\n        : this.arrowRight(folder.depth);\n\n      let refresh = this.refreshSVG();\n      refresh.onclick = () => {\n        folder.showExpanded = !folder.showExpanded;\n        folder.foldersExpanded = false;\n        folder.folders = [];\n        folder.blocks = [];\n      };\n\n      let foldericon = this.getFolderSVG(folder.id);\n      toBeAdded = this.attachMouseEnter(\n        toBeAdded,\n        [arrow, foldericon],\n        refresh\n      );\n\n      refresh.style.float = \"right\";\n      refresh.style.position = \"relative\";\n      refresh.style.display = \"none\";\n\n      arrow.style.float = \"left\";\n      startdiv.appendChild(arrow);\n      startdiv.appendChild(foldericon);\n      startdiv.appendChild(refresh);\n      startdiv.appendChild(toBeAdded);\n    }\n\n    // if a folder should be expanded, but is not yet: expand it\n    if (folder.showExpanded && !folder.foldersExpanded) {\n      let loading = this.p(\"Loading...\", folder.depth + 1);\n      div.insertBefore(loading, enddiv);\n      this.expandFolder(folder);\n    }\n\n    // an expanded folder should show its content\n    if (folder.showExpanded) {\n      for (const subfolder of folder.folders) {\n        div.insertBefore(this.renderFolder(subfolder), enddiv);\n      }\n      for (const block of folder.blocks) {\n        div.insertBefore(this.renderBlock(block), enddiv);\n      }\n      if (folder.folders.length == 0 && folder.blocks.length == 0) {\n        // empty folder\n      }\n    }\n    return div;\n  };\n\n  getButton = (text, cb) => {\n    let button = document.createElement(\"button\");\n    button.onclick = cb;\n    button.innerHTML = text;\n    button.style.color = \"#fff\";\n    button.style.backgroundColor = \"#089EC8\";\n    button.style.boxShadow =\n      \"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)\";\n    button.style.padding = \"6px 16px\";\n    button.style.fontSize = \"1rem\";\n    button.style.minWidth = \"64px\";\n    button.style.boxSizing = \"border-box\";\n    button.style.transition = `\"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;\n    button.style.fontFamily = [\n      \"Roboto Condensed\",\n      \"Roboto\",\n      \"-apple-system\",\n      \"BlinkMacSystemFont\",\n      \"Segoe UI\",\n      \"Helvetica Neue\",\n      \"Arial\",\n      \"sans-serif\",\n      \"Apple Color Emoji\",\n      \"Segoe UI Emoji\",\n      \"Segoe UI Symbol\",\n      \"Exo 2\",\n    ];\n    button.style.fontWeight = \"500\";\n    button.style.lineHeight = \"1.75\";\n    button.style.borderRadius = \"4px\";\n    button.style.letterSpacing = \"0.5px\";\n    button.style.textTransform = \"uppercase\";\n    button.style.border = 0;\n    return button;\n  };\n\n  loginDiv = () => {\n    let div = document.createElement(\"div\");\n    div.appendChild(this.p(\"Please log in to your Ellipsis Drive account:\"));\n    div.style.textAlign = \"center\";\n    let button = this.getButton(\"Log in\", () => {\n      window.location = `https://app.ellipsis-drive.com/login?referer=${window.location.href}`;\n    });\n    div.appendChild(button);\n    return div;\n  };\n\n  authErrorDiv = () => {\n    let div = document.createElement(\"div\");\n    div.appendChild(\n      this.p(\"Authentication error, please check if token is correct\")\n    );\n    div.style.textAlign = \"center\";\n\n    let button = this.getButton(\"Retry\", () => {\n      this.render();\n    });\n    console.warn(`Authentication error, token used is: ${this.settings.token}`);\n    div.appendChild(button);\n    return div;\n  };\n\n  renderSearch = () => {\n    let div = document.createElement(\"div\");\n    if (this.activeSearch) {\n      let p = this.p(\"Loading..\");\n      div.appendChild(p);\n    } else {\n      let anything = false;\n\n      if (this.settings.searchIncludeFolders) {\n        for (const folder of this.searchResults[0]) {\n          anything = true;\n          div.appendChild(this.renderFolder(folder));\n        }\n      }\n\n      if (this.settings.showRaster) {\n        for (const block of this.searchResults[1]) {\n          anything = true;\n          div.appendChild(this.renderBlock(block));\n        }\n      }\n\n      if (this.settings.showVector) {\n        for (const block of this.searchResults[2]) {\n          anything = true;\n          div.appendChild(this.renderBlock(block));\n        }\n      }\n\n      if (!anything) {\n        div.appendChild(this.p(\"No results found\"));\n      }\n    }\n    return div;\n  };\n\n  performSearch = async (text) => {\n    /*\n      apiurlmaps = f\"/account/maps\"\n      apiurlshapes = f\"/account/shapes\"\n      apiurlfolders = f\"/account/folders\"\n      */\n\n    let urlmaps = `${this.APIURL}/account/maps`;\n    let urlshapes = `${this.APIURL}/account/shapes`;\n    let urlfolders = `${this.APIURL}/account/folders`;\n\n    let urls = [urlfolders, urlmaps, urlshapes];\n\n    let requests = [];\n\n    let params = {\n      access: [\"public\", \"subscribed\", \"owned\", \"favorited\"],\n      name: text,\n      canView: true,\n    };\n\n    let headers = {\n      \"Content-Type\": \"application/json\",\n      Authorization: `Bearer ${this.settings.token}`,\n    };\n\n    for (const url of urls) {\n      requests.push(\n        fetch(url, {\n          method: \"POST\",\n          body: JSON.stringify(params),\n          headers: headers,\n        })\n      );\n    }\n\n    Promise.all(requests)\n      .then((ret) => {\n        let json = [];\n        for (const prom of ret) {\n          json.push(prom.json());\n        }\n        return Promise.all(json);\n      })\n      .then((ret) => {\n        this.searchResults = [\n          ret[0].result.map(this.fixFolder),\n          ret[1].result.map(this.fixBlock),\n          ret[2].result.map(this.fixBlock),\n        ];\n        this.activeSearch = false;\n        this.render();\n      });\n  };\n\n  bouncingOnSearchChange = (input) => {\n    let str = input.target.value;\n    this.searchString = str;\n\n    if (str == \"\") {\n      this.searching = false;\n      this.activeSearch = false;\n    } else {\n      this.searching = true;\n      this.activeSearch = true;\n\n      this.performSearch(this.searchString);\n    }\n    this.render();\n  };\n\n  onSearchChange = this.debounce(this.bouncingOnSearchChange, 200);\n\n  getSearchBar = () => {\n    let div = document.createElement(\"div\");\n    let search = document.createElement(\"input\");\n    search.setAttribute(\"id\", \"ellipsis-drive-search\");\n    search.style.marginLeft = `${this.DEPTHCONSTANT}px`;\n    search.type = \"text\";\n    search.placeholder = \"Search Drive\";\n    search.value = this.searchString;\n    search.addEventListener(\"input\", this.onSearchChange);\n    search.style.width = \"80%\";\n    search.style.left = \"20px\";\n    search.style.position = \"relative\";\n    div.appendChild(search);\n    return div;\n  };\n\n  render = () => {\n    this.normalDiv.innerHTML = \"\";\n\n    if (!this.settings.loggedIn) {\n      this.searchBarDiv.style.display = \"none\";\n      this.normalDiv.appendChild(this.loginDiv());\n    } else if (this.authError) {\n      this.normalDiv.appendChild(this.authErrorDiv());\n    } else {\n      this.searchBarDiv.style.display = \"initial\";\n      if (this.searching) {\n        this.normalDiv.appendChild(this.renderSearch());\n      } else {\n        this.normalDiv.appendChild(this.renderFolder(this.root));\n      }\n    }\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EllipsisDrive);\n\n\n//# sourceURL=webpack://ellipsis-folders/./src/lib/EllipsisDrive.js?");

/***/ }),

/***/ "./src/lib/EllipsisFolder.js":
/*!***********************************!*\
  !*** ./src/lib/EllipsisFolder.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass EllipsisFolder {\n    folders = [];\n    blocks = [];\n    text = undefined;\n    name = undefined;\n    id = undefined;\n    root = false;\n    showExpanded = false;\n    foldersExpanded = false;\n    trueRoot = false;\n    depth = 0;\n  \n    constructor(text, name, id, depth = 0, root = false) {\n      this.text = text;\n      this.name = name;\n      this.id = id;\n      this.root = root;\n      this.blocks = [];\n      this.folders = [];\n      this.depth = depth;\n    }\n  }\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EllipsisFolder);\n\n//# sourceURL=webpack://ellipsis-folders/./src/lib/EllipsisFolder.js?");

/***/ }),

/***/ "./src/lib/index.js":
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EllipsisDrive\": () => (/* reexport safe */ _EllipsisDrive__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _EllipsisDrive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EllipsisDrive */ \"./src/lib/EllipsisDrive.js\");\n\n\n\n\n//# sourceURL=webpack://ellipsis-folders/./src/lib/index.js?");

/***/ }),

/***/ "./src/test/index.js":
/*!***************************!*\
  !*** ./src/test/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ \"./src/lib/index.js\");\n\n\n\nlet cb = (map, layer) => {\n    console.log(\"I am a callback!\");\n    console.log(map);\n    console.log(layer);\n};\n\nlet div = document.getElementById(\"test\");\n\nlet options = {\n    div: div, \n    cb: cb,\n    searchIncludeFolders: true,\n    showVector: true,\n    showRaster: true,\n}\n\nlet myDrive = new _lib__WEBPACK_IMPORTED_MODULE_0__.EllipsisDrive(options);\n\n//# sourceURL=webpack://ellipsis-folders/./src/test/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test/index.js");
/******/ 	
/******/ })()
;
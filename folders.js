"use strict";

const blue = "#089EC8";
const gray = "rgba(0, 0, 0, 0.87)";
const svggray = "rgba(0, 0, 0, 0.54)";

const apiURL = "https://api.ellipsis-drive.com/v1";

const depthFactor = 25;

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


class EllipsisBlock {
  type = undefined;
  name = undefined;
  id = undefined;
}

class EllipsisFolder {
  folders = [];
  blocks = [];
  text = undefined;
  name = undefined;
  id = undefined;
  root = false;
  showExpanded = false;
  foldersExpanded = false;
  trueRoot = false;
  depth = 0;

  constructor(text, name, id, depth = 0, root = false) {
    this.text = text;
    this.name = name;
    this.id = id;
    this.root = root;
    this.blocks = [];
    this.folders = [];
    this.depth = depth;
  }
}

const arrowDown = (depth = 0) => {
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>`;
    svg1.style.fill = svggray;
    svg1.style.height = 15;
    svg1.style.width  = 15;
    svg1.style.cursor = "pointer";
    svg1.style.transition = "transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
    svg1.style.marginLeft = depthFactor * depth;
    svg1.classList.add("ellipsis-folder-arrow-down")
    return svg1;
}

const arrowRight = (depth = 0) => {
  let elem = arrowDown(depth);
  elem.classList.remove("ellipsis-folder-arrow-down");
  elem.classList.add("ellipsis-folder-arrow-right")
  elem.style.transform = "rotate(-90deg)";
  return elem;
}

const getFolderSVG = (id, depth = 0) => {
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.style.height = 23;
  svg1.style.width  = 23;
  svg1.style.position = "relative";
  svg1.style.bottom = 5;
  svg1.style.fill = svggray;
  svg1.style.cursor = "pointer";
  svg1.style.marginLeft = depthFactor * depth + 10;
  svg1.style.float  = "left";
  svg1.classList.add("ellipsis-folder-icon");

  switch(id){
    case "myMaps":
      svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.09 5.37516C10.71 4.99516 10.2 4.78516 9.67 4.78516H4.5C3.4 4.78516 2.51 5.68516 2.51 6.78516L2.5 18.7852C2.5 19.8852 3.4 20.7852 4.5 20.7852H20.5C21.6 20.7852 22.5 19.8852 22.5 18.7852V8.78516C22.5 7.68516 21.6 6.78516 20.5 6.78516H12.5L11.09 5.37516ZM15.502 16.8819C14.7572 16.8818 14.0374 16.6134 13.4745 16.1257C12.9116 15.6381 12.5433 14.9641 12.4372 14.227H15.502V13.3459H12.4372C12.5136 12.8141 12.727 12.3113 13.0566 11.8869C13.3862 11.4626 13.8205 11.1313 14.317 10.9256C14.8135 10.7199 15.355 10.6469 15.8882 10.7138C16.4214 10.7807 16.9281 10.9852 17.3583 11.3072L18.0025 10.6632C17.4141 10.192 16.7045 9.89662 15.9555 9.81103C15.2065 9.72545 14.4485 9.85315 13.769 10.1794C13.0894 10.5057 12.5158 11.0173 12.1144 11.6552C11.713 12.2932 11.5 13.0315 11.5 13.7852C11.5 14.5388 11.713 15.2772 12.1144 15.9151C12.5158 16.553 13.0894 17.0646 13.769 17.3909C14.4485 17.7172 15.2065 17.8449 15.9555 17.7593C16.7045 17.6737 17.4141 17.3783 18.0025 16.9071L17.3583 16.2632C16.8232 16.6655 16.1716 16.8827 15.502 16.8819ZM17.9847 15.6338C18.3836 15.1005 18.5989 14.4524 18.5983 13.7865C18.5996 13.1212 18.3854 12.4735 17.9878 11.9401C17.9861 11.9379 17.9852 11.9353 17.9852 11.9325C17.9852 11.9298 17.9861 11.9271 17.9878 11.925L18.6125 11.2983C18.6136 11.297 18.615 11.2961 18.6165 11.2954C18.618 11.2947 18.6197 11.2944 18.6214 11.2944C18.623 11.2944 18.6247 11.2947 18.6262 11.2954C18.6277 11.2961 18.6291 11.297 18.6302 11.2983C19.1934 12.0058 19.5 12.8832 19.5 13.7874C19.5 14.6915 19.1934 15.569 18.6302 16.2764C18.6291 16.2777 18.6277 16.2787 18.6262 16.2794C18.6247 16.28 18.623 16.2804 18.6214 16.2804C18.6197 16.2804 18.618 16.28 18.6165 16.2794C18.615 16.2787 18.6136 16.2777 18.6125 16.2764L17.9847 15.6489C17.983 15.6467 17.9821 15.6441 17.9821 15.6413C17.9821 15.6386 17.983 15.6359 17.9847 15.6338Z"></path></svg>`
      break;
    case "shared":
      svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></svg>`
     break;
    case "favorites":
      svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2.06 11L15 15.28 12.06 17l.78-3.33-2.59-2.24 3.41-.29L15 8l1.34 3.14 3.41.29-2.59 2.24.78 3.33z"></path></svg>`
      break;
    default:
      svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>`
  }
  return svg1;
}

const getVectorSVG = (depth) => {
  let div = document.createElement("div");
  div.style.backgroundColor = "#3F51B5";
  div.style.borderRadius = "50%";
  div.style.height = "20px";
  div.style.width = "20px";
  div.style.alignItems = "center";
  div.style.display = "flex";
  div.style.float = "left";
  div.style.marginLeft = depthFactor * (depth+1);
  
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.style.height = 15;
  svg1.style.cursor = "pointer";
  svg1.style.float  = "left";
  svg1.classList.add("ellipsis-vector-icon");
  svg1.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="draw-polygon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M384 352c-.35 0-.67.1-1.02.1l-39.2-65.32c5.07-9.17 8.22-19.56 8.22-30.78s-3.14-21.61-8.22-30.78l39.2-65.32c.35.01.67.1 1.02.1 35.35 0 64-28.65 64-64s-28.65-64-64-64c-23.63 0-44.04 12.95-55.12 32H119.12C108.04 44.95 87.63 32 64 32 28.65 32 0 60.65 0 96c0 23.63 12.95 44.04 32 55.12v209.75C12.95 371.96 0 392.37 0 416c0 35.35 28.65 64 64 64 23.63 0 44.04-12.95 55.12-32h209.75c11.09 19.05 31.49 32 55.12 32 35.35 0 64-28.65 64-64 .01-35.35-28.64-64-63.99-64zm-288 8.88V151.12A63.825 63.825 0 0 0 119.12 128h208.36l-38.46 64.1c-.35-.01-.67-.1-1.02-.1-35.35 0-64 28.65-64 64s28.65 64 64 64c.35 0 .67-.1 1.02-.1l38.46 64.1H119.12A63.748 63.748 0 0 0 96 360.88zM272 256c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16-16-7.18-16-16zM400 96c0 8.82-7.18 16-16 16s-16-7.18-16-16 7.18-16 16-16 16 7.18 16 16zM64 80c8.82 0 16 7.18 16 16s-7.18 16-16 16-16-7.18-16-16 7.18-16 16-16zM48 416c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16-16-7.18-16-16zm336 16c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16z"></path></svg>`;
  div.appendChild(svg1);
  return div;
}

const getRasterSVG = (depth) => {
  let div = document.createElement("div");
  div.style.backgroundColor = "#00796B";
  div.style.borderRadius = "50%";
  div.style.height = "20px";
  div.style.width = "20px";
  div.style.alignItems = "center";
  div.style.display = "flex";
  div.style.float = "left";
  div.style.marginLeft = depthFactor * (depth+1);
  

  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.style.height = 15;
  svg1.style.fill = "#FFFFFF";
  svg1.style.cursor = "pointer";
  svg1.style.float  = "left";
  svg1.classList.add("ellipsis-raster-icon");
  svg1.innerHTML = `<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path></svg>`;
  div.appendChild(svg1);
  return div;
}


class Drive {

  authError = false;

  defaultSettings = {
    loggedIn: false,
    token: null,
    types: "",
    callback: (data) => {
      console.log(
        "Default callback is called, please provide your own callback!"
      );
    },
    icon: "default",
    onlyFolders: false,
    div: null,
  };

  settings = {};

  constructor(options = {}) {
    // root of the folder structure
    this.root = {
      name: "ellipsis-folder-root",
      text: "ellipsis-folder-root",
      id: "ellipsis-folder-root",
      trueRoot: true,
      showExpanded: true,
      foldersExpanded: true,
      folders: [
        new EllipsisFolder("My Drive", "myMaps", "myMaps", 0, true),
        new EllipsisFolder("Shared with me", "shared", "shared", 0, true),
        new EllipsisFolder("Favorites", "favorites", "favorites", 0, true),
      ],
      blocks: [],
    };
    
    this.settings = { ...this.defaultSettings, ...options };



    if('token' in options){
      this.settings.token = options.token;
      this.settings.loggedIn = true;
    } else {
      // find out if there's a token for us in the url
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has('token')){
        this.settings.token = urlParams.get('token');
        this.settings.loggedIn = true;
      }
    }

    this.settings.div.style.backgroundColor = "#f5f5f5";
    this.settings.div.style.overflow = "scroll";

    this.render();
  }

  bouncingOnClick = (folder, input) => {
    folder.showExpanded = !folder.showExpanded;
    this.render();
  };

  onClick = debounce(this.bouncingOnClick, 100);

  p = (str, depth = 0) => {
    let elem = document.createElement("p");
    elem.innerText = str;
    elem.style.paddingLeft = (depthFactor * depth) + 40;
    elem.classList.add("ellipsis-folder-p")
    elem.style.fontFamily = `"Roboto Condensed","Roboto","Helvetica","Lucida Sans Unicode","sans-serif"`;
    return elem;
  };

  /**
   * @param {EllipsisFolder}
   * @param {string} either "folder" or "map"
   */
  getListFolder = async (folder, type = "folder", isRoot = false) => {
    let url = "";
    url = isRoot ? `${apiURL}/path/listRoot` : `${apiURL}/path/listFolder`;

    let params = {
      root: folder.id,
      pathId: folder.id,
      type: type,
    };

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.settings.token}`,
    };
  
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: headers,
    });

    return request.json();
  };

  login = (password) => {};

  fixFolder = (inputFolder) => {
    // we might also just return inputFolder but add the 'text' field
    let folder = new EllipsisFolder();
    folder.name = inputFolder.name;
    folder.id = inputFolder.id;
    folder.text = inputFolder.name;
    folder.obj = inputFolder;
    return folder;
  };

  fixBlock = (inputBlock) => {
    let block = new EllipsisBlock();
    block.type = inputBlock.type;
    block.id = inputBlock.id;
    block.name = inputBlock.name;
    block.obj = inputBlock;
    return block;
  };

  expandFolder = (folder) => {

    folder.foldersExpanded = true;
    let isRoot = folder.root;
    let folders = this.getListFolder(folder, "folder", isRoot);
    let blocks = this.getListFolder(folder, "map", isRoot);
    Promise.all([folders, blocks]).then((values) => {
      if (!("result" in values[0])){
        this.authError = true;
        this.render();
        return;
      }
      folder.folders = values[0].result.map(this.fixFolder);
      folder.blocks = values[1].result.map(this.fixBlock);
      folder.folders.map((childfolder) => {
        childfolder.depth = folder.depth + 1;
      });
      folder.blocks.map((childblock) => {
        childblock.depth = folder.depth + 1;
      });
      this.render();
    });
  };

  attachMouseEnter = (elem, extra) => {
    elem.style.color = gray;
    if (!extra){
      extra = [];
    }

    elem.style.cursor = "pointer";

    let turnColor = (color, svgcolor) => {
      let func = () => {
        elem.style.color = color;
        for (const extr of extra){
          extr.style.fill = svgcolor;
        }
      }
      return func;
    }

    elem.onmouseenter = turnColor(blue, blue);
    elem.onmouseleave = turnColor(gray, svggray);
    for (const extr of extra){
      extr.onmouseenter = turnColor(blue, blue);
      extr.onmouseleave = turnColor(gray, svggray);
    }

    return elem;
  }

  renderBlock = (block) => {
    let div = document.createElement("div");
    let elem = this.p(`${block.name}`, block.depth);
    elem.style.paddingLeft = parseInt(elem.style.paddingLeft) + 20;
    elem.onclick = () => {
      this.settings.callback(block.obj);
    };
    elem = this.attachMouseEnter(elem);
    if (block.type == "map"){
      div.appendChild(getRasterSVG(block.depth));
    } else {
      div.appendChild(getVectorSVG(block.depth));
    }
    div.appendChild(elem);
    return div;
  };

  renderFolder = (folder) => {
    let div = document.createElement("div");
    div.setAttribute("id", `${folder.id}`);
    div.classList.add("ellipsis-folder")

    let startdiv = document.createElement("div");
    startdiv.setAttribute("id", `${folder.id}_start`);

    let enddiv = document.createElement("div");
    enddiv.setAttribute("id", `${folder.id}_end`);

    div.appendChild(startdiv);
    div.appendChild(enddiv);

    // don't display the 'root' name
    // and don't attach an onclick listener

    if (!folder.trueRoot) {
      startdiv.onclick = (input) => this.onClick(folder, input);
      let toBeAdded = this.p(`${folder.text}`, folder.depth);
      toBeAdded.style.marginLeft = "20px";

      let arrow = arrowRight(folder.depth);
      if (folder.showExpanded){
        arrow = arrowDown(folder.depth);
      }

      let foldericon = getFolderSVG(folder.id);
      toBeAdded = this.attachMouseEnter(toBeAdded, [arrow, foldericon]);


      arrow.style.float = "left";
      startdiv.appendChild(arrow);
      startdiv.appendChild(foldericon);
      startdiv.appendChild(toBeAdded);
    }

    // if a folder should be expanded, but is not yet: expand it
    if (folder.showExpanded && !folder.foldersExpanded) {
      let loading = this.p("Loading...", folder.depth + 1);
      div.insertBefore(loading, enddiv);
      this.expandFolder(folder);
    }

    // an expanded folder should show its content
    if (folder.showExpanded) {
      for (const subfolder of folder.folders) {
        div.insertBefore(this.renderFolder(subfolder), enddiv);
      }
      for (const block of folder.blocks) {
        div.insertBefore(this.renderBlock(block), enddiv);
      }
      if (folder.folders.length == 0 && folder.blocks.length == 0) {
        // empty folder
      }
    }
    return div;
  };

  getButton = (text, cb) => {
    let button = document.createElement("button");
    button.onclick = cb;
    button.innerHTML = text;
    button.style.color  = "#fff";
    button.style.backgroundColor = "#089EC8";
    button.style.boxShadow  = "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)";
    button.style.padding = "6px 16px";
    button.style.fontSize = "1rem";
    button.style.minWidth = "64px";
    button.style.boxSizing = "border-box";
    button.style.transition = `"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
    button.style.fontFamily = ["Roboto Condensed","Roboto","-apple-system","BlinkMacSystemFont","Segoe UI","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Exo 2"];
    button.style.fontWeight = "500";
    button.style.lineHeight = "1.75";
    button.style.borderRadius = "4px";
    button.style.letterSpacing = "0.5px";
    button.style.textTransform = "uppercase";
    button.style.border = 0;
    return button
  }

  loginDiv = () => {
    let div = document.createElement("div");
    div.appendChild(this.p("Please log in to your Ellipsis Drive account:"));
    div.style.textAlign = "center"
    let button = this.getButton("Log in", () => {window.location=`https://app.ellipsis-drive.com/login?referer=${window.location.href}`});
    div.appendChild(button);
    return div;
  }

  authErrorDiv = () => {
    let div = document.createElement("div");
    div.appendChild(this.p("Authentication error, please check if token is correct"));
    div.style.textAlign = "center"
    
    let button = this.getButton("Retry", () => {
      console.log("Retrying render");
      this.render()
    });
    console.warn(`Authentication error, token used is: ${this.settings.token}`)
    div.appendChild(button);
    return div;
  }

  render = () => {
    this.settings.div.innerHTML = "";

    if (!this.settings.loggedIn){
      this.settings.div.appendChild(this.loginDiv());
    } else if (this.authError) {
      this.settings.div.appendChild(this.authErrorDiv());
    } 
    else
    {
      this.settings.div.appendChild(this.renderFolder(this.root));
    }
  };
}

export default Drive;

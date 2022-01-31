"use strict";

const blue = "#089EC8";
const gray = "rgba(0, 0, 0, 0.87)";

const apiURL = "https://api.ellipsis-drive.com/v1";

const depthFactor = 15;

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const getUrl = (url) => {
  return `${apiURL}${url}`;
};

class Block {
  type = undefined;
  name = undefined;
  id = undefined;
}

class Folder {
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

const arrowDown = () => {
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.innerHTML = `<path d="M7 10l5 5 5-5z"></path>`;
    svg1.style.fill = "rgba(0, 0, 0, 0.54)";
    svg1.style.height = 15;
    svg1.style.width  = 15;
    svg1.style.transition = "transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
    return svg1;
}

const arrowRight = () => {
  let elem = arrowDown();
  elem.style.transform = "rotate(-90deg)";
  return elem;
}

class Drive {
  loginHTML = `<p>Please log in: <button onclick="this.openLogin">login</button></p>`;

  openLogin = () => {
    console.log("hallo");
    url = window.location;
    window.location = `https://app.ellipsis-drive.com/login?originUrl=${url}`;
  };

  defaultSettings = {
    loggedIn: false,
    token: null,
    types: "",
    callback: (data) => {
      console.log(
        "Default callback is called, please provide your own callback!",
        data
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
        new Folder("My Drive", "myMaps", "myMaps", 0, true),
        new Folder("Shared with me", "shared", "shared", 0, true),
        new Folder("Favorites", "favorites", "favorites", 0, true),
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

    this.render();
  }

  bouncingFunc = (folder, input) => {
    console.log("Clicked on:");
    console.log(folder);
    console.log(input.target);

    folder.showExpanded = !folder.showExpanded;
    console.log("And changed its showExpanded");
    this.render();
  };

  func = debounce(this.bouncingFunc, 100);

  p = (str, depth = 0) => {
    let elem = document.createElement("p");
    elem.innerText = str;
    elem.style.paddingLeft = depthFactor * depth;
    return elem;
  };

  /**
   * @param {Folder}
   * @param {string} either "folder" or "map"
   */
  getListFolder = async (folder, type = "folder", isRoot = false) => {
    console.log(folder);
    console.log(type);
    console.log(isRoot);
    let url = "";
    url = isRoot ? getUrl("/path/listRoot") : getUrl("/path/listFolder");

    let params = {
      root: folder.id,
      pathId: folder.id,
      type: type,
    };

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.settings.token}`,
    };
    console.log(headers);
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
    let folder = new Folder();
    folder.name = inputFolder.name;
    folder.id = inputFolder.id;
    folder.text = inputFolder.name;
    folder.obj = inputFolder;
    return folder;
  };

  fixBlock = (inputBlock) => {
    let block = new Block();
    block.type = inputBlock.type;
    block.id = inputBlock.id;
    block.name = inputBlock.name;
    block.obj = inputBlock;
    return block;
  };

  expandFolder = (folder) => {
    console.log(`Expanding folder ${folder.name}`);

    folder.foldersExpanded = true;
    let isRoot = folder.root;
    let folders = this.getListFolder(folder, "folder", isRoot);
    let blocks = this.getListFolder(folder, "map", isRoot);
    Promise.all([folders, blocks]).then((values) => {
      folder.folders = values[0].result.map(this.fixFolder);
      folder.blocks = values[1].result.map(this.fixBlock);
      folder.folders.map((childfolder) => {
        childfolder.depth = folder.depth + 1;
      });
      folder.blocks.map((childblock) => {
        childblock.depth = folder.depth + 1;
      });
      console.log("New folders:");
      console.log(folder.folders);
      console.log("New blocks:");
      console.log(folder.blocks);
      this.render();
    });
  };

  attachMouseEnter = (elem) => {
    elem.style.color = gray;

    elem.style.cursor = "pointer";

    elem.onmouseenter = () => {
        elem.style.color = blue;
    };

    elem.onmouseleave = () => {
        elem.style.color = gray;
    };
    return elem;
  }

  renderBlock = (block) => {
    let elem = this.p(`- ${block.name}`, block.depth);
    elem.onclick = () => {
      this.settings.callback(block.obj);
    };

    return this.attachMouseEnter(elem);
  };

  renderFolder = (folder) => {
    let div = document.createElement("div");
    div.setAttribute("id", `${folder.id}`);

    let startdiv = document.createElement("div");
    startdiv.setAttribute("id", `${folder.id}_start`);

    let enddiv = document.createElement("div");
    enddiv.setAttribute("id", `${folder.id}_end`);

    div.appendChild(startdiv);
    div.appendChild(enddiv);

    //console.log(folder);

    // don't display the 'root' name
    // and don't attach an onclick listener

    if (!folder.trueRoot) {
      startdiv.onclick = (input) => this.func(folder, input);
      let toBeAdded = this.p(`${folder.text}`, folder.depth);
      toBeAdded.style.marginLeft = "10px";
      toBeAdded = this.attachMouseEnter(toBeAdded);

      let arrow = arrowRight();
      if (folder.showExpanded){
        arrow = arrowDown();
      }
      arrow.style.float = "left";
      arrow.style.marginLeft = "-10px";
      startdiv.appendChild(arrow);
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
        console.log("empty folder");
      }
    }
    return div;
  };

  render = () => {
    console.log("Render called");
    console.log(this.root);
    this.settings.div.innerHTML = "";

    if (!this.settings.loggedIn){


      console.log("Not logged in");
      this.settings.div.appendChild(this.p("Not logged in"));
      
      let button = document.createElement("button");
      button.onclick = () => {window.location=`https://app.ellipsis-drive.com/login?referer=${window.location.href}`;};
      //button.onclick = () => {window.location=`https://app.ellipsis-drive.com?referer=https://nu.nl`;};
      button.innerHTML = "Log in";
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
      this.settings.div.appendChild(button);
    } else {
      this.settings.div.appendChild(this.renderFolder(this.root));
    }
  };
}

export default Drive;

'use strict';

const apiURL = 'https://api.ellipsis-drive.com/v1';

const getUrl = (url) =>{
    return `${apiURL}${url}`;
}

class Block {
    type = undefined;
    name = undefined;
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

    constructor(text, name, id, root = false){
        this.text = text;
        this.name = name;
        this.id = id;
        this.root = root;
        this.blocks = [];
        this.folders = [];
    }

}

class Drive {

    loginHTML = `<p>Please log in: <button onclick="this.openLogin">login</button></p>`

    openLogin = () => {
        console.log("hallo");
        url = window.location;
        window.location = `https://app.ellipsis-drive.com/login?originUrl=${url}`;
    }

    defaultSettings = {
        loggedIn: false,
        token: null,
        types: "",
        onClick: (data) => {console.log("Default onClick is called, please provide your own callback!", data)},
        icon: "default",
        onlyFolders: false,
        div: null,
    };

    settings = {};

    constructor(options = {}){
        // root of the folder structure
        this.root = {
            trueRoot: true, 
            showExpanded: true, 
            foldersExpanded: true,
            folders: [new Folder("My Drive", "myMaps", "myMaps", true), new Folder("Shared with me", "shared", "shared", true), new Folder("Favorites", "favorites", "favorites", true)], 
            blocks: [],
        }

        this.settings = {...this.defaultSettings, ...options};

        this.render();
    }

    func = (folder, input) => {
        console.log("Clicked on:");
        console.log(folder);
        console.log(input.target);
    }

    p = (str) => {
        let elem = document.createElement('p');
        elem.innerText = str;
        return elem;
    }

    getRootDiv = (root) => {
        let div = document.createElement('div');
        div.setAttribute('id', root.name);
        let txt = this.p(root.text);
        div.appendChild(txt);
        div.onclick = () => {console.log("click")};
        return div;
    }

    getListRoot = async (root) => {
        let url = getUrl("/path/listRoot");
        let params = {
            "root": `${root}`,
            "type": "folder",
        };
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        }
        let request = await fetch(url, {method: "POST", body: JSON.stringify(params), headers: headers})

        return await request.json();
    }

    getListFolder = async(folder) => {
        let url = getUrl("/path/listFolder");
        let paramsFolders = {
            "pathId": `${folder.id}`,
            "type": "folder",
        };
        let paramsBlocks = {
            "pathId": `${folder.id}`,
            "type": "map",
        };
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        };
        let requestFolders = await fetch(url, {method: "POST", body: JSON.stringify(paramsFolders), headers: headers});
        let requestBlocks = await fetch(url, {method: "POST", body: JSON.stringify(paramsBlocks), headers: headers});
        
        let jsonFolders = await requestFolders.json();
        let jsonBlocks = await requestBlocks.json();

        return [jsonFolders, jsonBlocks]
    }

    login = (password) => {

    }

    expandFolder = (folder) => {
        console.log(`Expanding folder ${folder.name}`);
        folder.foldersExpanded = true;
        let promises = this.getListFolder(folder);
        console.log(promises);
        // Promise.all(promises).then((values) => {
        //     console.log(values);
        // })
    }

    renderFolder = (folder) => {
        let div = document.createElement('div');
        div.setAttribute("id", folder.id);
        div.onclick = (input) => this.func(folder, input);
        console.log(folder);
        // don't display the 'root' name
        if (!folder.trueRoot){
            let toBeAdded = this.p(folder.text);
            div.appendChild(toBeAdded);
        }

        // if a folder should be expanded, but is not yet: expand it
        if (folder.showExpanded && !folder.foldersExpanded){
            this.expandFolder(folder);

        }

        // an expanded folder should show its content
        if (folder.showExpanded){
            for (const subfolder of folder.folders){
                div.appendChild(this.renderFolder(subfolder));
            }
            for (const block of folder.blocks){
                div.appendChild(this.p(block.name));
            }
        }
        return div;
    }

    render = () => {
        this.settings.div.innerHTML = "";
        this.settings.div.appendChild(this.renderFolder(this.root));

    }
    

}

export default Drive;
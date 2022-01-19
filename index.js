'use strict';

const apiURL = 'https://api.ellipsis-drive.com/v1';

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
        
        this.settings = {...this.defaultSettings, ...options};
        
        var html = "<p>hallo?</p>";
        this.render()
        
    }

    login = (password) => {

    }

    render = (content) => {
        if (!content) {
            this.settings.div.innerHTML = this.loginHTML;
        } else {
            this.settings.div.innerHTML = content;
        }
    }

}

export default Drive;
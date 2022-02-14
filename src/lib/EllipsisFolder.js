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

export default EllipsisFolder;
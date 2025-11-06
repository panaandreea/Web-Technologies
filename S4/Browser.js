class Software {
    constructor(name) {
        this.name = name;
    }

    run() {
        console.log(`${this.name} is running...`);
    }
}

class Plugin {
    constructor(name) {
        this.name = name;
    }

    activate() {
        console.log(`Plugin "${this.name}" activated!`);
    }
}

class Browser extends Software {
    constructor(name) {
        super(name);
        this.plugins = [];
    }

    install(plugin) {
        this.plugins.push(plugin);
        console.log(`Installed plugin: ${plugin.name}`);
    }

    listPlugins() {
        console.log(`Plugins installed in ${this.name}:`);
        this.plugins.forEach((p, index) => console.log(`${index + 1}. ${p.name}`));
    }

    run() {
        super.run();
        console.log(`${this.name} is loading plugins...`);
        this.plugins.forEach(plugin => plugin.activate());
    }
}

const chrome = new Browser("Google Chrome");
const adBlock = new Plugin("AdBlock");
const darkMode = new Plugin("Dark Mode");

chrome.install(adBlock);
chrome.install(darkMode);

chrome.listPlugins();
chrome.run();

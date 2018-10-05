"use strict";

/**
 * cog Framework API
 *
 * @type {{}}
 */
const cog = {};

cog.Symbol = {

    /**
     * Name of the COG Class
     */
    CLASS_NAME: undefined
};

// Attach unique Symbols to the cog.Symbol
for (let key in cog.Symbol) {
    cog.Symbol[key] = Symbol(key);
}

/**
 * COG Class Interaction API
 */
cog.Class = {

    [cog.Symbol.CLASS_NAME]: "Class",
    [Symbol.toStringTag]: "cog.Class",

    /**
     * Builds a cog Class Definition.
     *
     * @param className
     * @param superClass
     * @param def
     */
    define: function define(className, superClass, def) {

        // Classes should only be defined once
        if (cog[className]) {
            console.error(`cog class "${className}" already exists`);
            return;
        }

        // Construct the class from its prototype definition, extending the given superClass if provided
        let classDef = superClass ? Object.create(superClass, Object.getOwnPropertyDescriptors(def)) : def;

        // Set meta properties of the class definition
        classDef[cog.Symbol.CLASS_NAME] = className;
        classDef[Symbol.toStringTag] = `cog.${className}`;

        // Attach the class definition to the cog API
        cog[className] = classDef;
    },

    makePrivate: function makePrivate(obj, property) {

        if (!obj[property]) {
            console.error(`Cannot make non-existant property ${propery} private on Object ${obj}`);
            return;
        }

        Object.defineProperty(obj, property, Object.assign(Object.getOwnPropertyDescriptors(obj[property]), {enumerable: false}))
    }
};

/**
 * COG Base Object
 */
cog.Class.define("Cog", null, {

    /**
     * Default constructor
     */
    construct: function construct() {
        console.debug(`No constructor defined for ${this.self.getClassName()}`);
    },

    /**
     * Get the Cog Class Name
     */
    getClassName: function getClassName() {
        return this.self[cog.Symbol.CLASS_NAME];
    }
});


/**
 * COG Initialization Utility
 */
cog.Init = {

    [cog.Symbol.CLASS_NAME]: "cog.Init",

    /**
     * System Imports Needed for COG to run
     * TODO Add wildcard system so we don't need to explicitly name every file
     */
    Dependencies: [

        // Libs
        "js/lib/jquery.js",

        // Framework Core
        "js/core/cog-ajax.js",
        "js/core/cog-log.js",
        //"js/core/cog-events.js",
        "js/core/cog-factory.js",
        "js/core/cog-scope.js",
        //"js/core/cog-symbol.js",
        "js/core/cog-util.js",

        //"js/cog-cog.js",

        // Elements
        "js/element/cog-element.js",
        "js/element/cog-app.js",
        "js/element/cog-container.js",
        "js/element/cog-form.js",
        "js/element/cog-image.js",
        "js/element/cog-input/cog-input.js",
        "js/element/cog-input/cog-input-date.js",
        "js/element/cog-input/cog-input-radio.js",
        "js/element/cog-input/cog-input-text.js",
        "js/element/cog-select.js",
        "js/element/cog-text.js",

        // CSS
        "css/cog-style.css",
        "css/user-style.css"
    ],

    /**
     * Imports the file from the provided URL.
     *
     * @param url
     * @returns {Promise}
     */
    importFile: function importFile(url) {
        return new Promise(function (resolve) {

            // TODO Build in wildcard file loading

            let fileType = url.substring(url.lastIndexOf("."));
            let fileElem = undefined;

            // TODO Build plugin support to support importing arbitrary file types
            switch (fileType) {
                case ".css":
                    fileElem = document.createElement("link");
                    fileElem.type = "text/css";
                    fileElem.rel = "stylesheet";
                    fileElem.href = url;
                    break;
                case ".js":
                    fileElem = document.createElement("script");
                    fileElem.type = "text/javascript";
                    fileElem.src = url;
                    break;
                default:
                    console.error(`Don't know how to load file type ${type}`);
                    break;
            }

            fileElem.onload = resolve;
            document.head.appendChild(fileElem);
        });
    },

    /**
     * Bootstraps the COG Application
     */
    bootstrap: function bootstrap() {

        console.log("Bootstrapping COG Framework...");

        // Load system dependencies
        let dependencyPromises = [];
        for (let dependency of cog.Init.Dependencies) {
            dependencyPromises.push(cog.Init.importFile(dependency));
        }

        // Ensure all dependencies have loaded before continuing...
        Promise.all(dependencyPromises).then(() => {

            // Get base element to anchor COG app
            const COG_APP_ATTRIBUTE = "[data-cog-app-id]";

            cog.Root = document.querySelector(COG_APP_ATTRIBUTE); // TODO Add multiplicity
            let cogAppId = cog.Root.dataset.cogAppId;
            let cogMetaSrc = cog.Root.dataset.cogMetaSrc;
            cog.Root.id = cogAppId;

            if (!cogAppId) {
                console.log(`Error initializing COG framework. No base element found with specified ${COG_APP_ATTRIBUTE} attribute.`);
                return;
            } else if (!cogMetaSrc) {
                console.log(`Error initializing COG framework. Missing data-cog-meta-src attribute for App: ${cogAppId}`);
                return;
            }

            console.log(`Initializing App "${cogAppId}" with Metadata definition "${cogMetaSrc}"`);

            // Fetch the Metadata Configuration
            cog.Ajax.get(cogMetaSrc, response => {

                // TODO need error handling
                cog.Metadata = response;
                cog.Factory.buildCogApp(cogAppId);
            });
        });
    }
};

/**
 *
 */
cog.Metadata = {
    [Symbol.toStringTag]: "cog.Metadata"
};

document.addEventListener("DOMContentLoaded", cog.Init.bootstrap);
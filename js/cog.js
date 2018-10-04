"use strict";

/**
 * COG Framework API
 *
 * @type {{Init: {Dependencies: string[], importFile: (function(*, *=): Promise<any | never>), bootstrap: cog.Init.bootstrap}}}
 */
let cog = {

    Metadata: { [Symbol.toStringTag]: "cog.Metadata" },

    /**
     * COG Initialization Utility
     */
    Init: {

        /**
         * System Imports Needed for COG to run
         * TODO Add wildcard system so we don't need to explicitly name every file
         */
        Dependencies: [

            // Libs
            "js/lib/jquery.js",

            // Framework Core
            "js/core/cog-ajax.js",
            "js/core/cog-cog.js",
            "js/core/cog-log.js",
            //"js/core/cog-events.js",
            "js/core/cog-factory.js",
            "js/core/cog-scope.js",
            "js/core/cog-symbol.js",
            "js/core/cog-util.js",

            // Components
            "js/components/cog-component.js",
            "js/components/cog-app.js",
            "js/components/cog-container.js",
            "js/components/cog-form.js",
            "js/components/cog-image.js",
            "js/components/cog-input/cog-input.js",
            "js/components/cog-input/cog-input-date.js",
            "js/components/cog-input/cog-input-radio.js",
            "js/components/cog-input/cog-input-text.js",
            "js/components/cog-select.js",
            "js/components/cog-text.js",

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
        importFile: (url) => {
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
        bootstrap: () => {

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
    }
};

document.addEventListener("DOMContentLoaded", cog.Init.bootstrap);
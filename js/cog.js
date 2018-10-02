"use strict";

/**
 * COG Framework API
 *
 * @type {{Init: {Dependencies: string[], importFile: (function(*, *=): Promise<any | never>), bootstrap: cog.Init.bootstrap}}}
 */
let cog = {

    /**
     * COG Initialization Utility
     */
    Init: {

        /**
         * System Imports Needed for COG to run
         */
        Dependencies: [
            "js/lib/jquery.js",

            "js/cog-ajax.js",
            "js/cog-log.js",
            "js/cog-factory.js",
            "js/cog-pubsub.js",
            "js/cog-util.js",

            "js/components/cog-component.js", // Import before the other components

            "js/components/cog-app.js",
            "js/components/cog-container.js",
            "js/components/cog-form.js",
            "js/components/cog-image.js",
            "js/components/cog-input.js",
            "js/components/cog-input/cog-input-date.js",
            "js/components/cog-input/cog-input-radio.js",
            "js/components/cog-input/cog-input-text.js",
            "js/components/cog-select.js",
            "js/components/cog-text.js",

            "css/cog-style.css"
        ],

        /**
         * Imports the file from the provided URL.
         *
         * @param url
         * @param successCallback
         * @returns {Promise}
         */
        importFile: (url, successCallback) => {
            return new Promise(function (resolve) {

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
            }).then(successCallback);
        },

        /**
         * Bootstraps the COG Application
         */
        bootstrap: () => {

            console.log("Bootstrapping COG Framework...");

            // Load system dependencies
            let promiseArray = [];
            for (let sysImport of cog.Init.Dependencies) {
                promiseArray.push(cog.Init.importFile(sysImport));
            }

            // Ensure all dependencies have loaded before continuing...
            Promise.all(promiseArray).then(() => {

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
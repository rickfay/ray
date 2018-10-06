"use strict";

/**
 * cog Framework API
 *
 * @type {{Imports: *[], Init: {bootstrap: cog.Init.bootstrap, loadImports: cog.Init.loadImports}}}
 */
const cog = {

    /**
     * System Imports Needed for COG to run
     *
     * TODO Add wildcard system so we don't need to explicitly name every file
     */
    Imports: [

        // Core Components needed before everything else
        {type: "js", url: "js/core/cog-symbol.js"},
        {type: "js", url: "js/core/cog-class.js"},
        {type: "js", url: "js/core/cog-cog.js"},

        // Core
        {type: "js", url: "js/core/cog-ajax.js"},
        {type: "js", url: "js/core/cog-log.js"},
        {type: "js", url: "js/core/cog-factory.js"},
        {type: "js", url: "js/core/cog-scope.js"},
        {type: "js", url: "js/core/cog-util.js"},

        // Elements
        {type: "js", url: "js/element/cog-element.js"},
        {type: "js", url: "js/element/cog-app.js", defer: true},
        {type: "js", url: "js/element/cog-container.js", defer: true},
        {type: "js", url: "js/element/cog-form.js", defer: true},
        {type: "js", url: "js/element/cog-image.js", defer: true},
        {type: "js", url: "js/element/cog-input/cog-input.js"},
        {type: "js", url: "js/element/cog-input/cog-input-date.js", defer: true},
        {type: "js", url: "js/element/cog-input/cog-input-radio.js", defer: true},
        {type: "js", url: "js/element/cog-input/cog-input-text.js", defer: true},
        {type: "js", url: "js/element/cog-select.js", defer: true},
        {type: "js", url: "js/element/cog-text.js", defer: true},

        // CSS
        {type: "css", url: "css/cog-style.css", defer: true},
        {type: "css", url: "css/user-style.css", defer: true}
    ],

    /**
     * COG Initialization Utility
     */
    Init: {

        /**
         * Bootstraps the COG Application
         */
        bootstrap: function bootstrap() {

            // Get base element to anchor COG app
            const COG_APP_ATTRIBUTE = "[data-cog-app-id]";

            let rootElement = document.querySelector(COG_APP_ATTRIBUTE); // TODO Add multiplicity
            let cogAppId = rootElement.dataset.cogAppId;

            if (cog.Root[cogAppId]) {
                console.error(`cog App with id ${cogAppId} already deployed.`);
                return;
            }

            let cogMetaSrc = rootElement.dataset.cogMetaSrc;
            rootElement.id = cogAppId;
            cog.Root[cogAppId] = rootElement;

            if (!cogAppId) {
                console.log(`Error initializing COG framework. No base element found with specified ${COG_APP_ATTRIBUTE} attribute.`);
                return;
            } else if (!cogMetaSrc) {
                console.log(`Error initializing COG framework. Missing data-cog-meta-src attribute for App: ${cogAppId}`);
                return;
            }

            // Fetch the Metadata Configuration
            cog.Ajax.get(cogMetaSrc, response => {

                // TODO need error handling
                cog.Metadata = JSON.parse(response);
                cog.Factory.construct(cogAppId, "App");
            });
        },

        /**
         * Loads the given imports
         *
         * @param imports
         */
        loadImports: function loadImports(imports) {

            if (imports.length > 0) {

                let element;
                let _import = imports[0];

                // Build a dom element for the js or css file to import
                switch (_import.type) {
                    case "css":
                        element = document.createElement("link");
                        element.href = _import.url
                        element.type = "text/css";
                        element.rel = "stylesheet";
                        break;
                    case "js":
                        element = document.createElement("script");
                        element.src = _import.url;
                        element.type = "text/javascript";
                        if (_import.defer) {
                            element.setAttribute("defer", "");
                        }
                        break;
                    default:
                        console.error(`Don't know how to load file type ${_import.type}`);
                        return;
                }

                /*
                 * If marked as defer, move onto loading the next dependency immediately.
                 * Else, wait until this dependency has loaded and then continuing loading other imports
                 */
                if (_import.defer) {
                    element.onload = function onload() {
                        console.debug(`Loaded: ${_import.url}`);
                    };
                    loadImports(imports.slice(1));
                } else if (imports.length > 1) {
                    if (element.readyState) {  // IE
                        element.onreadystatechange = function onreadystatechange() {
                            console.debug(`Loaded: ${_import.url}`);
                            if (element.readyState === "loaded" || element.readyState === "complete") {
                                element.onreadystatechange = null;
                                loadImports(imports.slice(1));
                            }
                        };
                    } else {  // Others
                        element.onload = function onload() {
                            console.debug(`Loaded: ${_import.url}`);
                            loadImports(imports.slice(1));
                        };
                    }
                }

                document.head.appendChild(element);
            }
        }
    },
    Root: {}
};

cog.Init.loadImports(cog.Imports);
window.addEventListener("load", cog.Init.bootstrap);
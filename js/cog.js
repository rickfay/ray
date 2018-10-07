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
        {type: "js", url: "js/core/cog-scope.js"},
        {type: "js", url: "js/core/cog-util.js"},
        {type: "js", url: "js/core/cog-root.js"},
        {type: "js", url: "js/core/cog-log.js"},
        {type: "js", url: "js/core/cog-cog.js"},
        {type: "js", url: "js/core/cog-event.js"},
        {type: "js", url: "js/core/cog-events.js"},
        {type: "js", url: "js/core/cog-ajax.js"},

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
    Init: (function Init() {

        /**
         * Loads the given imports
         *
         * @param imports
         */
        let loadImports = function loadImports(imports) {

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
                    element.onload = function onload() {
                        console.debug(`Loaded: ${_import.url}`);
                        loadImports(imports.slice(1));
                    };
                }

                document.head.appendChild(element);
            }
        };

        return {
            init: function init() {
                loadImports(cog.Imports);
                window.addEventListener("load", function load() {
                    cog.Root.bootstrap();
                });
            }
        };
    })(),

    Metadata: {},

    Ajax: undefined,
    Cog: undefined,
    Element: undefined,
    Event: undefined,
    Events: undefined,
    Log: undefined,
    Root: undefined,
    Scope: undefined,
    Util: undefined
};

cog.Init.init();
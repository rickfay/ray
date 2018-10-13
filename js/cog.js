"use strict";

/**
 * cog Framework API
 */
const cog = {};

// Load the dependencies
(function load(dependencies) {

    if (!dependencies || dependencies.length === 0) {
        return;
    }

    let dependency = dependencies[0];
    let element;

    switch (dependency.type) {
        case "css":
            element = document.createElement("link");
            element.href = dependency.url;
            element.rel = "stylesheet";
            element.type = "text/css";
            break;
        case "js":
            element = document.createElement("script");
            element.src = dependency.url;
            element.type = "text/javascript";
            break;
    }

    element.onload = function onload() {
        load(Array.prototype.slice.call(dependencies, 1));
    };

    document.head.appendChild(element);
})([
    {"type": "js", "url": "js/init/symbol.js"},
    {"type": "js", "url": "js/init/class.js"},
    {"type": "js", "url": "js/util/prototype.js"},
    {"type": "js", "url": "js/util/namespace.js"},
    {"type": "js", "url": "js/service/metadata.js"},
    {"type": "js", "url": "js/util/util.js"},
    {"type": "js", "url": "js/service/root.js"},
    {"type": "js", "url": "js/util/log.js"},
    {"type": "js", "url": "js/proto/object.js"},
    {"type": "js", "url": "js/proto/event.js"},
    {"type": "js", "url": "js/service/events.js"},
    {"type": "js", "url": "js/util/ajax.js"},
    {"type": "js", "url": "js/proto/element/element.js"},
    {"type": "js", "url": "js/proto/element/app.js"},
    {"type": "js", "url": "js/proto/element/container.js"},
    {"type": "js", "url": "js/proto/element/form.js"},
    {"type": "js", "url": "js/proto/element/image.js"},
    {"type": "js", "url": "js/proto/element/select.js"},
    {"type": "js", "url": "js/proto/element/text.js"},
    {"type": "js", "url": "js/proto/element/input/input.js"},
    {"type": "js", "url": "js/proto/element/input/input-text.js"},
    {"type": "js", "url": "js/proto/element/input/input-radio.js"},
    {"type": "js", "url": "js/proto/element/input/input-date.js"},
    {"type": "js", "url": "js/proto/element/table/table.js"},
    {"type": "js", "url": "js/proto/element/table/table-row.js"},
    {"type": "css", "url": "css/cog-style.css"},
    {"type": "css", "url": "css/user-style.css"}
]);

// Wait for everything to be loaded, and then bootstrap the app
window.addEventListener("load", function bootstrap() {
    cog.Root.bootstrap();
});
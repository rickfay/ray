/**
 * COG Utilities
 *
 * @constructor
 */
cog.Util = {

    /**
     * Binds a function to a given context
     *
     * @param fn
     * @param _this
     * @returns {function(): *}
     */
    proxy: function proxy(fn, _this) {
        return function proxy() {
            return fn.apply(_this, arguments);
        };
    },

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    isFunction: function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    },

    /**
     * Evaluates a reference chain and return the result if it's valid, otherwise return undefined.
     *
     * @returns {?}
     */
    ref: function ref() {
        if (arguments.length > 1) {
            if (arguments[0]) {
                return cog.Util.ref(arguments[0][arguments[1]], ...Array.prototype.slice.call(arguments, 2));
            } else {
                return undefined;
            }
        } else {
            return arguments[0];
        }
    },

    /**
     * Evaluates a reference chain and builds missing references as empty objects.
     * Returns the evaluated reference, whether pre-existing or created by this function.
     */
    buildRef: function buildRef() {

        if (arguments.length > 1) {
            if (arguments[0]) {
                if (!arguments[0][arguments[1]]) {
                    arguments[0][arguments[1]] = {};
                }
                return buildRef(arguments[0][arguments[1]], ...Array.prototype.slice.call(arguments, 2));
            } else {
                arguments[0] = {};
                return buildRef(arguments[0], ...Array.prototype.slice.call(arguments, 1));
            }
        } else {
            return arguments[0] ? arguments[0] : {};
        }
    },

    /**
     *  Append newly constructed Component to the DOM
     *
     * @param parentDom
     * @param dom
     */
    appendDom: function appendDom(parentDom, dom) {
        if (dom && parentDom) {
            parentDom.appendChild(dom);
        }
    },

    /**
     * Applies the given css definition to the given dom element
     *
     * @param dom
     * @param css
     */
    applyStyle: function applyStyle(dom, css) {
        if (dom && css) {
            for (let key of Object.keys(css)) {
                dom.style[key] = css[key];
            }
        }
    },

    /**
     * Apply the given array of cssClasses to the given dom element
     *
     * @param dom
     * @param cssClasses
     */
    applyClass: function applyClass(dom, cssClasses) {
        if (dom && cssClasses) {
            for (let cssClass of cssClasses) {
                if (cssClass) {
                    dom.classList.add(cssClass);
                }
            }
        }
    },

    /**
     * Determines if obj is empty
     *
     * @param obj
     * @returns {boolean}
     */
    isEmpty: function isEmpty(obj) {
        switch (typeof obj) {
            case "object":
                return obj == null || obj.length === 0;
            case "string":
                return obj === "";
            default:
                return obj === undefined || obj == null;
        }
    },

    /**
     * Returns an Array of all the cog Component classes
     */
    getCogClasses: function getCogClasses(obj) {

        let classes = [];
        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {
            classes.push(proto[cog.Symbol.CLASS_NAME]);
            proto = Object.getPrototypeOf(proto);
        }

        return classes;
    }
};
/**
 * COG Utilities
 */
cog.Class.define("Util", null, {

    /**
     * Binds a function to a given context
     *
     * @param fn
     * @param _this
     * @returns {function(): *}
     */
    proxy: (fn, _this) => {

        // Build Proxy
        let proxy = function () {
            return fn.apply(_this, arguments);
        };

        // Overwrite toString() definition for ease of debugging
        Object.defineProperty(proxy, "toString", {
            value: function toString() {
                return `proxy: ${fn}`;
            }
        });

        return proxy;
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
     * @param obj
     * @param propChain
     * @returns {*}
     */
    ref: function ref(obj, ...propChain) {
        if (propChain.length > 0) {
            return obj ? cog.Util.ref(obj[propChain[0]], ...Array.prototype.slice.call(propChain, 1)) : undefined;
        } else {
            return obj;
        }
    },

    /**
     * Evaluates a reference chain and builds missing references as empty objects.
     * Returns the evaluated reference, whether pre-existing or created by this function.
     *
     * @param obj
     * @param propChain
     * @returns {{}}
     */
    buildRef: function buildRef(obj, ...propChain) {

        if (propChain.length > 0) {
            if (obj) {
                if (!obj[propChain[0]]) {
                    obj[propChain[0]] = {};
                }
                return buildRef(obj[propChain[0]], ...Array.prototype.slice.call(propChain, 1));
            } else {
                obj = {};
                return buildRef(obj, propChain);
            }
        } else {
            return obj ? obj : {};
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
            if (typeof cssClasses === "string") {
                dom.classList.add(cssClasses);
            } else if (cssClasses instanceof Array) {
                for (let cssClass of cssClasses) {
                    if (cssClass) {
                        dom.classList.add(cssClass);
                    }
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
});
/**
 * COG Utilities
 */
cog.Class.define("Util", null, {

    /**
     *
     * @param obj
     * @returns {*}
     */
    getMetadata: (obj) => {

        let appName = cog.Util.getAppName(obj);
        let id = obj.getId();
        let className = obj.getClassName();

        return cog.Metadata[appName].Elements[className][id.substring(id.lastIndexOf(".") + 1)];
    },

    /**
     * Gets the App Name the given cog object belongs to by parsing off the first token of the object's ID
     *
     * @param obj
     * @returns {string}
     */
    getAppName: (obj) => {
        let id = obj.getId();
        let dotIndex = id.indexOf(".");
        return dotIndex !== -1 ? id.substring(0, dotIndex) : id;
    },

    /**
     * Binds a function to a given context
     *
     * @param fn
     * @param scope
     * @returns {function(): *}
     */
    proxy: function proxy(fn, scope) {
        return function proxy() {
            return fn.apply(scope, arguments);
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
                return buildRef({}, propChain);
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
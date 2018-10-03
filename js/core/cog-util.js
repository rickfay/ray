/**
 * COG Utilities
 *
 * @constructor
 */
cog.Util = function Util() {
};
cog.Util.extends = cog.Cog;
cog.Util.static = true;

(proto => {

    proto.construct = function construct() {};

    /**
     * Evaluates a reference chain and return the result if it's valid, otherwise return undefined.
     *
     * @param _scope
     * @returns {?}
     */
    proto.ref = function ref(_scope) {
        return (function ref(args) {

            // Check if there are more references to evaluate
            if (args.length > 1) {
                if (args[0] && args[0][args[1]]) {
                    return ref([args[0][args[1]], ...args.slice(2)]); // Valid reference, continue evaluating recursively
                } else {
                    return undefined; // Encountered null reference, validation failed
                }
            } else {
                return args[0]; // No more references to validate and the base reference is valid
            }
        })(Array.prototype.slice.call(arguments, 1));
    };

    /**
     * Evaluates a reference chain and builds missing references as empty objects.
     * Returns the evaluated reference, whether pre-existing or created by this function.
     *
     * @param _scope
     */
    proto.buildRef = function buildRef(_scope) {
        return (function buildRef(args) {
            if (args.length > 1) {
                if (args[0]) {
                    if (!args[0][args[1]]) {
                        args[0][args[1]] = {};
                    }
                    return buildRef([args[0][args[1]], ...args.slice(2)]);
                } else {
                    args[0] = {};
                    return buildRef([args[0], ...args.slice(1)]);
                }
            } else {
                return args[0] ? args[0] : {};
            }
        })(Array.prototype.slice.call(arguments, 1));
    };

    /**
     *  Append newly constructed Component to the DOM
     *
     * @param _scope
     * @param parentDom
     * @param dom
     */
    proto.appendDom = function appendDom(_scope, parentDom, dom) {
        if (dom && parentDom) {
            parentDom.appendChild(dom);
        }
    };

    /**
     * Applies the given css definition to the given dom element
     *
     * @param _scope
     * @param dom
     * @param css
     */
    proto.applyStyle = function applyStyle(_scope, dom, css) {
        if (dom && css) {
            for (let key of Object.keys(css)) {
                dom.style[key] = css[key];
            }
        }
    };

    /**
     * Apply the given array of cssClasses to the given dom element
     *
     * @param _scope
     * @param dom
     * @param cssClasses
     */
    proto.applyClass = function applyClass(_scope, dom, cssClasses) {
        if (dom && cssClasses) {
            for (let cssClass of cssClasses) {
                if (cssClass) {
                    dom.classList.add(cssClass);
                }
            }
        }
    };

    /**
     * Determines if obj is empty
     *
     * @param _scope
     * @param obj
     * @returns {boolean}
     */
    proto.isEmpty = function isEmpty(_scope, obj) {
        switch (typeof obj) {
            case "object":
                return obj == null || obj.length === 0;
            case "string":
                return obj === "";
            default:
                return obj === undefined || obj == null;
        }
    };

    /**
     * Returns an Array of all the cog Component classes _this object
     *
     * @param _scope
     * @param className
     */
    proto.getClasses = function (_scope, className) {

        let clazz = cog[className];
        let classes = [];

        do {
            classes.push(clazz);
            clazz = clazz.extends;
        } while (clazz);

        return classes;
    };

})(cog.Util.prototype);
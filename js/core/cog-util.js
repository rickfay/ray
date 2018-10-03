/**
 * COG Utilities
 *
 * @type {{construct: cog.Util.construct, applyCss: cog.Util.applyCss, isEmpty: cog.Util.isEmpty}}
 */
cog.Util = {

    /**
     *  Append newly constructed Component to the DOM
     */
    appendDom: (parentDom, dom) => {
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
    applyStyle: (dom, css) => {
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
    applyClass: (dom, cssClasses) => {
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
    isEmpty: obj => {
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
     * Returns an Array of all the cog Component classes _this object
     *
     * @param className
     */
    getClasses: className => {

        let clazz = cog[className];
        let classes = [];

        do {
            classes.push(clazz);
            clazz = clazz.extends;
        } while (clazz);

        return classes;
    }
};
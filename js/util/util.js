/**
 * Ray Utilities
 */
ray.Class.util("Util", {

    /**
     * Append dom to the parentDom
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
     * Returns an Array of all the ray Component classes
     */
    getRayClasses: function getRayClasses(obj) {

        let classes = [];
        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {
            classes.push(proto[ray.Symbol.CLASS_NAME]);
            proto = Object.getPrototypeOf(proto);
        }

        return classes;
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
            return obj ? ray.Util.ref(obj[propChain[0]], ...Array.prototype.slice.call(propChain, 1)) : undefined;
        } else {
            return obj;
        }
    }
});
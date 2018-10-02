/**
 * COG Utilities
 *
 * @type {{construct: cog.Util.construct, applyCss: cog.Util.applyCss, isEmpty: cog.Util.isEmpty}}
 */
cog.Util = {

    /**
     * Factory function for constructing a COG Component
     *
     * @param component The Component to construct
     * @param _this
     * @param id
     */
    construct: (component, _this, id) => {

        _this.id = id;

        // Fetch metadata definition for this component
        _this.metadata = cog.Metadata[component.constructor.name][_this.id];

        // TODO generic DOM creation and ID attribute assignment

        // Proxies out functions to their prototype counterparts
        // TODO just making everything public for the moment.
        $.each(component.constructor.prototype, (propertyName, property) => {
            if (typeof property === "function") {
                component[propertyName] = $.proxy(property, component, _this);
            }
        });

        // Construct
        if (component.construct) {
            component.construct();
        }

        // Build the component's DOM
        if (component.buildDom) {
            component.buildDom();
        }

        // Apply any CSS
        cog.Util.applyCss(_this.dom, _this.metadata.CSS);
    },

    /**
     *  Append newly constructed Component to the DOM
     */
    appendDom: (parentDom, dom) => {
        if (dom && parentDom) {
            parentDom.appendChild(dom);
        }
    },

    /**
     *
     * @param _this
     */
    applyCss: (_this) => {
        cog.Util.applyStyle(_this.dom, _this.metadata.Style);
        cog.Util.applyClass(_this.dom, _this.metadata.Class);
        cog.Util.applyClass(_this.dom, ...[cog.Util.getClasses(_this).map(clazz => `cog${clazz.name}`)]);
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
     * Recursively builds the child Elements on this Component
     *
     * @param component
     */
    buildChildren: component => {
        let dom = component.getDom();
        if (dom) {
            // Recursively construct child Component Elements
            let elements = component.getMetadata().Elements;
            if (elements) {
                for (let element in elements) {
                    cog.Factory.construct(element, elements[element], dom);
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
     * Calls a function on the given superclass.
     *
     * TODO This will need to be updated once all object methods aren't public...
     *
     * @param _this
     * @param func
     * @param args
     *
    _super: (func, _this, args) => {
        cog[_this.className].extends.prototype[func](_this,  args);
    },*/

    /**
     * Returns an Array of all the cog Component classes _this object
     *
     * @param _this
     */
    getClasses: (_this) => {

        let clazz = cog[_this.className];
        let classes = [];

        do {
            classes.push(clazz);
            clazz = clazz.extends;
        } while (clazz);

        return classes;
    }
};
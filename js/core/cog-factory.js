/**
 *  Component Object Generator Factory
 *
 * @type {{buildCogApp: cog.Factory.buildCogApp, establishBaseComponent: cog.Factory.establishBaseComponent, construct: cog.Factory.construct, validate: (function(*, *): boolean), proxyPrototypeFunctions: cog.Factory.proxyPrototypeFunctions, extend: cog.Factory.extend, resetCss: cog.Factory.resetCss, buildChildren: cog.Factory.buildChildren}}
 */
cog.Factory = {

    /**
     * Builds the COG Application
     *
     * @param appId
     */
    buildCogApp: appId => {
        cog.Factory.establishBaseComponent();
        cog.app = cog.Factory.construct(appId, cog.App.name, null);
    },

    /**
     * Some pre-processing
     * TODO clean up
     */
    establishBaseComponent: () => {
        for (let className of Object.keys(cog)) {
            let clazz = cog[className];

            if (!clazz.abstract && typeof clazz === "function") {
                if (clazz.static) {
                    cog[className] = cog.Factory.construct(null, className, null);
                } else if (!clazz.extends && clazz !== cog.Cog) {
                    console.error(`No defined parent class for ${clazz}`);
                }
            }
        }
    },

    /**
     * Constructs a new COG Component
     *
     * @param className
     * @param id
     * @param parentDom
     */
    construct: function construct(id, className, parentDom) {

        // Validate
        if (!cog.Factory.validate(id, className)) {
            return null;
        }

        // Construct the Component and its Private Scope
        let obj = new cog[className]();
        let _this = new cog.PrivateScope(obj);

        // Build the component functions as proxies to prototype functions, and inherit properties from parent class(es)
        cog.Factory.proxyPrototypeFunctions(obj, _this);
        cog.Factory.extend(obj, _this);

        // Allow the object to construct itself
        obj.construct(id, className, parentDom);

        return obj;
    },

    /**
     * Validates the ID and class name of the Component
     *
     * @param id
     * @param className
     * @returns {boolean}
     */
    validate:
        (id, className) => {
            let isValid = true;
            if (!cog[className].static && (!cog.Metadata.Components[className] || !cog.Metadata.Components[className][id])) {
                console.error(`Cannot construct non-static instance from metadata definition: { ${id}: ${className} }`);
                isValid = false;
            }
            return isValid;
        },

    /**
     * Proxy inherited prototype properties
     *
     * @param obj
     * @param _this
     */
    proxyPrototypeFunctions:
        (obj, _this) => {

            let proto;
            if (typeof obj === "function") {
                proto = obj.prototype;
            }
            else if (typeof obj === "object") {
                proto = obj.__proto__;
            } else {
                console.error(`Cannot proxy prototype functions to unexpected type: ${typeof obj}`);
            }

            for (let key of Object.keys(proto)) {
                if (typeof proto[key] === "function") {

                    // TODO Write jquery-less version of proxy function
                    // TODO can we preserve the function name in the proxy?

                    obj[key] = $.proxy(proto[key], _this);
                }
            }
        },

    /**
     * Inherit component properties off the component's parent
     *
     * @param obj
     * @param _this
     */
    extend:
        (obj, _this) => {

            (function recursivelyExtend(obj, _this, parentClass) {

                if (!parentClass) {
                    return;
                }

                for (let key of Object.keys(parentClass.prototype)) {

                    if (!obj.hasOwnProperty(key)) {

                        // Proxy inherited prototype properties
                        obj[key] = $.proxy(parentClass.prototype[key], _this);

                    } else if (!_this.super[key]) {

                        // Add superclass reference for directly overridden functions
                        _this.super[key] = $.proxy(parentClass.prototype[key], _this);
                    }
                }

                recursivelyExtend(obj, _this, parentClass.extends);

            })(obj, _this, obj.constructor.extends);
        },

    /**
     * Resets the CSS to the default as specified by the metadata
     *
     * @param obj
     */
    resetCss:
        obj => {
            cog.Util.applyStyle(obj.getDom(), obj.getMetadata().Style);
            cog.Util.applyClass(obj.getDom(), obj.getMetadata().Class);
            cog.Util.applyClass(obj.getDom(), ...[cog.Util.getClasses(obj).map(clazz => `cog${clazz.name}`)]);
        },

    /**
     * Recursively builds the child Elements on this Component
     *
     * @param obj
     */
    buildChildren:
        obj => {
            let dom = obj.getDom();
            if (dom) {
                // Recursively construct child Component Elements
                let elements = obj.getMetadata().Elements;
                if (elements) {
                    for (let element in elements) {
                        cog.Factory.construct(element, elements[element], dom);
                    }
                }
            }
        },
};
/**
 * Component Object Generator Factory
 *
 * @type {{extend: cog.Factory.extend, applyCss: cog.Factory.applyCss, construct: (function(*=, *=, *=)), establishBaseComponent: cog.Factory.establishBaseComponent, buildCogApp: cog.Factory.buildCogApp}}
 */
cog.Factory = {

    /**
     * Builds the COG Application
     *
     * @param appId
     */
    buildCogApp: appId => {
        cog.Factory.establishBaseComponent();
        cog.Factory.construct(appId, cog.App.name, null);
    },

    /**
     *
     */
    establishBaseComponent: () => {
        for (let className of Object.keys(cog)) {
            let clazz = cog[className];

            if (typeof clazz === "function") {
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

        // Construct the object using a closure to provide its own private scope
        return (function privateScope(id, className) {

            // Validate
            if (!cog[className].static && !cog.Factory.validate(id, className)) {
                return null;
            }

            // Construct the Component
            let _this = cog[className].static ? cog[className] : new cog[className]();
            _this.super = {};

            // Construct the Component's private scope
            let _scope = {};

            // Build the component functions as proxies to prototype functions, and inherit properties from parent class(es)
            cog.Factory.proxyPrototypeFunctions(_scope, _this);
            cog.Factory.extend(_scope, _this);

            // Allow the object to construct itself
            _this.construct(id, className, parentDom);

            return _this;

        })(id, className);
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

            if (!cog.Metadata.Components[className] || !cog.Metadata.Components[className][id]) {
                console.error(`Cannot find Component Metadata definition for { ${id}: ${className} }`);
                return false;
            }

            return true;
        },

    /**
     * Proxy inherited prototype properties
     *
     * @param _scope
     * @param _this
     */
    proxyPrototypeFunctions:
        (_scope, _this) => {

            let proto;
            if (typeof _this === "function") {
                proto = _this.prototype;
            }
            else if (typeof _this === "object") {
                proto = _this.__proto__;
            } else {
                console.error(`Cannot proxy prototype functions to unexpected type: ${typeof _this}`);
            }

            for (let key of Object.keys(proto)) {
                if (typeof proto[key] === "function") {
                    // TODO Write jquery-less version of proxy function
                    // TODO can we preserve the function name in the proxy?
                    _this[key] = $.proxy(proto[key], _this, _scope);
                }
            }
        },

    /**
     * Inherit component properties off the component's parent
     *
     * @param _scope
     * @param _this
     */
    extend:
        (_scope, _this) => {

            (function recursivelyExtend(_scope, _this, parentClass) {

                if (!parentClass) {
                    return;
                }

                for (let key of Object.keys(parentClass.prototype)) {

                    if (!_this.hasOwnProperty(key)) {

                        // Proxy inherited prototype properties
                        _this[key] = $.proxy(parentClass.prototype[key], _this, _scope);

                    } else if (!_this.super[key]) {

                        // Add superclass reference for directly overridden functions
                        _this.super[key] = $.proxy(parentClass.prototype[key], _this, _scope);
                    }
                }

                recursivelyExtend(_scope, _this, parentClass.extends);

            })(_scope, _this, _this.constructor.extends);
        },

    /**
     * Resets the CSS to the default as specified by the metadata
     *
     * @param _scope
     */
    resetCss:
        _scope => {
            cog.Util.applyStyle(_scope.dom, _scope.metadata.Style);
            cog.Util.applyClass(_scope.dom, _scope.metadata.Class);
            cog.Util.applyClass(_scope.dom, ...[cog.Util.getClasses(_scope.className).map(clazz => `cog${clazz.name}`)]);
        },

    /**
     * Recursively builds the child Elements on this Component
     *
     * @param _scope
     */
    buildChildren:
        _scope => {
            let dom = _scope.dom;
            if (dom) {
                // Recursively construct child Component Elements
                let elements = _scope.metadata.Elements;
                if (elements) {
                    for (let element in elements) {
                        cog.Factory.construct(element, elements[element], dom);
                    }
                }
            }
        },
};
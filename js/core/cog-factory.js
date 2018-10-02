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
     * This exists so that I don't have to write "cog.Blah.extends = cog.Component;" on every class that doesn't extend anything.
     */
    establishBaseComponent: () => {
        for (let key of Object.keys(cog)) {
            let property = cog[key];
            if (typeof property === "function" && !property.extends && property !== cog.Component) {
                property.extends = cog.Component;
            }
        };
    },

    /**
     * Constructs a new COG Component
     *
     * @param className
     * @param id
     * @param parentDom
     */
    construct: (id, className, parentDom) => {

        // Construction of abstract classes is not permitted
        if (cog[className].abstract) {
            console.error(`Cannot construct abstract class ${className}`);
            return;
        }

        // Construct the object using a closure to provide its own private scope
        ((id, className) => {

            // Construct the component
            this.component = new cog[className]();

            // Assign private scope properties
            this.id = parentDom ? `${parentDom.id}.${id}` : id;
            this.metadata = cog.Metadata.Components[className][id];
            this.className = className;
            this.super = {};

            // Build the componnt functions as proxies to prototypal functions, and inherit properties from parent class(es)
            cog.Factory.proxyToPrototype(this);
            cog.Factory.extend(this, this.component.constructor.extends);

            // Allow the object to construct itself
            this.component.construct(parentDom);

        })(id, className);
    },

    /**
     * Inherit component properties off the component's parent
     *
     * @param _this
     * @param parentClass
     */
    extend: (_this, parentClass) => {

        // Proxy inherited prototype properties
        if (parentClass) {
            for (let key of Object.keys(parentClass.prototype)) {
                if (!_this.component.hasOwnProperty(key)) {
                    _this.component[key] = $.proxy(parentClass.prototype[key], _this.component, _this);
                } else if (!_this.super[key]) {
                    _this.super[key] = $.proxy(parentClass.prototype[key], _this.component, _this);
                }
            }

            cog.Factory.extend(_this, parentClass.extends);
        }
    },

    /**
     * Proxy inherited prototype properties
     *
     * @param _this
     */
    proxyToPrototype: _this => {
        for (let key of Object.keys(_this.component.__proto__)) {
            _this.component[key] = $.proxy(_this.component.__proto__[key], _this.component, _this);
        }
    }
};
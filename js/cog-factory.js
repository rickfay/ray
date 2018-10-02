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
        ((id, className) => {

            // Construct the $component
            this.component = new cog[className]();
            this.id = parentDom ? `${parentDom.id}.${id}` : id;
            this.metadata = cog.Metadata.Components[className][id];
            this.className = className;

            // Component Build Pipeline:
            cog.Factory.proxyToPrototype(this.component, this);
            cog.Factory.extend(this, this.component.constructor.extends);

            this.component.construct();
            this.component.buildDom();

            cog.Factory.applyCss(this);
            cog.Util.appendDom(parentDom, this.dom);
            cog.Factory.buildChildren(this.component);

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
                }
            }

            cog.Factory.extend(_this, parentClass.extends);
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
     * Proxy inherited prototype properties
     *
     * @param $component
     * @param _this
     */
    proxyToPrototype: ($component, _this) => {
        for (let key of Object.keys($component.__proto__)) {
            $component[key] = $.proxy($component.__proto__[key], $component, _this);
        }
    },

    /**
     * Recursively builds the child Elements on this Component
     *
     * @param $component
     */
    buildChildren: $component => {
        let dom = $component.getDom();
        if (dom) {
            // Recursively construct child Component Elements
            let elements = $component.getMetadata().Elements;
            if (elements) {
                for (let element in elements) {
                    cog.Factory.construct(element, elements[element], dom);
                }
            }
        }
    }
};
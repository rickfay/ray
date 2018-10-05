/**
 * Component Object Generator Factory
 *
 * @type {{buildCogApp: cog.Factory.buildCogApp, construct: cog.Factory.construct, validate: (function(*, *): boolean), proxyPrototype: cog.Factory.proxyPrototype, proxyPrototypeFunctions: cog.Factory.proxyPrototypeFunctions, extend: cog.Factory.extend, resetCss: cog.Factory.resetCss, buildChildren: cog.Factory.buildChildren}}
 */
cog.Factory = {

    /**
     * Builds the COG Application
     *
     * @param appId
     */
    buildCogApp: function buildCogApp(appId) {
        cog.app = cog.Factory.construct(appId, cog.App[cog.Symbol.CLASS_NAME], null);
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

        // Construct the Component and its private Scope
        let obj = Object.create(cog[className]);
        let _this = Object.create(cog.Scope, {self: {value: obj}, super: {value: {}}});

        cog.Factory.proxyPrototype(obj, _this);

        // Allow the object to construct itself
        obj.construct(id, parentDom);

        return obj;
    },

    /**
     * Validates the ID and class name of the Component
     *
     * @param id
     * @param className
     * @returns {boolean}
     */
    validate: function validate(id, className) {
        let isValid = true;
        if (!cog.Util.ref(cog.Metadata.Elements, className, id)) {
            console.error(`Cannot construct non-static instance from metadata definition: { ${id}: ${className} }`);
            isValid = false;
        }
        return isValid;
    },

    /**
     *
     * @param obj
     * @param _this
     */
    proxyPrototype: function proxyPrototype(obj, _this) {

        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {

            for (let key of Object.keys(proto)) {
                if (cog.Util.isFunction(proto[key])) {
                    if (!obj.hasOwnProperty(key)) {
                        Object.defineProperty(obj, key, {
                            enumerable: true,
                            value: cog.Util.proxy(proto[key], _this)
                        });
                    } else if (!_this.super.hasOwnProperty(key)) {
                        Object.defineProperty(_this.super, key, {
                            enumerable: true,
                            value: cog.Util.proxy(proto[key], _this)
                        });
                    }
                }
            }

            proto = Object.getPrototypeOf(proto);
        }


        /*(function proxyPrototype(obj, _this, proto) {



            proxyPrototype(obj, _this, Object.getPrototypeOf(proto));

        })(obj, _this, Object.getPrototypeOf(obj));*/
    },

    /**
     * Recursively builds the child Elements on this Component
     *
     * @param obj
     */
    buildChildren: function buildChildren(obj) {
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
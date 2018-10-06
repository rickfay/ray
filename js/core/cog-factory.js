/**
 * Component Object Generator Factory
 */
cog.Class.define("Factory", null, {

    /**
     * Constructs a new COG Component
     *
     * @param id ID of the object
     * @param className COG Class of the object
     */
    construct: function construct(id, className) {

        // Validate
        if (!cog.Factory.validate(id, className)) {
            return null;
        }

        // Construct the Component and its private Scope
        let obj = Object.create(cog[className]);
        let _this = Object.create(cog.Scope, {self: {value: obj}, super: {value: {}}});

        cog.Factory.proxyPrototype(obj, _this);

        // Allow the object to construct itself
        obj.construct(id);

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

        return true; // FIXME remove this

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
    },

    /**
     * Recursively builds the child Elements on this Component
     *
     * @param obj
     */
    constructChildren: function buildChildren(obj) {

        let childElements = [];
        let elements = obj.getMetadata().Elements;

        if (elements) {
            for (let element of Object.keys(elements)) {
                childElements.push(cog.Factory.construct(`${obj.getId()}.${element}`, elements[element]));
            }
        }

        return childElements;
    },
});
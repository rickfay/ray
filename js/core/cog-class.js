/**
 * COG Class Interaction API
 */
cog.Class = (function Class() {

    /**
     *
     * @param obj
     * @param className
     */
    let assignMetaProperties = function assignMetaProperties(obj, className) {
        obj[cog.Symbol.CLASS_NAME] = className;
        obj[Symbol.toStringTag] = `cog.${className}`;
    };

    /**
     * Build Proxy references to prototype methods on the given obj, binding the proxy to the given context _this.
     *
     * @param obj
     * @param _this
     */
    let proxyPrototype = function proxyPrototype(obj, _this) {

        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {

            for (let key of Object.keys(proto)) {
                if (cog.Util.isFunction(proto[key]) && !obj.hasOwnProperty(key)) {
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        value: cog.Util.proxy(proto[key], _this)
                    });
                }
            }

            proto = Object.getPrototypeOf(proto);
        }
    };

    return {

        [cog.Symbol.CLASS_NAME]: "Class",
        [Symbol.toStringTag]: "cog.Class",

        /**
         * Builds a cog Class Definition to be later used as the prototype in constructing a cog object
         *
         * @param className
         * @param superClass
         * @param def
         */
        define: function define(className, superClass, def) {

            if (cog[className]) {
                console.error(`cog class "${className}" already exists`);
                return;
            }

            // Construct the class from its prototype definition, extending the given superClass if provided
            let classDef = superClass ? Object.create(superClass, Object.getOwnPropertyDescriptors(def)) : def;

            // Set meta properties of the class definition
            assignMetaProperties(classDef, className);

            // Attach the class definition to the cog API
            cog[className] = classDef;
        },

        /**
         * Constructs a singleton instance of a Class and appends it to the cog API.
         *
         * @param id
         * @param proto
         */
        singleton: function singleton(id, proto) {

            if (cog[id]) {
                console.error(`Singleton instance cog.${id} already exists`);
                return;
            }

            assignMetaProperties(proto, id);
            cog[id] = cog.Class.construct(proto, id);
        },

        /**
         * Constructs a new COG Component
         *
         * @param id ID of the object
         * @param proto COG Class prototype for the object
         * @param args
         */
        construct: function construct(proto, id, ...args) {

            // Allow construction by passing in either the name or prototype definition of an object
            if (typeof proto === "string") {
                proto = cog[proto];
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            // FIXME Add back validation

            // Construct the Component and its private Scope
            let obj = Object.create(proto);
            let _this = Object.create(cog.Scope, {self: {value: obj}});

            proxyPrototype(obj, _this);

            // Allow the object to construct itself
            obj.construct(id, ...args);

            return obj;
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
                    childElements.push(cog.Class.construct(elements[element], `${obj.getId()}.${element}`));
                }
            }

            return childElements;
        },

        /**
         *
         * @param _this
         * @param fn
         * @returns {*}
         */
        super: function (_this, fn) {

            // First locate the prototype of the normal function call
            let proto = Object.getPrototypeOf(_this.self);
            while (proto && !proto.hasOwnProperty(fn)) {
                proto = Object.getPrototypeOf(proto);
            }

            // Attempt to find a super reference to call
            let superProto = Object.getPrototypeOf(proto);
            while (superProto && !superProto.hasOwnProperty(fn)) {
                superProto = Object.getPrototypeOf(superProto);
            }

            // Call the super class's function if it exists, applying our current scope and any arguments
            if (superProto.hasOwnProperty(fn)) {
                return superProto[fn].apply(_this, Array.prototype.slice.call(arguments, 2));
            } else {
                console.error(`No superclass definition found for cog.${_this.self.getClassName()}.${fn}`);
            }
        }
    }
})();
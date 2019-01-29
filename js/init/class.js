/**
 * COG Class Interaction API
 *
 * @namespace cog.Class
 */
cog.Class = (function Class() {

    /**
     * Assign Meta properties to the object
     *
     * @param obj
     * @param name
     */
    function assignMetaProperties(obj, name) {
        obj[cog.Symbol.CLASS_NAME] = name;
        obj[Symbol.toStringTag] = `cog.${name}`;
    }

    /**
     * Instantiate the cog object from the given prototype
     *
     * @param proto
     * @param def
     * @param args
     */
    function instantiate(proto, def, ...args) {

        let obj = Object.create(proto);
        proxyPrototype(obj, {obj: obj});

        if (obj.construct) {
            obj.construct(def, ...args);
        }

        return obj;
    }

    /**
     * Build Proxy references to prototype methods on the given obj, binding the proxy to the given scope context.
     *
     * Ignores Symbols.
     *
     * @param obj
     * @param scope
     */
    function proxyPrototype(obj, scope) {

        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {
            for (let key of Object.keys(proto)) {
                if (typeof proto[key] === "function" && !obj.hasOwnProperty(key)) {

                    // Define a proxy function bound to the given scope
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        value: ((fn, scope) => {
                            return function proxy() {
                                return fn.apply(scope, arguments);
                            };
                        })(proto[key], scope)
                    });
                }
            }

            proto = Object.getPrototypeOf(proto);
        }
    }

    return {

        [cog.Symbol.CLASS_NAME]: "Class",
        [Symbol.toStringTag]: "cog.Class",

        /**
         * Constructs a new COG Component
         *
         * @param def ID of the object
         * @param proto COG Class prototype for the object
         * @param args Any arguments to pass to the constructor
         */
        new: function (proto, def, ...args) {

            // Allow construction by passing in either the name or prototype definition of an object
            if (typeof proto === "string") {
                proto = cog[proto];
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            // FIXME Add back validation

            return instantiate(proto, def, ...args);
        },

        /**
         * Constructs a service instance of a Class and appends it to the cog API.
         *
         * @param name
         * @param proto
         */
        service: function service(name, proto) {

            if (cog[name]) {
                console.error(`Service instance cog.${name} already exists`);
                return;
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            assignMetaProperties(proto, name);
            cog[name] = instantiate(proto, name);
        },

        /**
         * Appends a Utility object definition to the cog API
         *
         * @param name
         * @param obj
         */
        util: function util(name, obj) {

            if (cog[name]) {
                console.error(`Utility cog.${name} already exists`);
            } else if (typeof obj !== "object") {
                console.error(`Cannot create Utility from non-object: ${obj}`);
            }

            assignMetaProperties(obj, name);
            cog[name] = obj;
        },

        /**
         *
         * @param scope
         * @param fn
         * @returns {*}
         */
        super: function (scope, fn) {

            // First locate the prototype of the normal function call
            let proto = Object.getPrototypeOf(scope.obj);
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
                return superProto[fn].apply(scope, Array.prototype.slice.call(arguments, 2));
            } else {
                console.warn(`No superclass definition found for cog.${scope.obj.getClassName()}.${fn}`);
            }
        }
    }
})();
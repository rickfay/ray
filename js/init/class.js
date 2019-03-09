/**
 * Ray Class Interaction API
 *
 * @namespace ray.Class
 */
ray.Class = (function Class() {

    /**
     * Assign Meta properties to the object
     *
     * @param obj
     * @param name
     */
    function assignMetaProperties(obj, name) {
        obj[ray.Symbol.CLASS_NAME] = name;
        obj[Symbol.toStringTag] = `ray.${name}`;
    }

    /**
     * Instantiate the ray object from the given prototype
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

        [ray.Symbol.CLASS_NAME]: "Class",
        [Symbol.toStringTag]: "ray.Class",

        /**
         * Constructs a new Ray Component
         *
         * @param def ID of the object
         * @param proto Ray Class prototype for the object
         * @param args Any arguments to pass to the constructor
         */
        new: function (proto, def, ...args) {

            // Allow construction by passing in either the name or prototype definition of an object
            if (typeof proto === "string") {
                proto = ray[proto];
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            // FIXME Add back validation

            return instantiate(proto, def, ...args);
        },

        /**
         * Constructs a service instance of a Class and appends it to the ray API.
         *
         * @param name
         * @param proto
         */
        service: function service(name, proto) {

            if (ray[name]) {
                console.error(`Service instance ray.${name} already exists`);
                return;
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            assignMetaProperties(proto, name);
            ray[name] = instantiate(proto, name);
        },

        /**
         * Appends a Utility object definition to the ray API
         *
         * @param name
         * @param obj
         */
        util: function util(name, obj) {

            if (ray[name]) {
                console.error(`Utility ray.${name} already exists`);
            } else if (typeof obj !== "object") {
                console.error(`Cannot create Utility from non-object: ${obj}`);
            }

            assignMetaProperties(obj, name);
            ray[name] = obj;
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
                console.warn(`No superclass definition found for ray.${scope.obj.getClassName()}.${fn}`);
            }
        }
    }
})();
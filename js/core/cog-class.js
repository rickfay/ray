/**
 * COG Class Interaction API
 */
cog.Class = (function Class() {


    /**
     *
     * @param proto
     */
    let instantiate = function instantiate(proto) {
        let obj = Object.create(proto);
        let scope = Object.create(cog.Scope, {self: {value: obj}});
        proxyPrototype(obj, scope);
        return obj;
    };

    /**
     * Build Proxy references to prototype methods on the given obj, binding the proxy to the given scope context
     *
     * @param obj
     * @param scope
     */
    let proxyPrototype = function proxyPrototype(obj, scope) {

        let proto = Object.getPrototypeOf(obj);

        while (proto && proto !== Object.prototype) {
            for (let key of Object.keys(proto)) {
                if (cog.Util.isFunction(proto[key]) && !obj.hasOwnProperty(key)) {
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        value: cog.Util.proxy(proto[key], scope)
                    });
                }
            }

            proto = Object.getPrototypeOf(proto);
        }
    };

    /**
     *
     * @param obj
     * @param className
     */
    let assignMetaProperties = function assignMetaProperties(obj, className) {
        obj[cog.Symbol.CLASS_NAME] = className;
        obj[Symbol.toStringTag] = `cog.${className}`;
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

            let obj = instantiate(proto);

            if (obj.construct) {
                obj.construct(id);
            }

            cog[id] = obj;
        },

        /**
         * Constructs a new COG Component
         *
         * @param id ID of the object
         * @param proto COG Class prototype for the object
         * @param parentScope The Parent Objects's Scope
         */
        construct: function construct(proto, id, parentScope) {

            // Allow construction by passing in either the name or prototype definition of an object
            if (typeof proto === "string") {
                proto = cog[proto];
            } else if (typeof proto !== "object") {
                console.error(`Cannot construct class from prototype: ${proto}`);
                return;
            }

            // FIXME Add back validation

            let obj = instantiate(proto);

            obj.construct(id, parentScope);

            return obj;
        },

        /**
         * Builds the child Elements on this Component
         *
         * @param scope
         */
        constructChildren: function buildChildren(scope) {

            let elements = scope.self.getMetadata().Elements;
            let childElements = [];

            if (elements) {
                for (let element of Object.keys(elements)) {
                    childElements.push(cog.Class.construct(elements[element], element, scope));
                }
            }

            return childElements;
        },

        /**
         *
         * @param scope
         * @param fn
         * @returns {*}
         */
        super: function (scope, fn) {

            // First locate the prototype of the normal function call
            let proto = Object.getPrototypeOf(scope.self);
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
                console.error(`No superclass definition found for cog.${scope.self.getClassName()}.${fn}`);
            }
        }
    }
})();
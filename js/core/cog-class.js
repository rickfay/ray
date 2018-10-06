/**
 * COG Class Interaction API
 */
cog.Class = {

    [cog.Symbol.CLASS_NAME]: "Class",
    [Symbol.toStringTag]: "cog.Class",

    /**
     * Builds a cog Class Definition.
     *
     * @param className
     * @param superClass
     * @param def
     */
    define: function define(className, superClass, def) {

        // Classes should only be defined once
        if (cog[className]) {
            console.error(`cog class "${className}" already exists`);
            return;
        }

        // Construct the class from its prototype definition, extending the given superClass if provided
        let classDef = superClass ? Object.create(superClass, Object.getOwnPropertyDescriptors(def)) : def;

        // Set meta properties of the class definition
        classDef[cog.Symbol.CLASS_NAME] = className;
        classDef[Symbol.toStringTag] = `cog.${className}`;

        // Attach the class definition to the cog API
        cog[className] = classDef;
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
    },

    /**
     *
     * @param obj
     * @param property
     */
    makePrivate: function makePrivate(obj, property) {

        if (!obj[property]) {
            console.error(`Cannot make non-existant property ${propery} private on Object ${obj}`);
            return;
        }

        Object.defineProperty(obj, property, Object.assign(Object.getOwnPropertyDescriptors(obj[property]), {enumerable: false}))
    }
};
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
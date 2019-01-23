/**
 * cog Prototype Utility
 *
 * @namespace cog.Prototype
 */
cog.Class.util("Prototype", {

    /**
     * Builds a cog Prototype definition to be later used as the prototype in constructing a cog object
     *
     * @param name
     * @param parent
     * @param def
     */
    define: function define(name, parent, def) {

        if (cog[name]) {
            console.error(`cog prototype "${name}" already exists`);
            return;
        }

        // Construct the prototype definition, extending from a parent prototype if provided
        let proto = parent ? Object.create(parent, Object.getOwnPropertyDescriptors(def)) : def;

        // Set meta properties of the prototype definition
        proto[cog.Symbol.CLASS_NAME] = name;
        proto[Symbol.toStringTag] = `cog.${name}`;

        // Attach the class definition to the cog API
        cog[name] = proto;
    }
});
/**
 * Ray Prototype Utility
 *
 * @namespace ray.Prototype
 */
ray.Class.util("Prototype", {

    /**
     * Builds a ray Prototype definition to be later used as the prototype in constructing a ray object
     *
     * @param name
     * @param parent
     * @param def
     */
    define: function define(name, parent, def) {

        if (ray[name]) {
            console.error(`ray prototype "${name}" already exists`);
            return;
        }

        // Construct the prototype definition, extending from a parent prototype if provided
        let proto = parent ? Object.create(parent, Object.getOwnPropertyDescriptors(def)) : def;

        // Set meta properties of the prototype definition
        proto[ray.Symbol.CLASS_NAME] = name;
        proto[Symbol.toStringTag] = `ray.${name}`;

        // Attach the class definition to the ray API
        ray[name] = proto;
    }
});
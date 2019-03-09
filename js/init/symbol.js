/**
 * Ray Framework Private Symbol Registry
 */
ray.Symbol = {

    [Symbol.toStringTag]: "ray.Symbol",

    /**
     * Name of the ray Class
     */
    CLASS_NAME: undefined
};

// Attach unique Symbols to ray.Symbol
for (let key of Object.keys(ray.Symbol)) {
    ray.Symbol[key] = Symbol(key);
}
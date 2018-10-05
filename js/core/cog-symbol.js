/**
 * COG Framework Private Symbol Registry
 *
 * @type {{CLASS_NAME: Symbol}}
 */
cog.Symbol = {

    [Symbol.toStringTag]: "cog.Symbol",

    /**
     * Name of the COG Class
     */
    CLASS_NAME: undefined
};

// Attach unique Symbols to cog.Symbol
for (let key in cog.Symbol) {
    cog.Symbol[key] = Symbol(key);
}
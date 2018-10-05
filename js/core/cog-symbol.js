/**
 * COG Framework Private Symbol Registry
 */
cog.Symbol = {

    [Symbol.toStringTag]: "cog.Symbol",

    /**
     * Name of the COG Class
     */
    CLASS_NAME: undefined
};

// Attach unique Symbols to cog.Symbol
for (let key of Object.keys(cog.Symbol)) {
    cog.Symbol[key] = Symbol(key);
}
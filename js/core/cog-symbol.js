/**
 * COG Framework Private Symbol Registry
 *
 * @type {{}}
 */
cog.Symbol = {
    CLASS_NAME: 0
};

// Attach unique Symbols to the cog.Symbol
for (let key of Object.keys(cog.Symbol)) {
    cog.Symbol[key] = Symbol(key);
}
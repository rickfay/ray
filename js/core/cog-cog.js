/**
 * COG Base Object
 */
cog.Class.define("Cog", null, {

    /**
     * Default constructor
     */
    construct: function construct() {
        console.debug(`No constructor defined for ${this.self.getClassName()}`);
    },

    /**
     * Get the Cog Class Name
     */
    getClassName: function getClassName() {
        return this.self[cog.Symbol.CLASS_NAME];
    }
});
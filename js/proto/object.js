/**
 * COG Base Object
 */
cog.Prototype.define("Object", null, {

    /**
     * Get the Cog Class Name
     */
    getClassName: function getClassName() {
        return this.obj[cog.Symbol.CLASS_NAME];
    }
});
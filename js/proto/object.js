/**
 * Ray Base Object
 *
 * @namespace ray.Object
 */
ray.Prototype.define("Object", null, {

    /**
     * Get the ray Class Name
     */
    getClassName: function getClassName() {
        return this.obj[ray.Symbol.CLASS_NAME];
    }
});
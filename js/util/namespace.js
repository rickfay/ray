/**
 * cog Namespace utilities
 */
cog.Class.util("Namespace", {

    /**
     * Build the namespace from appending the element ID to the parent namespace
     *
     * @param parentNamespace
     * @param id
     * @returns {string}
     */
    build: function buildNamespace(parentNamespace, id) {
        return `${parentNamespace}.${id}`;
    },

    /**
     *
     *
     * @param namespace
     * @returns {string}
     */
    getId: function getId(namespace) {
        if (typeof namespace === "string") {
            return namespace.substring(namespace.lastIndexOf(".") + 1);
        } else {
            console.error(`Provided namespace ${namespace} is not a string`);
        }
    },

    /**
     *
     * @param namespace
     * @returns {string}
     */
    getRoot: function getRoot(namespace) {
        if (typeof namespace === "string") {
            return namespace.substring(0, namespace.indexOf(".")) || namespace;
        } else {
            console.error(`Provided namespace ${namespace} is not a string`);
        }
    }
});
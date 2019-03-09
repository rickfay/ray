/**
 * Ray Namespace utilities
 */
ray.Class.util("Namespace", (function Namespace() {

    // Private closure scope

    function logNamespaceError(namespace) {
        console.error(`Provided namespace ${namespace} is not a string`);
    }

    // Return Public API
    return {

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
                logNamespaceError(namespace);
            }
        },

        /**
         *
         * @param namespace
         * @returns {string}
         */
        getRoot: function getRoot(namespace) {
            if (typeof namespace !== "string") {
                logNamespaceError(namespace);
            }

            return namespace.substring(0, namespace.indexOf(".")) || namespace;
        },

        /**
         * Get the namespace of the parent. In effect this is just chopping off the ID
         * of the current element.
         *
         * @param namespace
         * @returns {string}
         */
        getParent: function getParent(namespace) {
            if (typeof namespace !== "string") {
                logNamespaceError(namespace);
            }

            return namespace.substring(0, namespace.lastIndexOf("."));
        }
    }
})());
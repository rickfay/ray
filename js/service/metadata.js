/**
 * Ray Metadata data-store
 */
ray.Class.service("Metadata", {

    /**
     * Constructor
     */
    construct: function construct() {
        this.metadata = {};
    },

    /**
     * Add App Metadata to the private Ray Metadata store
     *
     * @param appId
     * @param metadata
     */
    addAppMetadata: function addAppMetadata(appId, metadata) {
        this.metadata[appId] = metadata;
    },

    /**
     * Get the metadata definition for the given object
     *
     * @param obj
     * @returns {*}
     */
    get: function get(obj) {

        let metadata;

        if (typeof obj === "string") {
            metadata = ray.Util.ref(this.metadata, ...obj.split("."));
        } else if (typeof obj === "object") {
            let appId = ray.Namespace.getRoot(obj.getNamespace());
            let id = ray.Namespace.getId(obj.getNamespace());
            let className = obj.getClassName();

            metadata = ray.Util.ref(this.metadata, appId, "Elements", className, id);
        }

        if (!metadata) {
            console.warn(`No metadata definition found for object ${className} with ID: ${id} in App ${appId}`);
        }

        return metadata;
    }
});
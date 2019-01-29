/**
 * cog Metadata data-store
 */
cog.Class.service("Metadata", {

    /**
     * Constructor
     */
    construct: function construct() {
        this.metadata = {};
    },

    /**
     * Add App Metadata to the private cog Metadata store
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
            metadata = cog.Util.ref(this.metadata, ...obj.split("."));
        } else if (typeof obj === "object") {
            let appId = cog.Namespace.getRoot(obj.getNamespace());
            let id = cog.Namespace.getId(obj.getNamespace());
            let className = obj.getClassName();

            metadata = cog.Util.ref(this.metadata, appId, "Elements", className, id);
        }

        if (!metadata) {
            console.warn(`No metadata definition found for object ${className} with ID: ${id} in App ${appId}`);
        }

        return metadata;
    }
});
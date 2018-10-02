/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 *
 * @constructor
 */
cog.Component = function Component() {};

(proto => {

    /**
     * Construct the Component
     *
     * @param _this
     */
    proto.construct = function construct(_this) {
        // TODO put something here
    };

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        // TODO put something here
    };

    /**
     * Get the ID of this Component
     *
     * @param _this
     * @returns {*}
     */
    proto.getId = function getId(_this) {
        return _this.id;
    };

    /**
     * Get the Metadata
     *
     * @param _this
     * @returns {*|SVGMetadataElement}
     */
    proto.getMetadata = function getMetadata(_this) {
        return _this.metadata;
    }

    /**
     * Get the DOM
     *
     * @param _this
     * @returns {*}
     */
    proto.getDom = function getDom(_this) {
        return _this.dom;
    };

})(cog.Component.prototype);
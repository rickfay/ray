/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 *
 * @constructor
 */
cog.Component = function Component() {};
cog.Component.abstract = true;

(proto => {

    /**
     * Construct the Component
     *
     * @param _this
     * @param parentDom
     */
    proto.construct = function construct(_this, parentDom) {
        _this.component.buildDom();
        cog.Util.applyCss(_this);
        cog.Util.appendDom(parentDom, _this.dom);
        cog.Util.buildChildren(_this.component);
    };

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("div");
        _this.dom.id = _this.id;
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
    };

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
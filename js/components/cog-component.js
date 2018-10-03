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
     * @param _scope
     * @param parentDom
     */
    proto.construct = function construct(_scope, parentDom) {
        this.buildDom();
        cog.Factory.resetCss(_scope);
        cog.Util.appendDom(parentDom, _scope.dom);
        cog.Factory.buildChildren(_scope);
    };

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("div");
        _scope.dom.id = _scope.id;
    };

    /**
     * Get the ID of this Component
     *
     * @param _scope
     * @returns {*}
     */
    proto.getId = function getId(_scope) {
        return _scope.id;
    };

    /**
     * Get the Metadata
     *
     * @param _scope
     * @returns {*|SVGMetadataElement}
     */
    proto.getMetadata = function getMetadata(_scope) {
        return _scope.metadata;
    };

    /**
     * Get the DOM
     *
     * @param _scope
     * @returns {*}
     */
    proto.getDom = function getDom(_scope) {
        return _scope.dom;
    };

})(cog.Component.prototype);
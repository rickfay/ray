/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 *
 * @constructor
 */
cog.Component = function Component() {};
cog.Component.extends = cog.Cog;

    /**
     * Construct the Component
     *
     * @param _scope
     * @param id
     * @param className
     * @param parentDom
     */
    cog.Component.prototype.construct = function construct(_scope, id, className, parentDom) {
        _scope.metadata = cog.Metadata.Components[className][id];
        _scope.id = parentDom ? `${parentDom.id}.${id}` : id;
        _scope.className = className;

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
    cog.Component.prototype.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("div");
        _scope.dom.id = _scope.id;
    };

    /**
     * Get the ID of this Component
     *
     * @param _scope
     * @returns {*}
     */
    cog.Component.prototype.getId = function getId(_scope) {
        return _scope.id;
    };

    /**
     * Get the Metadata
     *
     * @param _scope
     * @returns {*|SVGMetadataElement}
     */
    cog.Component.prototype.getMetadata = function getMetadata(_scope) {
        return _scope.metadata;
    };

    /**
     * Get the DOM
     *
     * @param _scope
     * @returns {*}
     */
    cog.Component.prototype.getDom = function getDom(_scope) {
        return _scope.dom;
    };
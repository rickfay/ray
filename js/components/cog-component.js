/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 *
 * @constructor
 */
cog.Component = function Component() {};
cog.Component.extends = cog.Cog;

(proto => {

    /**
     * Construct the Component
     *
     * @param id
     * @param className
     * @param parentDom
     */
    proto.construct = function construct(id, className, parentDom) {
        this.metadata = cog.Metadata.Components[className][id];
        this.id = parentDom ? `${parentDom.id}.${id}` : id;
        this.className = className;

        this.self.buildDom();
        cog.Factory.resetCss(this);
        cog.Util.appendDom(parentDom, this.dom);
        cog.Factory.buildChildren(this);
    };

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.id;
    };

    /**
     * Get the ID of this Component
     *
     * @returns {*}
     */
    proto.getId = function getId() {
        return this.id;
    };

    /**
     * Get the Metadata
     *
     * @returns {*|SVGMetadataElement}
     */
    proto.getMetadata = function getMetadata() {
        return this.metadata;
    };

    /**
     * Get the DOM
     *
     * @returns {*}
     */
    proto.getDom = function getDom() {
        return this.dom;
    };

})(cog.Component.prototype);
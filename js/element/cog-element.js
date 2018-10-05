/**
 * COG Element
 */
cog.Class.define("Element", cog.Cog, {

    /**
     * Construct the Component
     *
     * @param id
     * @param parentDom
     */
    construct: function construct(id, parentDom) {

        // Set properties
        this.metadata = cog.Metadata.Elements[this.self.getClassName()][id];
        this.id = parentDom ? `${parentDom.id}.${id}` : id;

        // Build
        this.self.buildDom();
        this.self.resetCss();

        // FIXME parent should be in charge of adding child elements
        cog.Util.appendDom(parentDom, this.dom);

        cog.Factory.buildChildren(this.self);
    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.id;
    },

    /**
     * Get the ID of this Component
     *
     * @returns {*}
     */
    getId: function getId() {
        return this.id;
    },

    /**
     * Get the Metadata
     *
     * @returns {*|SVGMetadataElement}
     */
    getMetadata: function getMetadata() {
        return this.metadata;
    },

    /**
     * Get the DOM
     *
     * @returns {*}
     */
    getDom: function getDom() {
        return this.dom;
    },

    /**
     * Resets the CSS to the default as specified by the metadata
     */
    resetCss: function resetCss() {
        this.dom.removeAttribute("class");
        cog.Util.applyStyle(this.dom, this.metadata.Style);
        cog.Util.applyClass(this.dom, this.metadata.Class);
        cog.Util.applyClass(this.dom, ...[cog.Util.getCogClasses(this.self).map(clazz => `cog${clazz}`)]);
    }
});
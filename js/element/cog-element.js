/**
 * COG Element
 */
cog.Class.define("Element", cog.Cog, {

    /**
     * Construct the Component
     *
     * @param id
     */
    construct: function construct(id) {

        // Set properties
        this.metadata = cog.Metadata.Elements[this.self.getClassName()][id.substring(id.lastIndexOf(".") + 1)];
        this.id = id;

        // Build
        this.self.buildDom();
        this.self.resetCss();

        // Construct the children and append them to this element's DOM
        for (let childElement of cog.Factory.constructChildren(this.self)) {
            cog.Util.appendDom(this.dom, childElement.getDom());
        }
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
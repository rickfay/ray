/**
 * COG Element
 */
cog.Class.define("Element", cog.Cog, {

    /**
     * Construct the Component
     *
     * @param id
     * @param parentScope
     */
    construct: function construct(id, parentScope) {

        // Set properties
        this.id = `${parentScope.id}.${id}`;
        this.metadata = cog.Util.getMetadata(this.self);
        this.self.buildDom();
        parentScope.dom.appendChild(this.dom);
        this.children = cog.Class.constructChildren(this);
    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.id;
        this.self.resetCss();

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
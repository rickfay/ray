/**
 * COG Element
 */
cog.Prototype.define("Element", cog.Object, {

    /**
     * Construct the Component
     *
     * @param id
     * @param parentScope
     */
    construct: function construct(id, parent) {
        this.namespace = cog.Namespace.build(parent.getNamespace(), id);
        this.metadata = cog.Metadata.get(this.self);
        this.self.buildDom();
        parent.getDom().appendChild(this.dom);
        this.children = cog.Class.buildChildElements(this.self);
    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.namespace;
        this.self.resetCss();
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
     *
     * @returns {*}
     */
    getMetadata: function getMetadata() {
        return this.metadata;
    },

    /**
     * Get the ID of this Component
     *
     * @returns {*}
     */
    getNamespace: function getNamespace() {
        return this.namespace;
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
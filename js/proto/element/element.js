/**
 * COG Element
 */
cog.Prototype.define("Element", cog.Object, {

    /**
     * Construct the Component
     *
     * @param id
     * @param parent
     */
    construct: function construct(id, namespace) {
        this.namespace = cog.Namespace.build(namespace, id);
        this.id = this.namespace;
        this.metadata = cog.Metadata.get(this.obj);
        this.obj.buildDom();
        this.obj.buildChildren();
    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.namespace;
        this.obj.resetCss();
    },

    /**
     * Builds the children using a generic strategy
     */
    buildChildren: function buildChildren() {
        let elements = this.obj.getMetadata().Elements;
        if (elements) {
            for (let element of Object.keys(elements)) {
                this.dom.appendChild(cog.Class.new(elements[element], element, this.namespace).getDom());
            }
        }
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
        cog.Util.applyClass(this.dom, ...[cog.Util.getCogClasses(this.obj).map(clazz => `cog${clazz}`)]);
    }
});
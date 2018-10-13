/**
 * COG App Component Definition
 */
cog.Prototype.define("App", cog.Element, {

    /**
     * Construct the Component
     *
     * @param id
     */
    construct: function construct(id) {
        this.namespace = id;
        this.metadata = cog.Metadata.get(this.self);
        this.self.buildDom();
        this.children = cog.Class.buildChildElements(this.self);
    },

    /**
     * The App DOM doesn't need to be built it should already exist,
     * so retrieve it from the cog.Root service.
     */
    buildDom: function buildDom() {
        this.dom = cog.Root.getAppDom(this.namespace);
        this.dom.id = this.namespace;
        this.self.resetCss();
    }
});
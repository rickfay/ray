/**
 * Ray App Component Definition
 */
ray.Prototype.define("App", ray.Element, {

    /**
     * Construct the Component
     *
     * @param id
     */
    construct: function construct(id) {
        this.namespace = id;
        this.metadata = ray.Metadata.get(this.obj);
        this.obj.buildDom();
        this.obj.buildChildren();
    },

    /**
     * The App DOM doesn't need to be built it should already exist,
     * so retrieve it from the ray.Root service.
     */
    buildDom: function buildDom() {
        this.dom = ray.Root.getAppDom(this.namespace);
        this.dom.id = this.namespace;
        this.obj.resetCss();
    }
});
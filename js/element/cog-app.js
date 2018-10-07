/**
 * COG App Component Definition
 */
cog.Class.define("App", cog.Element, {

    /**
     * Construct the Component
     *
     * @param id
     * @param parentScope
     */
    construct: function construct(id, parentScope) {

        // Set properties
        this.id = id;
        this.metadata = cog.Util.getMetadata(this.self);
        this.self.buildDom(parentScope);
        this.children = cog.Class.constructChildren(this);
    },

    /**
     * Fetch
     * @param parentScope
     */
    buildDom: function buildDom(parentScope) {
        this.dom = parentScope.appDoms[this.id];
        this.dom.id = this.id;
        this.self.resetCss();
    }
});
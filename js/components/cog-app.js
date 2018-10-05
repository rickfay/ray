/**
 * COG App Component Definition
 */
cog.Class.define("App", cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = cog.Root;
        this.dom.id = this.id;
    }
});
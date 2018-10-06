/**
 * COG App Component Definition
 */
cog.Class.define("App", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = cog.Root[this.id];
        this.dom.id = this.id;
    }
});
/**
 * Cog Table Class Definition
 */
cog.Class.define("Table", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("table");
        this.dom.id = this.id;
    }
});
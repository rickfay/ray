/**
 * Cog Table Class Definition
 */
cog.Prototype.define("Table", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("table");
        this.dom.id = this.id;
    }
});
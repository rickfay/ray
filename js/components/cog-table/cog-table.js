/**
 * Cog Table Class Definition
 */
cog.Class.define("Table", cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.dom = document.createElement("table");
            this.dom.id = this.id;
        }
    }
});
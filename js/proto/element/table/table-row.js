/**
 * COG Table Row Class
 */
cog.Prototype.define("TableRow", cog.Element, {

    construct: function construct(id, parent) {
        this.obj.buildDom();

    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("tr");
        this.dom.id = this.id;
    },

    buildChildren: function buildChildren() {}
});
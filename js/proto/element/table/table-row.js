/**
 * Ray Table Row Class
 */
ray.Prototype.define("TableRow", ray.Element, {

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
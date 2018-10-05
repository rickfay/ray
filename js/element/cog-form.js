/**
 * COG Form Class Definition
 */
cog.Class.define("Form", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("form");
        this.dom.id = this.id;
    }
});
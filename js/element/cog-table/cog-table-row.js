/**
 * COG Table Row Class
 */
cog.Class.define("TableRow", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("tr");
        this.dom.id = this.id;

        // TODO The rest
    }
});
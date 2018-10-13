/**
 * COG Table Row Class
 */
cog.Prototype.define("TableRow", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("tr");
        this.dom.id = this.id;

        // TODO The rest
    }
});
/**
 * COG Table Row Class
 *
 * @type {*|{}}
 */
cog.Class.define("TableRow", cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("tr");
        this.dom.id = this.id;

        // TODO The rest
    }
});
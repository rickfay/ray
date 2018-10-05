/**
 * COG Container Component Definition
 */
cog.Class.define("Container", cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.id;
    }
});
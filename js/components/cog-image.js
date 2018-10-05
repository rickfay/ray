/**
 * COG Image Class Definition
 */
cog.Class.define("Image", cog.Component, {

    /**
     * Builds the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("img");
        this.dom.id = this.id;
        this.dom.src = this.metadata.Source;
        this.dom.alt = this.metadata.AltText;
    }
});
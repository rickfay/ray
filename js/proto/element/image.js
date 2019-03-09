/**
 * Ray Image Class Definition
 */
ray.Prototype.define("Image", ray.Element, {

    /**
     * Builds the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("img");
        this.dom.id = this.id;
        this.dom.src = this.metadata.Source;
        this.dom.alt = this.metadata.AltText;
        this.obj.resetCss();
    }
});
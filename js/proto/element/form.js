/**
 * Ray Form Class Definition
 */
ray.Prototype.define("Form", ray.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("form");
        this.dom.id = this.id;
        this.obj.resetCss();
    }
});
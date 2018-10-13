/**
 * COG Form Class Definition
 */
cog.Prototype.define("Form", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("form");
        this.dom.id = this.id;
        this.self.resetCss();
    }
});
ray.Prototype.define("Label", ray.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("label");
        this.dom.id = this.id;
        this.dom.innerHTML = this.metadata.Text;
        this.obj.resetCss();
    }
});
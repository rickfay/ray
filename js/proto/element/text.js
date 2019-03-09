/**
 * Ray Text Component Definition
 *
 * @type {*|{}}
 */
ray.Prototype.define("Text", ray.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("span");
        this.dom.id = this.id;
        this.dom.innerHTML = this.metadata.Text;
        this.obj.resetCss();
    }
});
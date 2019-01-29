/**
 * COG Text Component Definition
 *
 * @type {*|{}}
 */
cog.Prototype.define("Text", cog.Element, {

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
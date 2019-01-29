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
        this.dom = document.createElement("p");
        this.dom.id = this.id;
        this.dom.innerHTML = this.metadata.Text;
        this.obj.resetCss();
    },

    toggleEdit: function toggleEdit() {
        if (this.dom.style.visibility === "hidden") {
            this.dom.style.visibility = "visible";
        } else {
            this.dom.style.visibility = "hidden";
        }
    }
});
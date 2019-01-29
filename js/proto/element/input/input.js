/**
 * COG Input Class
 */
cog.Prototype.define("Input", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("input");
        this.dom.id = this.namespace;
    },

    toggleEdit: function toggleEdit() {
        if (this.dom.style.visibility === "hidden") {
            this.dom.style.visibility = "visible";
        } else {
            this.dom.style.visibility = "hidden";
        }
    }
});
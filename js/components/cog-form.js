/**
 * COG Form Class Definition
 */
cog.Form = Object.create(cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.dom = document.createElement("form");
            this.dom.id = this.id;
        }
    }
});
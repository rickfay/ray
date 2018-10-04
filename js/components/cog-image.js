/**
 * COG Image Class Definition
 */
cog.Image = Object.create(cog.Component, {

    /**
     * Builds the DOM
     */
    buildDom: {
        enumerable: true, value: function buildDom() {
            this.dom = document.createElement("img");
            this.dom.id = this.id;
            this.dom.src = this.metadata.Source;
            this.dom.alt = this.metadata.AltText;
        }
    }
});
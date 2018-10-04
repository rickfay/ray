/**
 * COG Image Class Definition
 */
cog.Image = {
    proto: Object.create(cog.Component.proto, {

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
    })
};
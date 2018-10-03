/**
 * COG Image Class Definition
 *
 * @constructor
 */
cog.Image = function Image() {};
cog.Image.extends = cog.Component;

(proto => {

    /**
     * Builds the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("img");
        this.dom.id = this.id;
        this.dom.src = this.metadata.Source;
        this.dom.alt = this.metadata.AltText;
    }

})(cog.Image.prototype);
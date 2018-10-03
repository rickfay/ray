/**
 * COG Text Component Definition
 *
 * @constructor
 */
cog.Text = function Text() {};
cog.Text.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("p");
        this.dom.id = this.id;
        this.dom.innerHTML = this.metadata.Text;
    }

})(cog.Text.prototype);
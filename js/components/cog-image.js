/**
 * COG Image Class Definition
 *
 * @constructor
 */
cog.Image = function Image() {};

(proto => {

    /**
     * Builds the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("img");
        _this.dom.id = _this.id;
        _this.dom.src = _this.metadata.Source;
        _this.dom.alt = _this.metadata.AltText;
    }

})(cog.Image.prototype);
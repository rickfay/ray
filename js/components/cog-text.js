/**
 * COG Text Component Definition
 *
 * @constructor
 */
cog.Text = function Text() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("p");
        _this.dom.id = _this.id;
        _this.dom.innerHTML = _this.metadata.Text;
    }

})(cog.Text.prototype);
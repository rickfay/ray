/**
 * COG Form Class Definition
 *
 * @constructor
 */
cog.Form = function Form() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("form");
        _this.dom.id = _this.id;
    };

})(cog.Form.prototype);

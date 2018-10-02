/**
 *
 * @constructor
 */
cog.InputDate = function InputDate() {};
cog.InputDate.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.super.buildDom();
        _this.dom.type = "date";
    };

})(cog.InputDate.prototype);
/**
 * COG Input Text Class Definition
 * extends cog.Input
 *
 * @constructor
 */
cog.InputRadio = function InputRadio() {};
cog.InputRadio.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        cog.Util._super("buildDom", _this);
        _this.dom.type = "radio";
        _this.dom.innerHTML = _this.metadata.Label;
        _this.dom.value = _this.metadata.Value;
    };

})(cog.InputRadio.prototype);
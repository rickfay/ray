/**
 * COG Input Text Class Definition
 * extends cog.Input
 *
 * @constructor
 */
cog.InputText = function InputText() {};
cog.InputText.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        cog.Util._super("buildDom", _this);
        _this.dom.type = "text";
        _this.dom.value = _this.metadata.DefaultText;
    };

})(cog.InputText.prototype);
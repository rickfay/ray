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
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        this.super.buildDom();
        _scope.dom.type = "text";
        _scope.dom.value = _scope.metadata.DefaultText;
    };

})(cog.InputText.prototype);
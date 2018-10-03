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
     */
    proto.buildDom = function buildDom() {
        this.super.buildDom();
        this.dom.type = "text";
        this.dom.value = this.metadata.DefaultText;
    };

})(cog.InputText.prototype);
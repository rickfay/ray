/**
 * COG Input Text Class Definition
 */
cog.Class.define("InputText", cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.super.buildDom();
        this.dom.type = "text";
        this.dom.value = this.metadata.DefaultText;
    }
});
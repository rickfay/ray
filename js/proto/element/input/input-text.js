/**
 * COG Input Text Class Definition
 */
cog.Prototype.define("InputText", cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        cog.Class.super(this, 'buildDom');
        this.dom.type = "text";
        this.dom.placeholder = this.metadata.Placeholder;
        this.obj.resetCss();
    }
});
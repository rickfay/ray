/**
 * Ray Input Text Class Definition
 *
 * @namespace ray.InputText
 */
ray.Prototype.define("InputText", ray.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        ray.Class.super(this, 'buildDom');
        this.dom.type = "text";
        this.dom.placeholder = this.metadata.Placeholder;
        this.obj.resetCss();
    }
});
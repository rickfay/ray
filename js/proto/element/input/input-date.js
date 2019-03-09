/**
 * Input Date Class Definition
 *
 * @namespace ray.InputDate
 */
ray.Prototype.define("InputDate", ray.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        ray.Class.super(this, 'buildDom');
        this.dom.type = "date";
        this.dom.placeholder = this.metadata.Placeholder;
        this.obj.resetCss();
    }
});
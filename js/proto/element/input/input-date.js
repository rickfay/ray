/**
 * Input Date Class Definition
 */
cog.Prototype.define("InputDate", cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        cog.Class.super(this, 'buildDom');
        this.dom.type = "date";
    }
});
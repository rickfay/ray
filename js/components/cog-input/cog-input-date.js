/**
 *
 * @type {*|{}}
 */
cog.Class.define("InputDate", cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.super.buildDom();
        this.dom.type = "date";
    }
});
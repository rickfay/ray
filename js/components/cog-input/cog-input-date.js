/**
 *
 * @type {cog.Input}
 */
cog.InputDate = Object.create(cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.super.buildDom();
            this.dom.type = "date";
        }
    }
});
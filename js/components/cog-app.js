/**
 * COG App Component Definition
 */
cog.App = Object.create(cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true, value: function buildDom() {
            this.dom = cog.Root;
            this.dom.id = this.id;
        }
    }
});
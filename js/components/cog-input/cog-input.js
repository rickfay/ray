/**
 * COG Input Class
 *
 * @type {cog.Component}
 */
cog.Input = Object.create(cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.dom = document.createElement("input");
        }
    }
});
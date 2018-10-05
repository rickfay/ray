/**
 * COG Input Class
 *
 * @type {cog.Component}
 */
cog.Class.define("Input", cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("input");
    }
});
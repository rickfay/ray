/**
 * Ray Input Class
 *
 * @namespace ray.Input
 */
ray.Prototype.define("Input", ray.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("input");
        this.dom.id = this.namespace;
    }
});
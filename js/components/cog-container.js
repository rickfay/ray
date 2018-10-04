/**
 * COG Container Component Definition
 */
cog.Container = Object.create(cog.Component, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.dom = document.createElement("div");
            this.dom.id = this.id;
        }
    }
});
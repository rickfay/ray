/**
 * COG Input Text Class Definition
 */
cog.InputText = Object.create(cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: {
        enumerable: true,
        value: function buildDom() {
            this.super.buildDom();
            this.dom.type = "text";
            this.dom.value = this.metadata.DefaultText;
        }
    }
});
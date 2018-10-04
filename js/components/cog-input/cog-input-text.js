/**
 * COG Input Text Class Definition
 */
cog.InputText = {

    proto: Object.create(cog.Input.proto, {

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
    })
};
/**
 * COG Container Component Definition
 */
cog.Container = {
    proto: Object.create(cog.Component.proto, {

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
    })
};
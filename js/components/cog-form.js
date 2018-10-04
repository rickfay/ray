/**
 * COG Form Class Definition
 */
cog.Form = {
    proto: Object.create(cog.Component.proto, {
        extends: cog.Component,

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {
                this.dom = document.createElement("form");
                this.dom.id = this.id;
            }
        }
    })
};
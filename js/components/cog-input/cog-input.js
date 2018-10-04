/**
 * COG Input Class
 */
cog.Input = {

    proto: Object.create(cog.Component.proto, {

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {
                this.dom = document.createElement("input");
            }
        }
    })
};
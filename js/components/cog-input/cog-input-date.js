/**
 *
 */
cog.InputDate = {

    proto: Object.create(cog.Input.proto, {

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {
                this.super.buildDom();
                this.dom.type = "date";
            }
        }
    })
};
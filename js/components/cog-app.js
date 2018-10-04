/**
 * COG App Component Definition
 */
cog.App = {
    
    proto: Object.create(cog.Component.proto, {

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true, value: function buildDom() {
                this.dom = cog.Root;
                this.dom.id = this.id;
            }
        }
    })
};
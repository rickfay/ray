/**
 * COG Text Component Definition
 */
cog.Text = {

    proto: Object.create(cog.Component.proto, {

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {
                this.dom = document.createElement("p");
                this.dom.id = this.id;
                this.dom.innerHTML = this.metadata.Text;
            }
        }
    })
};
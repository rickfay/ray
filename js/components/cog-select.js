/**
 * COG Select Class Definition
 */
cog.Select = {

    proto: Object.create(cog.Component.proto, {

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {

                this.dom = document.createElement("select");

                // Build the options
                // TODO Add support for DefaultOption
                let options = this.metadata.Options;
                for (let option in options) {

                    let optionDom = document.createElement("option");
                    optionDom.innerHTML = option;
                    optionDom.value = options[option];
                    this.dom.appendChild(optionDom);
                }
            }
        }
    })
};
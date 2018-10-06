/**
 * COG Select Class Definition
 *
 * @type {*|{}}
 */
cog.Class.define("Select", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {

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
});
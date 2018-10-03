/**
 * COG Select Class Definition
 *
 * @constructor
 */
cog.Select = function Select() {};
cog.Select.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
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
    };

})(cog.Select.prototype);
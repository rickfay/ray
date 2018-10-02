/**
 * COG Select Class Definition
 *
 * @constructor
 */
cog.Select = function Select() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("select");

        // Build the options
        // TODO Add support for DefaultOption
        let options = _this.metadata.Options;
        for (let option in options) {

            let optionDom = document.createElement("option");
            optionDom.innerHTML = option;
            optionDom.value = options[option];
            _this.dom.appendChild(optionDom);
        }
    };

})(cog.Select.prototype);
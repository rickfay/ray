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
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("select");

        // Build the options
        // TODO Add support for DefaultOption
        let options = _scope.metadata.Options;
        for (let option in options) {

            let optionDom = document.createElement("option");
            optionDom.innerHTML = option;
            optionDom.value = options[option];
            _scope.dom.appendChild(optionDom);
        }
    };

})(cog.Select.prototype);
/**
 * COG Input Text Class Definition
 * extends cog.Input
 *
 * @constructor
 */
cog.InputRadio = function InputRadio() {};
cog.InputRadio.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {

        _scope.dom = document.createElement("div");
        _scope.dom.id = _scope.id;

        _scope.domInputRadio = [];
        _scope.domLabel = [];

        for (let option in _scope.metadata.Options) {

            // Create Radio Button Input
            _scope.domInputRadio[option] = document.createElement("input");
            _scope.domInputRadio[option].type = "radio";
            _scope.domInputRadio[option].id = `${_scope.id}.RADIO.${option}`;
            _scope.domInputRadio[option].name = _scope.id;
            _scope.domInputRadio[option].value = _scope.metadata.Options[option];
            _scope.dom.appendChild(_scope.domInputRadio[option]);

            // Create Label for this Radio Button
            _scope.domLabel[option] = document.createElement("label");
            _scope.domLabel[option].id = `${_scope.id}.LABEL.${option}`;
            _scope.domLabel[option].setAttribute("for", _scope.domInputRadio[option].id);
            _scope.domLabel[option].innerHTML = _scope.metadata.Options[option];
            _scope.dom.appendChild(_scope.domLabel[option]);
        }
    };

})(cog.InputRadio.prototype);
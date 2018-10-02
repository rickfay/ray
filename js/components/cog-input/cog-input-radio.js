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
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {

        _this.dom = document.createElement("div");
        _this.dom.id = _this.id;

        _this.domInputRadio = [];
        _this.domLabel = [];

        for (let option in _this.metadata.Options) {

            // Create Radio Button Input
            _this.domInputRadio[option] = document.createElement("input");
            _this.domInputRadio[option].type = "radio";
            _this.domInputRadio[option].id = `${_this.id}.RADIO.${option}`;
            _this.domInputRadio[option].name = _this.id;
            _this.domInputRadio[option].value = _this.metadata.Options[option];
            _this.dom.appendChild(_this.domInputRadio[option]);

            // Create Label for this Radio Button
            _this.domLabel[option] = document.createElement("label");
            _this.domLabel[option].id = `${_this.id}.LABEL.${option}`;
            _this.domLabel[option].setAttribute("for", _this.domInputRadio[option].id);
            _this.domLabel[option].innerHTML = _this.metadata.Options[option];
            _this.dom.appendChild(_this.domLabel[option]);
        }
    };

})(cog.InputRadio.prototype);
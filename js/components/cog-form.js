/**
 * COG Form Class Definition
 *
 * @constructor
 */
cog.Form = function Form() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("form");
        _scope.dom.id = _scope.id;
    };

})(cog.Form.prototype);

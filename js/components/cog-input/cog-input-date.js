/**
 *
 * @constructor
 */
cog.InputDate = function InputDate() {};
cog.InputDate.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        this.super.buildDom();
        _scope.dom.type = "date";
    };

})(cog.InputDate.prototype);
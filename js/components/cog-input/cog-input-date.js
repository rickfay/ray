/**
 *
 * @constructor
 */
cog.InputDate = function InputDate() {};
cog.InputDate.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.super.buildDom();
        this.dom.type = "date";
    };

})(cog.InputDate.prototype);
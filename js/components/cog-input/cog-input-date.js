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
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        cog.Util._super("buildDom", _this);
        _this.dom.type = "date";
    };

})(cog.InputDate.prototype);
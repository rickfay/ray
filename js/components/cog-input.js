/**
 * COG Input Class
 *
 * @constructor
 */
cog.Input = function Input() {};
cog.Input.abstract = true;

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("input");
    };

})(cog.Input.prototype);
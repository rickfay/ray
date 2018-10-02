/**
 * COG Container Component Definition
 *
 * @constructor
 */
cog.Container = function Container() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = document.createElement("div");
        _this.dom.id = _this.id;
    };

})(cog.Container.prototype);
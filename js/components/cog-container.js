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
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("div");
        _scope.dom.id = _scope.id;
    };

})(cog.Container.prototype);
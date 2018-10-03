/**
 * COG Image Class Definition
 *
 * @constructor
 */
cog.Image = function Image() {};

(proto => {

    /**
     * Builds the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("img");
        _scope.dom.id = _scope.id;
        _scope.dom.src = _scope.metadata.Source;
        _scope.dom.alt = _scope.metadata.AltText;
    }

})(cog.Image.prototype);
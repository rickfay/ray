/**
 * COG Text Component Definition
 *
 * @constructor
 */
cog.Text = function Text() {};
cog.Text.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("p");
        _scope.dom.id = _scope.id;
        _scope.dom.innerHTML = _scope.metadata.Text;
    }

})(cog.Text.prototype);
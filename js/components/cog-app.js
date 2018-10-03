/**
 * COG App Component Definition
 *
 * @constructor
 */
cog.App = function App() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = cog.Root;
        _scope.dom.id = _scope.id;
    };

})(cog.App.prototype);
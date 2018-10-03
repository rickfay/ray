/**
 * COG App Component Definition
 *
 * @constructor
 */
cog.App = function App() {};
cog.App.extends = cog.Component;

(function(proto) {

    proto.construct = function construct(_scopeRRRR, id, className, parentDom) {
        this.super.construct(id, className, parentDom);
    };

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
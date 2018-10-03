/**
 * COG App Component Definition
 *
 * @constructor
 */
cog.App = function App() {};
cog.App.extends = cog.Component;

(function(proto) {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = cog.Root;
        this.dom.id = this.id;
    };

})(cog.App.prototype);
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
     * @param _this
     */
    proto.buildDom = function buildDom(_this) {
        _this.dom = cog.Root;
        _this.dom.id = _this.id;
    };

})(cog.App.prototype);
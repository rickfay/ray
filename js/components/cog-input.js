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
     * @param _scope
     */
    proto.buildDom = function buildDom(_scope) {
        _scope.dom = document.createElement("input");
    };

})(cog.Input.prototype);
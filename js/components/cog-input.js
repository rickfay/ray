/**
 * COG Input Class
 *
 * @constructor
 */
cog.Input = function Input() {};
cog.Input.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("input");
    };

})(cog.Input.prototype);
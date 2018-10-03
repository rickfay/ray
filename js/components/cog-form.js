/**
 * COG Form Class Definition
 *
 * @constructor
 */
cog.Form = function Form() {};
cog.Form.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("form");
        this.dom.id = this.id;
    };

})(cog.Form.prototype);

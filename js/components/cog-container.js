/**
 * COG Container Component Definition
 *
 * @constructor
 */
cog.Container = function Container() {};
cog.Container.extends = cog.Component;

(proto => {

    /**
     * Build the DOM
     */
    proto.buildDom = function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.id;
    };

})(cog.Container.prototype);
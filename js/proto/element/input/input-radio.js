/**
 * COG Input Text Class Definition
 */
cog.Prototype.define("InputRadio", cog.Input, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {

        this.dom = document.createElement("div");
        this.dom.id = this.namespace;
    },

    buildChildren: function buildChildren() {
        this.domInputRadio = [];
        this.domLabel = [];

        for (let option in this.metadata.Options) {

            // Create Radio Button Input
            this.domInputRadio[option] = document.createElement("input");
            this.domInputRadio[option].type = "radio";
            this.domInputRadio[option].id = `${this.id}.RADIO.${option}`;
            this.domInputRadio[option].name = this.id;
            this.domInputRadio[option].value = this.metadata.Options[option];
            this.dom.appendChild(this.domInputRadio[option]);

            // Create Label for this Radio Button
            this.domLabel[option] = document.createElement("label");
            this.domLabel[option].id = `${this.id}.LABEL.${option}`;
            this.domLabel[option].setAttribute("for", this.domInputRadio[option].id);
            this.domLabel[option].innerHTML = this.metadata.Options[option];
            this.dom.appendChild(this.domLabel[option]);
        }
    }
});
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
        this.obj.resetCss();
    },

    buildChildren: function buildChildren() {

        for (let option in this.metadata.Options) {

            // Create Radio Button Input
            let inputDom = document.createElement("input");
            inputDom.type = "radio";
            inputDom.id = `${this.id}.RADIO.${option}`;
            inputDom.name = this.id;
            inputDom.value = this.metadata.Options[option];
            cog.Util.applyClass(inputDom, "cogInputRadioButton")

            // Create Label for this Radio Button
            let labelDom = document.createElement("label");
            labelDom.id = `${this.id}.LABEL.${option}`;
            labelDom.setAttribute("for", inputDom.id);
            labelDom.innerHTML = option;
            cog.Util.applyClass(labelDom, "cogInputRadioLabel");

            // Create Wrapper
            let wrapDom = document.createElement("div");
            cog.Util.applyClass(wrapDom, "cogOption");

            // Append Radio Button and Label to the Wrapper, and the Wrapper to the DOM
            wrapDom.appendChild(inputDom);
            wrapDom.appendChild(labelDom);
            this.dom.appendChild(wrapDom);
        }
    }
});
/**
 * Ray Input Text Class Definition
 *
 * @namespace ray.InputRadio
 */
ray.Prototype.define("InputRadio", ray.Input, {

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
            ray.Util.applyClass(inputDom, "rayInputRadioButton")

            // Create Label for this Radio Button
            let labelDom = document.createElement("label");
            labelDom.id = `${this.id}.LABEL.${option}`;
            labelDom.setAttribute("for", inputDom.id);
            labelDom.innerHTML = option;
            ray.Util.applyClass(labelDom, "rayInputRadioLabel");

            // Create Wrapper
            let wrapDom = document.createElement("div");
            ray.Util.applyClass(wrapDom, "rayOption");

            // Append Radio Button and Label to the Wrapper, and the Wrapper to the DOM
            wrapDom.appendChild(inputDom);
            wrapDom.appendChild(labelDom);
            this.dom.appendChild(wrapDom);
        }
    }
});
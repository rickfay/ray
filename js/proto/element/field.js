cog.Prototype.define("Field", cog.Element, (function Field() {


    let FIELD_STATE_ENUM = {"VIEW": 0, "EDIT": 1};

    return {

        /**
         *
         */
        construct: function construct(def, namespace) {
            cog.Class.super(this, "construct", def, namespace);
            this.state = FIELD_STATE_ENUM.VIEW;
        },

        /**
         * Build the DOM
         */
        buildDom: function buildDom() {
            this.dom = document.createElement("div");
            this.dom.id = this.namespace;
            this.obj.resetCss();

            let inputType;
            switch (this.metadata.Type) {
                case "Text":
                    inputType = "InputText";
                    break;
                case "Radio":
                    inputType = "InputRadio";
                    cog.Util.applyStyle(this.dom, {"height": "unset"});
                    break;
                case "Date":
                    inputType = "InputDate";
                    break;
                case "Select":
                    inputType = "Select";
                    break;
                default:
                    console.log(`Invalid input type '${this.metadata.Type}' on '${this.id}'`);
            }

            let label = cog.Class.new("Label", {"id": "label", "Text": this.metadata.Label}, this.namespace);
            let input = cog.Class.new(inputType, this.metadata.Input, this.namespace);
            let text = cog.Class.new("Text", { "id": "text", "Text": "Hot garbage" }, this.namespace);

            this.dom.appendChild(label.getDom());
            this.dom.appendChild(input.getDom());
            this.dom.appendChild(text.getDom());

            const parentNamespace = cog.Namespace.getParent(this.namespace);
            cog.Events.sub("toggle", parentNamespace, input.toggleEdit);
            cog.Events.sub("toggle", parentNamespace, text.toggleEdit);

            text.toggleEdit();
        },

        /**
         * Builds the children using a generic strategy
         */
        buildChildren: function buildChildren() {
            // Do nothing.
        },

        toggleState: function toggleEdit() {

        }
    }
})());
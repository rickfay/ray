/**
 * COG Element
 */
cog.Prototype.define("Element", cog.Object, {

    /**
     * Construct the Component
     *
     * @param def
     * @param namespace
     */
    construct: function construct(def, namespace) {

        if (typeof def === "string") {
            this.namespace = cog.Namespace.build(namespace, def);
            this.id = this.namespace;
            this.metadata = cog.Metadata.get(this.obj);
        } else if (typeof def === "object") {
            this.metadata = def;
            this.namespace = cog.Namespace.build(namespace, this.metadata.id);
            this.id = this.namespace;
        }

        this.obj.buildDom();
        this.obj.buildChildren();

        /*let fn = function callback() {
            console.log("tacofunk!: " + this.obj.getClassName());
        }.bind(this);

        cog.Events.sub("tacos", this, fn);*/
    },

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("div");
        this.dom.id = this.namespace;
        this.obj.resetCss();
    },

    /**
     * Builds the children using a generic strategy
     */
    buildChildren: function buildChildren() {
        let elements = this.obj.getMetadata().Elements;
        if (elements) {
            for (let element of Object.keys(elements)) {
                this.dom.appendChild(cog.Class.new(elements[element], element, this.namespace).getDom());
            }
        }
    },

    /**
     * Get the DOM
     *
     * @returns {*}
     */
    getDom: function getDom() {
        return this.dom;
    },

    /**
     *
     * @returns {*}
     */
    getMetadata: function getMetadata() {
        return this.metadata;
    },

    /**
     * Get the ID of this Component
     *
     * @returns {*}
     */
    getNamespace: function getNamespace() {
        return this.namespace;
    },

    /**
     * Resets the CSS to the default as specified by the metadata
     */
    resetCss: function resetCss() {
        this.dom.removeAttribute("class");
        cog.Util.applyStyle(this.dom, this.metadata.Style);
        cog.Util.applyClass(this.dom, this.metadata.Class);
        cog.Util.applyClass(this.dom, ...[cog.Util.getCogClasses(this.obj).map(clazz => `cog${clazz}`)]);
    },


    /**
     * FIXME For testing events, don't leave here.
     * @returns {*}
     */
    toggleEdit: function toggleEdit() {
        if (this.dom.style.visibility === "hidden") {
            this.dom.style.visibility = "visible";
        } else {
            this.dom.style.visibility = "hidden";
        }
        return this.obj.getNamespace();
    }
});
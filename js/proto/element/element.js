/**
 * Ray Element
 *
 * @namespace ray.Element
 */
ray.Prototype.define("Element", ray.Object, {

    /**
     * Construct the Component
     *
     * @param def
     * @param namespace
     */
    construct: function construct(def, namespace) {

        if (typeof def === "string") {
            this.namespace = ray.Namespace.build(namespace, def);
            this.id = this.namespace;
            this.metadata = ray.Metadata.get(this.obj);
        } else if (typeof def === "object") {
            this.metadata = def;
            this.namespace = ray.Namespace.build(namespace, this.metadata.id);
            this.id = this.namespace;
        }

        this.obj.buildDom();
        this.obj.buildChildren();

        /*let fn = function callback() {
            console.log("tacofunk!: " + this.obj.getClassName());
        }.bind(this);

        ray.Events.sub("tacos", this, fn);*/
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
                this.dom.appendChild(ray.Class.new(elements[element], element, this.namespace).getDom());
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
        ray.Util.applyStyle(this.dom, this.metadata.Style);
        ray.Util.applyClass(this.dom, this.metadata.Class);
        ray.Util.applyClass(this.dom, ...[ray.Util.getRayClasses(this.obj).map(clazz => `ray${clazz}`)]);
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
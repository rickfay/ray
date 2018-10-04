/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 */
cog.Component = {

    name: "Component",
    proto: Object.create(cog.Cog.proto, {

        extends: {value: cog.Cog},

        /**
         * Construct the Component
         *
         * @param id
         * @param className
         * @param parentDom
         */
        construct: {
            value: function construct(id, className, parentDom) {

                // Set properties
                this.metadata = cog.Metadata.Components[className][id];
                this.id = parentDom ? `${parentDom.id}.${id}` : id;
                this.className = className;

                // Build
                this.self.buildDom();
                this.self.resetCss();

                cog.Util.appendDom(parentDom, this.dom);

                cog.Factory.buildChildren(this.self);
            },
            enumerable: true,
        },

        /**
         * Build the DOM
         */
        buildDom: {
            enumerable: true,
            value: function buildDom() {
                this.dom = document.createElement("div");
                this.dom.id = this.id;
            }
        },

        /**
         * Get the ID of this Component
         *
         * @returns {*}
         */
        getId: {
            enumerable: true,
            value: function getId() {
                return this.id;
            }
        },

        /**
         * Get the Metadata
         *
         * @returns {*|SVGMetadataElement}
         */
        getMetadata: {
            enumerable: true,
            value: function getMetadata() {
                return this.metadata;
            }
        },

        /**
         * Get the DOM
         *
         * @returns {*}
         */
        getDom: {
            enumerable: true,
            value: function getDom() {
                return this.dom;
            }
        },

        /**
         * Get the Cog Class Name
         */
        getClassName: {
            enumerable: true,
            value: function getClassName() {
                return this.className;
            }
        },

        /**
         * Resets the CSS to the default as specified by the metadata
         *
         * @param obj
         */
        resetCss: {
            enumerable: true,
            value: function resetCss() {
                this.dom.removeAttribute("class");
                cog.Util.applyStyle(this.dom, this.metadata.Style);
                cog.Util.applyClass(this.dom, this.metadata.Class);
                cog.Util.applyClass(this.dom, ...[cog.Util.getCogClasses(this.self).map(clazz => `cog${clazz}`)]);
            }
        }
    })
};
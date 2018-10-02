/**
 * COG Utilities
 *
 * @type {{construct: cog.Util.construct, applyCss: cog.Util.applyCss, isEmpty: cog.Util.isEmpty}}
 */
cog.Util = {

    /**
     * Factory function for constructing a COG Component
     *
     * @param component The Component to construct
     * @param $scope
     * @param id
     */
    construct: (component, $scope, id) => {

        $scope.id = id;

        // Fetch metadata definition for this component
        $scope.metadata = cog.Metadata[component.constructor.name][$scope.id];

        // TODO generic DOM creation and ID attribute assignment

        // Proxies out functions to their prototype counterparts
        // TODO just making everything public for the moment.
        $.each(component.constructor.prototype, (propertyName, property) => {
            if (typeof property === "function") {
                component[propertyName] = $.proxy(property, component, $scope);
            }
        });

        // Construct
        if (component.construct) {
            component.construct();
        }

        // Build the component's DOM
        if (component.buildDom) {
            component.buildDom();
        }

        // Apply any CSS
        cog.Util.applyCss($scope.dom, $scope.metadata.CSS);
    },

    /**
     * Applies the given css definition to the given dom element
     *
     * @param dom
     * @param css
     */
    applyCss: (dom, css) => {
        if (dom && css) {
            for (let key of Object.keys(css)) {
                dom.style[key] = css[key];
            }
        }
    },

    /**
     * Apply the given array of cssClasses to the given dom element
     *
     * @param dom
     * @param cssClasses
     */
    applyCssClasses: (dom, cssClasses) => {
        if (dom && cssClasses) {
            for (let cssClass of cssClasses) {
                dom.classList.add(cssClass);
            }
        }
    },

    /**
     * Determines if obj is empty
     *
     * @param obj
     * @returns {boolean}
     */
    isEmpty: obj => {
        switch (typeof obj) {
            case "object":
                return obj == null || obj.length === 0;
            case "string":
                return obj === "";
            default:
                return obj === undefined || obj == null;
        }
    },

    /**
     * Calls a function on the given superclass.
     *
     * TODO This will need to be updated once all object methods aren't public...
     *
     * @param $scope
     * @param func
     * @param args
     */
    $super: (func, $scope, ...args) => {
        cog[$scope.clazz].extends.prototype[func]($scope, args);
    }
};
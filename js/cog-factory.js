/**
 * Component Object Generator Factory
 *
 * @type {{extend: cog.Factory.extend, construct: (function(*=, *=, *=)), buildCogApp: cog.Factory.buildCogApp}}
 */
cog.Factory = {

    /**
     * Inherit component properties off the component's parent
     *
     * @param $scope
     * @param component
     * @param parentClass
     */
    extend: ($scope, component, parentClass) => {

        // Proxy inherited prototype properties
        if (parentClass) {
            for (let key of Object.keys(parentClass.prototype)) {
                if (!component.hasOwnProperty(key)) {
                    component[key] = $.proxy(parentClass.prototype[key], component, $scope);
                }
            }

            cog.Factory.extend($scope, component, parentClass.extends);
        }
    },

    /**
     * Constructs a new COG Component
     *
     * @param clazz
     * @param id
     * @param parentDom
     */
    construct: function (id, clazz, parentDom) {

        // Build the Component
        let component = ((id, clazz) => {

            let component = new cog[clazz]();
            let $scope = {
                id: parentDom ? `${parentDom.id}.${id}` : id,
                metadata: cog.Metadata.Components[clazz][id],
                clazz: clazz
            };

            // Proxy inherited prototype properties
            for (let key of Object.keys(component.__proto__)) {
                component[key] = $.proxy(component.__proto__[key], component, $scope);
            }

            cog.Factory.extend($scope, component, component.constructor.extends);

            component.construct();
            component.buildDom();

            $scope.dom.setAttribute("data-cog-class", clazz);

            cog.Util.applyCss($scope.dom, $scope.metadata.CSS);
            cog.Util.applyCssClasses($scope.dom, $scope.metadata.Classes);

            return component;

        })(id, clazz);

        let dom = component.getDom();
        if (dom) {

            // Append newly constructed Component to the DOM
            if (parentDom) {
                parentDom.appendChild(dom);
            }

            // Recursively construct child Component Elements
            let elements = component.getMetadata().Elements;
            if (elements) {
                for (let element in elements) {
                    cog.Factory.construct(element, elements[element], component.getDom());
                }
            }
        } else {
            console.error(`No DOM built on Component: ${component}`);
        }

        return component;
    },

    /**
     * Any COG Components that don't specify a class to extend will automatically be assigned cog.Component
     */
    establishBaseComponent: () => {
        for (let key of Object.keys(cog)) {
            let property = cog[key];
            if (typeof property === "function" && !property.extends && property !== cog.Component) {
                property.extends = cog.Component;
            }
        };
    },

    /**
     * Builds the COG Application
     *
     * @param appId
     */
    buildCogApp: appId => {
        cog.Factory.establishBaseComponent();
        cog.Factory.construct(appId, cog.App.name, null);
    }
};
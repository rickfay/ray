/**
 * COG Component
 *
 * Root COG Class all other Components inherit from.
 *
 * @constructor
 */
cog.Component = function Component() {};

(proto => {

    /**
     * Construct the Component
     *
     * @param $scope
     */
    proto.construct = function construct($scope) {};

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        console.log("Default buildDom()");
    };

    /**
     * Get the DOM
     *
     * @param $scope
     * @returns {*}
     */
    proto.getDom = function getDom($scope) {
        return $scope.dom;
    };

    /**
     * Get the Metadata
     *
     * @param $scope
     * @returns {*|SVGMetadataElement}
     */
    proto.getMetadata = function getMetadata($scope) {
        return $scope.metadata;
    }

    /**
     * Get the ID of this Component
     *
     * @param $scope
     * @returns {*}
     */
    proto.getId = function getId($scope) {
        return $scope.id;
    };

})(cog.Component.prototype);
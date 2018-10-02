/**
 * COG Container Component Definition
 *
 * @param id
 * @constructor
 */
cog.Container = function Container() {};

(proto => {

    /**
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("div");
        $scope.dom.id = $scope.id;
    };

})(cog.Container.prototype);
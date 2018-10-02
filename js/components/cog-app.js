/**
 * COG App Component Definition
 *
 * @constructor
 */
cog.App = function App() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = cog.Root;
        $scope.dom.id = $scope.id;
    };

})(cog.App.prototype);
/**
 * COG Text Component Definition
 *
 * @constructor
 */
cog.Text = function Text() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("p");
        $scope.dom.id = $scope.id;
        $scope.dom.innerHTML = $scope.metadata.Text;
    }

})(cog.Text.prototype);
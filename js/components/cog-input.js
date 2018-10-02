/**
 * COG Input Class
 *
 * @constructor
 */
cog.Input = function Input() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("input");
    };

})(cog.Input.prototype);
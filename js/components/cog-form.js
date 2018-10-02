/**
 * COG Form Class Definition
 *
 * @param id
 * @constructor
 */
cog.Form = function Form() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("form");
        $scope.dom.id = $scope.id;
    };

})(cog.Form.prototype);

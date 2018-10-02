/**
 * COG Input Text Class Definition
 * extends cog.Input
 *
 * @constructor
 */
cog.InputRadio = function InputRadio() {};
cog.InputRadio.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        cog.Util.$super("buildDom", $scope);
        $scope.dom.type = "radio";
        $scope.dom.innerHTML = $scope.metadata.Label;
        $scope.dom.value = $scope.metadata.Value;

        // TODO Needs work
    };

})(cog.InputRadio.prototype);
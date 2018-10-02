/**
 * COG Input Text Class Definition
 * extends cog.Input
 *
 * @constructor
 */
cog.InputText = function InputText() {};
cog.InputText.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        cog.Util.$super("buildDom", $scope);
        $scope.dom.type = "text";
        $scope.dom.value = $scope.metadata.DefaultText;
    };

})(cog.InputText.prototype);
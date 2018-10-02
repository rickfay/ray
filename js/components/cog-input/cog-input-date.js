/**
 *
 * @constructor
 */
cog.InputDate = function InputDate() {};
cog.InputDate.extends = cog.Input;

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        cog.Util.$super("buildDom", $scope);
        $scope.dom.type = "date";
    };

})(cog.InputDate.prototype);
/**
 * COG Select Class Definition
 *
 * @constructor
 */
cog.Select = function Select() {};

(proto => {

    /**
     * Build the DOM
     *
     * @param $scope
     */
    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("select");

        // Build the options
        // TODO Add support for DefaultOption
        let options = $scope.metadata.Options;
        for (let option in options) {

            let optionDom = document.createElement("option");
            optionDom.innerHTML = option;
            optionDom.value = options[option];
            $scope.dom.appendChild(optionDom);
        }
    };

})(cog.Select.prototype);
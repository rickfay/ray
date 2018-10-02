cog.Image = function Image() {};

(proto => {

    proto.supportedProperties = {
        "Source": "src",
        "AltText": "alt"
    };

    proto.buildDom = function buildDom($scope) {
        $scope.dom = document.createElement("img");
        $scope.dom.id = $scope.id;

        Object.keys($scope.metadata).map(key => {
            $scope.dom[proto.supportedProperties[key]] = $scope.metadata[key];
        });
    }

})(cog.Image.prototype);
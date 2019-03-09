/**
 * Ray Root Element Representation
 */
ray.Class.service("Root", {

    /**
     * Builds and bootstraps the ray Apps
     */
    bootstrap: function bootstrap() {

        this.appDoms = {};

        // Query for ray apps to build, then build them
        for (let appDom of document.querySelectorAll("[data-ray-app-id]")) {

            let rayAppId = appDom.dataset.rayAppId;
            let rayMetaSrc = appDom.dataset.rayMetaSrc;

            // ray.Root keeps track of all the ray App DOMs
            this.appDoms[rayAppId] = appDom;

            // Fetch the Metadata Configuration and build the App
            ray.Ajax.get(rayMetaSrc, (response) => {
                ray.Metadata.addAppMetadata(rayAppId, JSON.parse(response));
                ray.Enum.init(rayAppId);
                ray.Class.new("App", rayAppId);
            });
        }
    },

    /**
     *
     * @param namespace
     * @returns {*}
     */
    getAppDom: function getAppDom(namespace) {
        return this.appDoms[namespace];
    }
});
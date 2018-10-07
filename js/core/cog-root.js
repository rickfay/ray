/**
 * Cog Root Element Representation
 */
cog.Class.singleton("Root", {

    /**
     * Builds and bootstraps the cog Apps
     */
    bootstrap: function bootstrap() {

        this.appDoms = {};

        // Query for cog apps to build, then build them
        for (let appDom of document.querySelectorAll("[data-cog-app-id]")) {

            let cogAppId = appDom.dataset.cogAppId;
            let cogMetaSrc = appDom.dataset.cogMetaSrc;

            // cog.Root keeps track of all the cog App DOMs
            this.appDoms[cogAppId] = appDom;

            // Fetch the Metadata Configuration and build the App
            cog.Ajax.get(cogMetaSrc, response => {
                cog.Metadata[cogAppId] = JSON.parse(response);
                cog.Class.construct("App", cogAppId, this);
            });
        }
    }
});
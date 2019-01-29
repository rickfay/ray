/**
 * Utility Class to store sets of Enumerated values
 */
cog.Class.service("Enum", {

    init: function init() {

        // Static Enum definition
        let enums = {
            "FieldState": ["EDIT", "VIEW"]
        };

        //let enums = cog.Metadata.get(`${cogAppId}.Enums`);

        for (let e of Object.keys(enums)) {
            this.obj[e] = {};
            for (let value of enums[e]) {
                this.obj[e][value] = Symbol(`${e}.${value}`);
            }
        }
    }
});
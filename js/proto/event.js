/**
 * Cog Event
 */
cog.Prototype.define("Event", cog.Object, {

    /**
     * Constructor
     *
     * @param id
     */
    construct: function construct(id) {
        this.subscribers = {};
        this.id = id;
    },

    /**
     * Add a subscriber to this Event
     *
     * @param id
     * @param callback
     */
    addSub: function addSub(id, callback) {
        if (typeof callback === "function") {
            this.subscribers[id] = callback;
        }
    },

    /**
     * Remove a subscriber from this Event
     *
     * @param id
     */
    removeSub: function removeSub(id) {
        if (!cog.Util.isEmpty(id) && !cog.Util.isEmpty(this.subscribers[id])) {
            delete this.subscribers[id];
        }
    },

    /**
     * Trigger this event for all subscribers and return an object containing
     * all the subscriber callback return values
     */
    trigger: function trigger() {
        console.log("trigger!");

        let eventReturns = {};
        for (let subKey of Object.keys(this.subscribers)) {

            eventReturns[subKey] = {};
            let callback = this.subscribers[subKey];

            if (typeof callback === "function") {
                eventReturns[subKey][callback] = callback(arguments);
            }
        }

        return eventReturns;
    }
});
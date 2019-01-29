/**
 * Cog Event
 */
cog.Prototype.define("Event", cog.Object, {

    /**
     * Constructor
     *
     * @param eventName
     */
    construct: function construct(eventName) {
        this.eventName = eventName;
        this.subscribers = {};
    },

    /**
     * Add a subscriber to this Event
     *
     * @param namespace
     * @param callback
     */
    addSub: function addSub(namespace, callback) {
        if (typeof callback === "function") {
            this.subscribers[namespace] = callback;
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

    getSubs: function getSubs() {
        return this.subscribers;
    },

    /**
     * Trigger this event for all subscribers and return an object containing
     * all the subscriber callback return values
     */
    trigger: function trigger() {
        let eventReturns = {};
        for (let sub of Object.keys(this.subscribers)) {

            eventReturns[sub] = {};
            let callback = this.subscribers[sub];

            if (typeof callback === "function") {
                eventReturns[sub][callback.name] = callback(...arguments);
            }
        }

        return eventReturns;
    }
});
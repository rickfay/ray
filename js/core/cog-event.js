/**
 * Cog Event
 */
cog.Class.define("Event", null, {

    construct: function construct(id) {
        this.subscribers = {};
        this.id = id;
    },

    addSub: function addSub(id, callback) {
        if (!cog.Util.isEmpty(callback)) {
            this.subscribers[id] = callback;
        }
    },

    removeSub: function removeSub(id) {
        if (!cog.Util.isEmpty(id) && !cog.Util.isEmpty(this.subscribers[id])) {
            delete this.subscribers[id];
        }
    },

    trigger: function trigger() {
        console.log("trigger!");

        let eventReturns = {};
        for (let subKey of Object.keys(this.subscribers)) {

            eventReturns[subKey] = {};
            let callback = this.subscribers[subKey];

            if (!cog.Util.isEmpty(callback)) {
                eventReturns[subKey][callback] = callback(arguments);
            }
        }

        return eventReturns;
    }
});
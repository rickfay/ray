/**
 * COG Framework Events System
 *
 * @constructor
 */
cog.Events = function Events() {};
cog.Events.extends = cog.Cog;
cog.Events.static = true;

(proto => {

    /**
     *
     * @param _scope
     */
    proto.construct = function construct(_scope) {
        _scope.events = {};
    };

    /**
     *
     * @param _scope
     * @param eventName
     * @param args
     * @returns {*}
     */
    proto.pub = function pub(_scope, eventName, args) {
        return !cog.Util.isEmpty(_scope.events[_scope.id] && !cog.Util.isEmpty(_scope.events[_scope.id][eventName]))
            ? _scope.events[_scope.id][eventName].trigger(args) : null;
    };

    /**
     *
     * @param _scope
     * @param eventName
     * @param callback
     */
    proto.sub = function sub(_scope, eventName, callback) {

        let myEvents = cog.Util.buildRef(_scope.events, _scope.id);

        if (cog.Util.isEmpty(myEvents[eventName])) {
            myEvents[eventName] = new function (eventName) {

                let _scope = {
                    eventName: eventName,
                    subscribers: {}
                };

                return Object.create({

                    addSub: (id, callback) => {
                        if (!cog.Util.isEmpty(callback)) {
                            _scope.subscribers[id] = callback;
                        }
                    },

                    removeSub: (id) => {
                        if (!cog.Util.isEmpty(id) && !cog.Util.isEmpty(_scope.subscribers[id])) {
                            delete _scope.subscribers[id];
                        }
                    },

                    trigger: () => {
                        console.log("trigger!");
                        console.log(_scope.subscribers);

                        let eventReturns = {};
                        $.each(_scope.subscribers, function(i, v) {
                            eventReturns[i] = {};
                            if (!cog.Util.isEmpty(v)) {
                                eventReturns[i][v] = v(args);
                            }
                        });

                        return eventReturns;
                    }
                });
            };
        }

        _scope.subscribers[_scope.id][eventName].addSub(_scope, _scope.id, callback);
    };

})(cog.Events.prototype);
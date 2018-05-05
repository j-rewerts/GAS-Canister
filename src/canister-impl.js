/* exported CanisterImpl */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */

var CanisterImpl = (function() {
    var me = function() {
        var initialized = {};
        var self = this;

        this.exposeService = function(name) {
            // Ensure no services are created that conflict with existing services/functions.
            Object.defineProperty(this, name, {
                get: function() {
                    if (initialized[name]) {
                        console.log(name + ' already exists. Returning.');
                        return initialized[name];
                    }
                    console.log('Creating new object');
                    initialized[name] = 'something super important';
                    return initialized[name];
                },
                set: function(newValue) {
                    if (self.hasOwnProperty(name)) {
                        throw new Error(name + ' already exists.');
                    }
                    initialized[name] = newValue;
                },
            });
        };
    };

    return me;
}());

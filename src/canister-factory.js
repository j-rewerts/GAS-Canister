/* exported CanisterFactory */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */

var CanisterFactory = (function() {
    var me = {};
    var registered = {};
    var dependencies = {};
    var canisterImpl = {};

    me.create = function(serviceName) {
        var Service = registered[serviceName];
        var depValues = [];
        if (dependencies[serviceName].length > 0) {
            // Resolve dependencies first. (recurse)
            for (var i = 0; i < dependencies[serviceName].length; i++) {
                depValues.push(i);
            }
        }

        if (isClass) {
            return new (Service.bind.apply(Service, depValues))();
        }

        return Service.apply(Service, depValues);
    };

    return me;
}());

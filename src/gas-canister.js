/* exported GasCanister */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */

/**
 * A dependency injection framework for Google Apps Script.
 */
var GasCanister = (function() {
    var me = function() {
        // // private variables // //
        var registered = {};
        var dependencies = {};

        // // public variables // //
        this.canister = new CanisterImpl();

        // // private functions // //

        var CanisterFactory = {};
        CanisterFactory.create = function(serviceName) {
            var Service = registered[serviceName];
            var depValues = [];
            if (dependencies[serviceName].length > 0) {
                // Resolve dependencies first. (recurse)
                for (var i = 0; i < dependencies[serviceName].length; i++) {
                    depValues.push(i);
                    console.log(i + ' dep resolved.');
                }
            }
    
            if (isClass) {
                console.log('It\'s a class');
                return new (Service.bind.apply(Service, depValues))();
            }
    
            console.log('It\'s an Object');
            return Service.apply(Service, depValues);
        };

        // // public functions // //

        /**
         * Registers a service with the dependency injector.
         * All of this services dependencies (params 3, 4, 5 etc.)
         * must already be defined.
         * @param {String} name The unique name of the service.
         * @param {Object} service The service Object.
         */
        this.register = function(name, service) {
            var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

            if (registered[name]) {
                throw new Error(name + ' has already been defined.');
            }

            var depInternal = args.slice(2);
            for (var i = 0; i < depInternal.length; i++) {
                if (!registered[depInternal[i]]) {
                    throw new Error(depInternal[i] + ' is not a known dependency.');
                }
            }
            dependencies[name] = depInternal;
            registered[name] = service;

            // Define the getter and setter
            this.canister[name] = service;
            this.canister.exposeService(name);
            console.log('Registered');
        };
    };

    return me;
}());

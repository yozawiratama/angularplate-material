angular.module('service.home', [])
    .service('homeSvc', ['$rootScope', '$http', function ($rootScope, $http) {
        var factory = {};

        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };

        return factory;
    }]);

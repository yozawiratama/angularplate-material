angular.module('service.auth', [])
    .service("authSvc", ['$http', '$q', '$window', function($http, $q, $window) {
        var userInfo;
        var factory = {};
        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };
        //
        factory.login = function(userName, password) {
            var deferred = $q.defer();

            //for example
            setTimeout(function() {
                deferred.notify('About to greet ' + name + '.');

                if (userName == 'admin' && password == 'admin') {
                    userInfo = {
                        accessToken: 'some-token',
                        username: userName
                    };
                    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                    deferred.resolve(userInfo);
                } else {
                    deferred.reject({authenticated : false});
                }
            }, 1000);


            //or you can use post for real condition
            // $http.get("/datas/login.json")
            //     .then(function(result) {
            //         console.log('result');
            //     userInfo = {
            //         accessToken: result.data.access_token,
            //         username: result.data.userName
            //     };
            //     $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            //     deferred.resolve(userInfo);
            // }, function(error) {
            //     deferred.reject(error);
            // });

            return deferred.promise;
        };

        factory.logout = function() {
            var deferred = $q.defer();

            //for example
            setTimeout(function() {
                $window.sessionStorage["userInfo"] = null;
                deferred.resolve("logged out");

            }, 1000);

            // $http({
            //     method: "POST",
            //     url: logoutUrl,
            //     headers: {
            //         "access_token": userInfo.accessToken
            //     }
            // }).then(function(result) {
            //     $window.sessionStorage["userInfo"] = null;
            //     userInfo = null;
            //     deferred.resolve(result);
            // }, function(error) {
            //     deferred.reject(error);
            // });

            return deferred.promise;
        }

        factory.getUserInfo = function() {
            return userInfo;
        }

        factory.init = function() {
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        };
        factory.init();

        return factory;
    }]);

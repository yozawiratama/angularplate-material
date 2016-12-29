// Main module aof angularplate
var app = angular.module('app', [
    'module.home',
    'module.dashboard',
    'module.user',
    'service.auth',
    'service.home',
    'ngEnter',
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'angular-loading-bar'
]);
app.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            $rootScope.pageTitle = 'Home';
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.appTitle = 'Angularplate Material';


            $rootScope.$watch("userInfo", function (newval,oldval) {
                if(newval){

                }
            });

            $rootScope.$on("$stateChangeStart",
                function (event, toState, toParams, fromState, fromParams) {

                });

            $rootScope.$on("stateChangeSuccess",
                function (event, toState, toParams, fromState, fromParams) {
                    console.log(userInfo);
                });

            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log(error);
                    if (error.authenticated === false) {
                        $state.go('home.index');
                    }

                })
        }
    ]
)

    .config(
        ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
            function ( $stateProvider, $urlRouterProvider, $mdThemingProvider) {


                $mdThemingProvider.definePalette('amazingPaletteName', {
                    '50': 'ffebee',
                    '100': 'ffcdd2',
                    '200': 'ef9a9a',
                    '300': 'e57373',
                    '400': 'ef5350',
                    '500': 'f44336',
                    '600': 'e53935',
                    '700': 'd32f2f',
                    '800': 'c62828',
                    '900': 'b71c1c',
                    'A100': 'ff8a80',
                    'A200': 'ff5252',
                    'A400': 'ff1744',
                    'A700': 'd50000',
                    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                        // on this palette should be dark or light

                    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                        '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined    // could also specify this if default was 'dark'
                });

                $mdThemingProvider.theme('default')
                    .primaryPalette('amazingPaletteName');

                $urlRouterProvider
                    .when('/c?id', '/contacts/:id')
                    .when('/user/:id', '/contacts/:id')
                    .otherwise('/');
                $stateProvider
                    .state("loginAPI", {
                        url: "/login/api",
                        controller: ['$scope', '$rootScope','$state',
                            function ($scope, $rootScope,$state) {

                            }]
                    })
                    .state("login", {
                        url: "/login",
                        controller: ['$scope', '$rootScope','$state',
                            function ($scope, $rootScope,$state) {

                            }]
                    })
                    .state("logout", {
                        url: "/logout",
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                                $state.go('login');
                            }]
                    })
                    .state('contact-us', {
                        url: '/contact-us',
                        // Showing off how you could return a promise from templateProvider
                        templateProvider: ['$timeout',
                            function ($timeout) {
                                return $timeout(function () {
                                    return '<p class="lead">UI-Router Resources</p><ul>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/tree/gh-pages/sample">Source for this Sample</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router">GitHub Main Page</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                                        '</ul>';
                                }, 100);
                            }]
                    })
            }
        ]);



app.controller('homeAbstractCtrl', ['$scope', '$rootScope','$state', 'homeSvc',
    function ($scope, $rootScope,$state, homeSvc) {

        $scope.say = homeSvc.Intro();
    }
])
    .controller('homeIndexCtrl', ['$scope', '$rootScope','$state', 'homeSvc',
        function ($scope, $rootScope, $state, homeSvc) {
            $rootScope.pageTitle = 'Home';
            $scope.say = homeSvc.Intro();
        }
    ]);
app.controller('navCtrl', function ($scope, $rootScope, $state, $timeout, $mdSidenav, $mdDialog, $mdToast, $log, authSvc) {
    $scope.state = $rootScope.pageTitle;
    $rootScope.$watch('pageTitle', function (nval) {
        $scope.state = nval;
    });
    var originatorEv;
    // $scope.state = 'Home';
    $scope.toggleRight = buildToggler('sidenavLeft');
    $scope.isOpenRight = function () {
        return $mdSidenav('sidenavLeft').isOpen();
    };

    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.isAuthenticated = null;
    $scope.username = null;
    $scope.userInfo = authSvc.getUserInfo();

    if ($scope.userInfo) {
        $scope.isAuthenticated = true;
        $scope.username = $scope.userInfo.username;
    } else {
        $scope.isAuthenticated = false;
    }

    $scope.logout = function () {
        authSvc.logout();
        $scope.isAuthenticated = false;
    };

    $scope.showLoginDialog = function (ev) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.username = 'admin';
                $scope.password = 'admin';
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };

                $scope.submitLogin = function () {
                    var loginres = authSvc.login($scope.username, $scope.password);
                    loginres.then(function (res) {
                        console.log(res);

                        $mdDialog.hide(res);
                    }), function (error) {
                        console.log(error);
                        alert('Login Fail');
                    };
                }
            },
            templateUrl: '/dialogs/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
            .then(function (res) {
                console.log(res);
                $scope.userInfo = authSvc.getUserInfo();
                $scope.isAuthenticated = true;
                $scope.username = $scope.userInfo.username;
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    //Toast

    $scope.showSimpleToast = function () {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Favorited!')
                .position('top right')
                .hideDelay(3000)
        );
    };

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

    $scope.todos = [
        {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
    ];
})
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('sidenavLeft').close()
                .then(function () {
                    $log.debug("close Left is done");
                });
        };
    });

angular.module('module.dashboard', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('dashboard', {
                        abstract: true,
                        url: '/dashboard',
                        templateUrl: 'views/dashboard/layout.html',
                        resolve : {
                            auth: ['$q', 'authSvc',function($q, authSvc) {
                                console.log('masuk');

                                var userInfo = authSvc.getUserInfo();
                                console.log(userInfo);
                                if (userInfo) {
                                    return $q.when(userInfo);
                                } else {
                                    return $q.reject({ authenticated : false });
                                }
                            }]
                        },
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                            }
                        ]
                    })
                    .state('dashboard.index', {
                        url: '',
                        templateUrl: 'views/dashboard/index.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {
                                $scope.contact = 10;
                                $scope.feed = 42;
                                $scope.message = 3;
                            }
                        ]
                    })



            }
        ]
    );
angular.module('module.home', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('home', {
                        abstract: true,
                        url: '/',
                        templateUrl: 'views/user/layout.html',
                        controller: 'homeAbstractCtrl'
                    })
                    .state('home.index', {
                        url: '',
                        templateUrl: 'views/home/index.html',
                        controller: 'homeIndexCtrl'
                    })



            }
        ]
    );
angular.module('module.user', [
    'ui.router'
])

    .config(
        ['$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('user', {
                        abstract: true,
                        url: '/user',
                        templateUrl: 'views/user/layout.html',
                        controller: ['$scope', '$state',
                            function ($scope, $state) {

                            }
                        ]
                    })
                    .state('user.list', {
                        url: '',
                        templateUrl: 'views/user/list.html',
                        controller: ['$scope', '$rootScope','$state',
                            function ($scope, $rootScope,$state) {
                                $rootScope.pageTitle = 'User List';
                                $scope.isMenuOpen = false;
                                console.log($rootScope.pageTitle);
                                $scope.users = [
                                    {
                                        name: { first: 'Yoza', last:'Wiratama' },
                                        job : 'Programmer'
                                    },
                                    {
                                        name: { first: 'Ayla', last:'Putri' },
                                        job : 'Doctor'
                                    },
                                    {
                                        name: { first: 'Kailan', last:'Batrisyia' },
                                        job : 'Engineer'
                                    },
                                    {
                                        name: { first: 'Leung', last:'Arashi' },
                                        job : 'Programmer'
                                    }
                                ];


                                $scope.selectedUserIndex = undefined;
                                $scope.selectUserIndex = function (index) {
                                    if ($scope.selectedUserIndex !== index) {
                                        $scope.selectedUserIndex = index;
                                    }
                                    else {
                                        $scope.selectedUserIndex = undefined;
                                    }
                                };
                            }
                        ]
                    })



            }
        ]
    );
angular.module('ngEnter',[])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
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

angular.module('service.home', [])
    .service('homeSvc', ['$rootScope', '$http', function ($rootScope, $http) {
        var factory = {};

        factory.Intro = function () {
            return 'Hello I\'m Angularplate';
        };

        return factory;
    }]);

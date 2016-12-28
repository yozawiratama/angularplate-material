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

                $mdThemingProvider.theme('default')
                    // .dark()
                    .primaryPalette('amber')
                    .accentPalette('teal');

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



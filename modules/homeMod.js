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
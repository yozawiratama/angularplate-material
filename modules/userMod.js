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
                        controller: ['$scope', '$state',
                            function ($scope, $state) {

                            }
                        ]
                    })



            }
        ]
    );
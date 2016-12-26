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
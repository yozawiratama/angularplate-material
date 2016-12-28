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
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
app.controller('homeAbstractCtrl', ['$scope', '$state', 'homeSvc',
    function ($scope, $state, homeSvc) {
        $scope.say = homeSvc.Intro();
    }
])
    .controller('homeIndexCtrl', ['$scope', '$state', 'homeSvc',
        function ($scope, $state, homeSvc) {
            $scope.say = homeSvc.Intro();
        }
    ]);
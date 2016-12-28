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
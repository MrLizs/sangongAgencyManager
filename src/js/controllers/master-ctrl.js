/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope','$rootScope','$state', '$cookieStore','$timeout','$window','LoginService', MasterCtrl]);

function MasterCtrl($scope, $rootScope,$state,$cookieStore,$timeout,$window,LoginService) {

    var updateFrame = function(){
        var token = $cookieStore.get('token');
        $scope.formData = {isLogined:!!token};
    }
    $rootScope.updateFrame = updateFrame;
    updateFrame();

    $scope.frame = {
        pageTitle:'',
    };
    $rootScope.frame = $scope.frame;
    
    $scope.$on('$viewContentLoaded',function(){
        if(!$scope.formData.isLogined){
            $state.go('login');
        }
    });

    $scope.logout = function(){
        LoginService.logout($cookieStore.get('token'),function(err){
            if(err){
                alert(err);
            }else{
                $cookieStore.remove('token');
                //$state.go('login');
                $window.location.href=AppRootURL+'/#/login';
            }
        });
    }
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
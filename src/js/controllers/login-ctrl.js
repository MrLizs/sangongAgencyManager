/**
 * LoginCtrl Controller
 */

angular.module('RDash')
    .controller('LoginCtrl', ['$scope','$rootScope', '$cookieStore','$state','$timeout','$location','$window','LoginService', LoginCtrl]);

function LoginCtrl($scope,$rootScope, $cookieStore,$state,$timeout,$location,$window,LoginService) {
    $rootScope.updateFrame();
    $scope.formData = {
        userName:'',
        password:'',
    };
    $scope.login=function(){
        LoginService.login($scope.formData.userName,$scope.formData.password,function(err,data){
            if(err){
                alert(err);
            }else{
                $cookieStore.put('token',data);
                $window.location.href=AppRootURL;
                console.log(data);
            }
        });
    }
}
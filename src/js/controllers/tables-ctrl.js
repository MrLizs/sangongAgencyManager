/**
 * TablesCtrl Controller
 */

angular.module('RDash')
    .controller('TablesCtrl', ['$scope','$rootScope', '$cookieStore', TablesCtrl]);

function TablesCtrl($scope,$rootScope, $cookieStore) {
    $rootScope.frame.pageTitle = '表单';
    $scope.formData={};
    $scope.formData.name='hello!';
}
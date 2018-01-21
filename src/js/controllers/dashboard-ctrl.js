/**
 * DashboardCtrl Controller
 */

angular.module('RDash')
    .controller('DashboardCtrl', ['$scope','$rootScope', '$cookieStore', DashboardCtrl]);

function DashboardCtrl($scope,$rootScope, $cookieStore) {
    $rootScope.frame.pageTitle = '首页';
}
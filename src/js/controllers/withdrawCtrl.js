angular.module('RDash')
    .controller('withdrawCtrl', ['$scope', '$rootScope', '$cookieStore', '$http', withdrawCtrl])
function withdrawCtrl($scope, $rootScope, $cookieStore, $http) {
    $rootScope.frame.pageTitle = '提现记录';
    var token = $cookieStore.get('token');
    console.log(token);

    $scope.orders = {}
  
    $scope.timeFormat = function (timeStr) {
        if (timeStr && typeof timeStr == 'string') {
            return timeStr.replace(/T/g, ' ').replace(/Z/g, ' ').split('.')[0];
        }
        return '';
    };


    $http({
        method: 'GET',
        url: ServerRootURL + '/api/admin/agency/get_agencyOrders',
        headers: {
            'Authorization': token
        }
    }).then(function success(res) {
        console.log(res);
        $scope.orders = res.data;
        var orders = $scope.orders;
        //分页
        var count = res.data.length;
        $scope.pageSize = 10;
        $scope.pages = Math.ceil(count / $scope.pageSize);
        $scope.newPage = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        $scope.setData = function () {
            $scope.ordersList = orders.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize))
        };
        $scope.ordersList = orders.slice(0, $scope.pageSize);
        for (var i = 0; i < $scope.newPage; i++) {
            $scope.pageList.push(i + 1);
        }
        $scope.selectPage = function (page) {
            if (page < 1 || page > $scope.pages) return;
            if (page > 2) {
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
        };
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        };
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };

    }, function error(res) {
        alert('出现异常');
    })


}
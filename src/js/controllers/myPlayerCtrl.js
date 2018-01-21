angular.module('RDash')
    .controller('myPlayerCtrl', ['$scope', '$rootScope', '$cookieStore', '$http', myPlayerCtrl])
function myPlayerCtrl($scope, $rootScope, $cookieStore, $http) {
    $rootScope.frame.pageTitle = '我的玩家';
    var token = $cookieStore.get('token');
    console.log(token);

    $scope.formData = {
        ybValue: '',
        jbValue: ''
    }

    $scope.players = {}

    $scope.yuanBaos = function (player) {
        $scope.player = player;
    }

    $scope.glodCoins = function (player) {
        $scope.player = player;
    }

    $http({
        method: 'GET',
        url: ServerRootURL + '/api/admin/agency/get_agency_player',
        headers: {
            'Authorization': token
        }
    }).then(function success(res) {
        console.log(res);
        $scope.players = res.data;
        var players = $scope.players;

        //分页
        var count = res.data.length;
        $scope.pageSize = 10;
        $scope.pages = Math.ceil(count / $scope.pageSize);
        $scope.newPage = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        $scope.setData = function () {
            $scope.playerList = players.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize))
        };
        $scope.playerList = players.slice(0, $scope.pageSize);
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

    //给玩家充值元宝
    $scope.addYuanbao = function (userid) {
        var ybValue = $scope.formData.ybValue;
        if (!userid) {
            alert('找不到要充值的玩家');
            return;
        } else if (ybValue < 0) {
            alert('充值数量需大于0');
            return;
        } else {
            $http({
                method: 'POST',
                url: ServerRootURL + '/api/admin/agency/get_addGamegoldForPlayer',
                data: {
                    userid: userid,
                    value: $scope.formData.ybValue
                },
                headers: {
                    'Authorization': token
                }

            }).then(function success(res) {
                console.log(res);
                alert('元宝充值成功');

            }, function error(res) {
                alert('充值出现异常');
            })
        }

    }

    //给玩家充值金币
    $scope.addGoldCoin = function (userid) {
        var jbValue = $scope.formData.jbValue;
        if (!userid) {
            alert('找不到要充值的玩家');
            return false;
        } else if (jbValue < 0) {
            alert('充值数量需大于0');
            return false;
        } else {
            $http({
                method: 'POST',
                url: ServerRootURL + '/api/admin/agency/get_addCoinsForPlayer',
                data: {
                    userid: userid,
                    value: $scope.formData.jbValue
                },
                headers: {
                    'Authorization': token
                }

            }).then(function success(res) {
                console.log(res);
                alert('金币充值成功');
            }, function error(res) {
                alert('充值出现异常');
            })
        }

    }


}
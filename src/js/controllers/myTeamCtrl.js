angular.module('RDash')
    .controller('myTeamCtrl', ['$scope', '$rootScope', '$cookieStore', '$http', myTeamCtrl])
function myTeamCtrl($scope, $rootScope, $cookieStore, $http) {
    $rootScope.frame.pageTitle = '我的团队';
    var token = $cookieStore.get('token');
    console.log(token);

    $scope.members = {}
 
    $scope.others={}

    $scope.formData = {
        names: '',
        password: '',
        realname: '',
        contactway: '',
        coinsdiscount: '',
        gamegolddiscount: '',
        gamsdiscount: '',
        userName: ''
    }


    $scope.timeFormat = function (timeStr) {
        if (timeStr && typeof timeStr == 'string') {
            return timeStr.replace(/T/g, ' ').replace(/Z/g, ' ').split('.')[0];
        }
        return '';
    };

    //我的团队信息
    $http({
        method: 'GET',
        url: ServerRootURL + '/api/admin/agency/get_agency_team',
        headers: {
            'Authorization': token
        }
    }).then(function success(res) {
        console.log(res);
        $scope.members = res.data;
        var members= $scope.members;

        //分页
        var count = res.data.length;
        $scope.pageSize = 10;
        $scope.pages = Math.ceil(count / $scope.pageSize);
        $scope.newPage = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        $scope.setData = function () {
            $scope.membersList = members.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize))
        };
        $scope.membersList = members.slice(0, $scope.pageSize);
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


    //获取他人代理信息
    $scope.searchAgency = function () {
        $http({
            method: 'POST',
            url: ServerRootURL + '/api/admin/agency/get_agencyInfoByID',
            data: {
                username: $scope.formData.userName
            },
            headers: {
                'Authorization': token
            }
        }).then(function success(res) {
            console.log(res);
            $scope.others = res.data;
          

        }, function error(res) {
            alert('出现异常');
        })

    }




    //添加二级代理
    $scope.addAgency = function () {
        var username = $scope.formData.names;
        var password = $scope.formData.password;
        var realname = $scope.formData.realname;
        var phone = $scope.formData.contactway;
        var coinDis = $scope.formData.coinsdiscount;
        var goldDis = $scope.formData.gamegolddiscount;
        var gemDis = $scope.formData.gamsdiscount;
        var myReg = /^1(3|4|5|7|8|9)[0-9]\d{8}$/;
        var pattern = /^(0\.\d{1,2}|0)$/;

        if (!username) {
            alert('请填写用户名');
            return false;
        } else if (password.length < 6 || password.length > 12) {
            alert('密码长度6-12位');
            return false;
        } else if (!realname) {
            alert('请填写代理真实姓名');
            return false;
        } else if (!myReg.test(phone)) {
            alert('请填写有效手机号码');
            return false;
        } else if (!pattern.exec(coinDis) || !pattern.exec(goldDis) || !pattern.exec(gemDis)) {
            alert('折扣是一个小数点后保留两位以内的非负小数');
            return false;
        } else {
            $http({
                method: 'POST',
                url: ServerRootURL + '/api/admin/agency/addAgency',
                data: {
                    username: $scope.formData.names,
                    password: $scope.formData.password,
                    realname: $scope.formData.realname,
                    contactway: $scope.formData.contactway,
                    coinsdiscount: $scope.formData.coinsdiscount,
                    gamegolddiscount: $scope.formData.gamegolddiscount,
                    gamsdiscount: $scope.formData.gamsdiscount
                },
                headers: {
                    'Authorization': token
                }

            }).then(function success(res) {
                console.log(res);
                alert('添加代理成功');
            }, function error(res) {
                alert('添加代理出现异常');
            })
        }


    }

}
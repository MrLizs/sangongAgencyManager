angular.module('RDash')
    .controller('myInformationCtrl', ['$scope', '$rootScope', '$cookieStore', '$http', myInformationCtrl])
function myInformationCtrl($scope, $rootScope, $cookieStore, $http) {
    $rootScope.frame.pageTitle = '我的信息';
    var token = $cookieStore.get('token');
    console.log(token);

    $scope.myInfo = {
        password: ''
    }

    $scope.formData = {
        password: '',
        newpassword: '',
        money:''
    }

    $http({
        method: 'GET',
        url: ServerRootURL + '/api/admin/agency/get_myAgencyInfo',
        headers: {
            'Authorization': token
        }
    }).then(function success(res) {
        console.log(res);
        $scope.myInfo = res.data;
        $scope.myInfo.password = res.data.password;
       
    }, function error(res) {
           alert('出现异常');
    })

    //修改密码
    $scope.savePassword = function () {
        var password = $scope.formData.password;
        var newpassword = $scope.formData.newpassword;
        if (!password) {
            alert('请输入旧密码');
            return;
        } else if (newpassword.length < 6 || newpassword.length > 12) {
            alert('密码长度6-12位');
            return;
        } else {
            $http({
                method: 'POST',
                url: ServerRootURL + '/api/admin/agency/get_ChangePW',
                data: {
                    password: $scope.formData.password,
                    newpassword: $scope.formData.newpassword
                },
                headers: {
                    'Authorization': token
                }
            }).then(function success(res) {
                console.log(res);

            }, function error(res) {
                alert('出现异常');
            })
        }

    }

    //代理提现
    $scope.withdraw=function(){
        var  money = $scope.formData.money;
        if(money<=0){
           alert('请输入正确金额');
           return;
        }else{
            $http({
                method: 'POST',
                url: ServerRootURL + '/api/admin/agency/add_agencyOrders',
                data: {
                    money: $scope.formData.money
                },
                headers: {
                    'Authorization': token
                }
            }).then(function success(res) {
                console.log(res);
                alert('申请提现成功，请联系相关客服人员');
                
            }, function error(res) {
                   alert('出现异常');
            })
        }
       
    
    }
    


    $('#myModal1').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });

    $('#myModal2').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });

    $('#myModal3').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });

    $('#myModal4').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });
}
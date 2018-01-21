angular.module('RDash').factory('LoginService', ['$http', LoginService]);

function LoginService($http) {
    var login = function (userName, password, callback) {
     
        $http({
            method: 'POST',
            url: ServerRootURL + '/api/admin/agency/login',
            data: {
                userName: userName,
                password: password,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            function successCallback(res) {
                callback(null, res.data);
              
            }, function errorCallback(res) {
                callback(res);
            });

    };

    var logout = function (token, callback) {
        $http({
            method: 'GET',
            url: ServerRootURL + '/api/admin/agency/logout',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(
            function successCallback(res) {
                callback(null, res.data);
            }, function errorCallback(res) {
                callback(res);
            });
    }

    return {
        login: login,
        logout: logout,
    };
}
'use strict';
//var ServerRootURL = 'http://192.168.1.185:9029';
var ServerRootURL = 'http://192.168.1.107:9029';
//var ServerRootURL = 'http://192.168.1.241:9029';

var AppRootURL = 'http://127.0.0.1:9028';

angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/dashboard');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'templates/login.html'
            })
            .state('index', {
                url: '/',
                controller: 'DashboardCtrl',
                templateUrl: 'templates/dashboard.html'
            })
            .state('dashboard',{
                url:'/dashboard',
                controller:"DashboardCtrl",
                templateUrl:"templates/dashboard.html"
            })
                    
            .state('myTeam',{
                url:'/myTeam',
                controller:'myTeamCtrl',
                templateUrl:'templates/myTeam.html'
            })
            .state('myPlayer',{
                url:'/myPlayer',
                controller:'myPlayerCtrl',
                templateUrl:'templates/myPlayer.html'
            })

            .state('myInformation',{
                url:'/myInformation',
                controller:'myInformationCtrl',
                templateUrl:'templates/myInformation.html'
            })

            .state('withdraw',{
                url:'/withdraw',
                controller:'withdrawCtrl',
                templateUrl:'templates/withdraw.html'
            })          
            

    }
]);
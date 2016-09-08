// Ionic mainApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mainApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mainApp.services' is found in services.js
// 'mainApp.controllers' is found in controllers.js
angular.module('userApp', ['ionic', 'userApp.service','ngCordova','config'])
.run(['$ionicPlatform', '$rootScope', '$location', '$timeout', '$ionicHistory', '$ionicPopup', function($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $ionicPopup) {
        
        $ionicPlatform.ready(function() {
            
            $ionicPlatform.registerBackButtonAction(function(e) {
                e.preventDefault();
                //判断处于哪个页面时双击退出
                if ($location.path() == '/other') {
                   $rootScope.logout();
                } else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                } else {
                    // This is the last page: Show confirmation popup
                   $rootScope.logout();
                }
                return false;
            }, 101);
            
            $rootScope.logout = function(){
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        location.href='index.html';
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            };
            /*
                 $rootScope.logout = function(){
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            };
             */
          
        });      
       
}]);

 
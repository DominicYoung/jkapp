'use strict';

var createApp = angular.module('createApp', [
	'ionic',
    'config',
	'sensitiveWord'
])
.config(['$httpProvider', function($httpProvider) {
     $httpProvider.defaults.headers.common['terminal'] = 'mobile';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}])
.run(['$ionicPlatform', '$ionicHistory','$rootScope', '$http', '$location', function($ionicPlatform, $ionicHistory,$rootScope, $http, $location) {
    //检测当前的设备是否就绪
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
        $ionicPlatform.registerBackButtonAction(function (e) {
            e.preventDefault();
            $ionicHistory.goBack();
            return false;
        }, 101);
    });
        
	//敏感词
	$rootScope.sensitiveWords = [];
}]);
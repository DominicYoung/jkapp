angular.module('setInfoApp', ['ionic','ngCordova'])
.config(['$httpProvider', function($httpProvider) {
    //修改或者扩充请求头
    $httpProvider.defaults.headers.common['terminal'] = 'mobile';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}])
.run(['$ionicPlatform', '$ionicHistory',function($ionicPlatform, $ionicHistory) {
    //检测当前的设备是否就绪
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
    });
    $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        location.href = "../main.html#/user";
        return false;
    }, 101);
}]);

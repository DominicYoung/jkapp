angular.module('knlApp', [
        'ionic'
    ])
    .config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider, $httpProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $httpProvider.defaults.headers.common['terminal'] = 'mobile';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        //返回按钮样式
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
        $ionicConfigProvider.backButton.text('返回');
        $ionicConfigProvider.backButton.previousTitleText(false);
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
        // $ionicPlatform.registerBackButtonAction(function (e) {
        //     e.preventDefault();
        //     location.href = "../main.html#/user";
        //     return false;
        // }, 101);
    }]);
'use strict';

/**
 * @ngdoc module
 * @name browseApp
 * @description
 * # bowerApp
 * 根据url中hash来分类浏览
 * Main module of the application.
 */


var browseApp = angular.module('browseApp', [
        'ionic',
        'config',
        'commonDirective',
        'commonFilter',
        'ngCordova'
    ])
    .config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider, $httpProvider) {

        $ionicConfigProvider.views.maxCache(5);
        //配置android平台的缓存
        $ionicConfigProvider.platform.android.views.maxCache(5);
        $httpProvider.defaults.headers.common['terminal'] = 'mobile';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }])
    .run(['$ionicPlatform', '$rootScope', '$http', '$location', 'fileManage','getMyInfo', function($ionicPlatform, $rootScope, $http, $location, fileManage, getMyInfo) {
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
                history.go(-1);
                return false;
            }, 101);
            fileManage.initDB();
        });

        //userInfo用户信息，knlType知识类型
        $rootScope.userInfo = {},

        getMyInfo().then(function(data){
            $rootScope.userInfo = data;
        },function(err){});

        var knlParamArr = $location.path().split('/');
    console.log($location.path());
    console.log(knlParamArr);
        $rootScope.params = {
            typeID : knlParamArr[1],
            knlID : knlParamArr[2]
        };

        $rootScope.goBack = function(){
            window.history.go(-1);
        };

    }]);
browseApp.filter('knlName',function(){
    return function(id){
        id = Number(id);
        var name = "";
        switch(id){
            case 0:
            name = '经验案例';
            break;
            case 1:
            name = '问答园地';
            break;
            case 2:
            name = '技术文档';
            break;
            case 3:
            name = '词条';
            break;
            case 4:
            name = '已知问题';
            break;
            default:
            name = '';
        }
        return name;
    };
});

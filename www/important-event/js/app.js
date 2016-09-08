"use strict";

angular.module('impApp', ['ionic', 'ngCordova', 'ionic-datepicker'])
    .config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider, $httpProvider) {

        $ionicConfigProvider.views.maxCache(5);
        //配置android平台的缓存
        $ionicConfigProvider.platform.android.views.maxCache(5);
        $httpProvider.defaults.headers.common['terminal'] = 'mobile';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }])
    .run(['$ionicPlatform', '$rootScope', '$location', '$timeout', '$ionicHistory', '$ionicPopup',
        function($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $ionicPopup) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                };
                $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
                history.go(-1);
                return false;
            }, 101);
            });

            /**
             * 返回上一页
             */
            $rootScope.goBack = function() {
                window.history.go(-1);
            };

        }
    ]);

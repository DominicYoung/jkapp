"use strict";

angular.module('homeApp', ['ionic', 'ngCordova', 'checkUpdate', 'slider', 'config', 'calender', 'impApp'])
  .config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider, $httpProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $httpProvider.defaults.headers.common['terminal'] = 'mobile';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        //返回按钮样式
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
        $ionicConfigProvider.backButton.text('返回');
        $ionicConfigProvider.backButton.previousTitleText(false);
    }])
  .run(['$ionicPlatform', '$rootScope', '$location', '$timeout', '$ionicHistory', '$ionicPopup', 'checkUpdate', 'navData','$http',
    function ($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $ionicPopup, checkUpdate, navData, $http) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
        $ionicPlatform.registerBackButtonAction(function (e) {
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

        $rootScope.logout = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出应用?</strong>',
            template: '你确定要退出应用吗?',
            okText: '退出',
            cancelText: '取消'
          });

          confirmPopup.then(function (res) {
            if (res) {
              var url = 'https://jkzx.archclearing.com/sso/rest/logout';
              $http.get(url).success(function (data) {
                ionic.Platform.exitApp();
              }).error(function (error, status) {
                ionic.Platform.exitApp();
              });
            } else {
              // Don't close
            }
          });
        };
        //fileManage.initDB();
      });

      // 监控路由切换
      $rootScope.choiceNav = '';
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        var stateTopName = toState.name.split('.')[0];
        var choiceNavs = navData.filter(function (n) {
          return n.state === stateTopName;
        });
        $rootScope.choiceNav = choiceNavs[0];
      });
    }
  ]);

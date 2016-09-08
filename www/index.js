'use strict';
/**
 * @ngdoc overview
 * @name ncnmApp
 * @description
 * 登录页面
 * 主要提供用户和管理员登录知识库
 *
 *
 * Main module of the application.
 */
angular.module('indexApp', ['ionic', 'ngCordova', 'checkUpdate', 'push','homeApp','browseApp','userApp','infoApp','knlApp','favoriteApp','recommendApp','fileApp'])
  .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($httpProvider, $stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $stateProvider.state('notFound', {
      url: '/notFound',
      templateUrl: 'notFound.html',
      controller: 'ctrl.notFound'
    });

    $stateProvider.state("tab", {
      url: "/tab",
      abstract: true,
      templateUrl: "home/views/tabs.html",
    })
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'home/views/home.html',
            controller: "ctrl.home"
          }
        }
      }).state('tab.management', {
        url: '/management',
        views: {
          'tab-management': {
            templateUrl: 'home/views/management.html',
            controller: "ctrl.management"
          }
        }
      }).state('tab.assess', {
        url: '/assess',
        views: {
          'tab-assess': {
            templateUrl: 'home/views/assess.html',
            controller: "ctrl.assess"
          }
        }
      })
      .state('tab.user', {
        url: '/user',
        views: {
          'tab-user': {
            templateUrl: 'user/user.html',
            controller: "ctrl.user"
          }
        }
      })
      .state('tab.knl', {
        url: '/knl/:id',
        views: {
          'tab-knl': {
            templateUrl: 'home/views/knl.html',
            controller: "ctrl.knl"
          }
        }
      })
      .state("monthy",{
        url:"/monthy",
        templateUrl:"important-event/views/monthly.html",
        // cache:false,
        controller:"monthly.imp"
      })
      .state("complaint-detail",{
        url:"/complaint-detail/:id/:month/:total",
        cache:false,
        templateUrl:"important-event/templates/complaint-detail.html",
        controller:"monthly.detail"
      })
      .state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'landCtrl'
      })
      .state('browse',{
        url:'/browse/:typeID/:knlID',
        templateUrl:'knl/browse.html',
        controller:'knlController'
      })
      .state('userInfo',{
        url:'/userinfo',
        templateUrl:'user/views/info.html',
        controller:'infoController'
      })
      .state('myknl',{
        url:'/myknl',
        cache:false,
        templateUrl:'user/views/myknl.html',
        controller:'myKnlController'
      })
      .state('favorite',{
        url:'/favorite',
        cache:false,
        templateUrl:'user/views/favorite.html',
        controller:'favoriteController'
      })
      .state('recommend',{
        url:'/recommend',
        cache:false,
        templateUrl:'user/views/recommend.html',
        controller:'recommendController'
      })
      .state('file',{
        url:'/file',
        templateUrl:'user/views/file.html',
        controller:'fileController'
      })
      // .state('oursDetails', {
      //       url: '/oursDetails',
      //       templateUrl: "home/views/ours-details.html",

      //   });

    $urlRouterProvider
      .otherwise('/login');

    $ionicConfigProvider.views.maxCache(5);
    //配置android平台的缓存
    $ionicConfigProvider.platform.android.views.maxCache(5);
    $httpProvider.defaults.headers.common['terminal'] = 'mobile';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  }])
  .run(['$ionicPlatform', 'checkUpdate', 'userList', 'Push', function($ionicPlatform, checkUpdate, userList, Push) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
        userList.initDB();
        var notificationCallback = function(data) {
            alert('received data:' + data);
        };
        if(ionic.Platform.isAndroid()){
            checkUpdate();
        }
        //初始化
        Push.init(notificationCallback);
        //设置别名
        Push.setAlias("123456789”);
    });
}]);
angular.module('indexApp').factory('userList', ['$cordovaSQLite', function($cordovaSQLite) {
    var db;

    function sqlResultTranslate(rows) {
        var rst = new Array(rows.length);
        for (var i = 0, len = rows.length; i < len; i++) {
            rst[i] = rows.item(i);
        }
        return rst;
    };
    var userList = {
        initDB: function() {
            try {
              console.warn("创建sqlite:");
                db = $cordovaSQLite.openDB('ncnm.db');
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS users(id integer primary key,name text)");
            } catch (e) {
                console.warn("无法创建sqlite:" + e.ErrorType);
            }
        },
        getUserList: function(num, callback) {
            var query = num ? "SELECT name FROM users ORDER BY id DESC LIMIT " + num : "SELECT name FROM users",
                callData = [];
            $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    callData = sqlResultTranslate(res.rows);
                    callback(callData);
                } else {
                    console.log("No results found");
                }
            }, function(err) {
                console.error(err);
            });
        },
        addUser: function(name) {
            var query = "INSERT INTO users (name) VALUES (?)";
            $cordovaSQLite.execute(db, query, [name]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
            }, function(err) {
                console.error(err);
            });
        },
        removeUser: function(name) {
            var query = "DELETE FROM users WHERE name = ?";
            $cordovaSQLite.execute(db, query, [name]).then(function(res) {
                console.log("delete ID -> " + res.deleteId);
            }, function(err) {
                console.error(err);
            });
        }
    };
    return userList;
}]);
/**
 * [登陆控制器]
 * @param  {[boolean]} $scope.show   [提示显示]
 * @param  {[string]} $scope.inputWrong [提示内容]
 * @param {[object]}   $scope.user     [用户信息]
 * @param {[function]}   $scope.submitForm     [提交表单]
 *  @return
 */
angular.module('indexApp').controller('landCtrl', ['$scope', '$http', '$ionicLoading', '$ionicModal', '$timeout', '$ionicPlatform', 'userList','$state', function($scope, $http, $ionicLoading, $ionicModal, $timeout, $ionicPlatform, userList,$state) {
    $scope.user = {
        userName: '',
        pwd: '',
        verifycode: ''
    };
    //最近使用的五个账户名
    $scope.userList = {
        show: false,
        rows: []
    };
    $scope.getUserList = function(rows) {
        $scope.user.userName = rows[0].name;
        $scope.userList.rows = rows.slice(1, 5);
    };
    $ionicPlatform.ready(function() {
        //userList.getUserList(6, $scope.getUserList);
    });
    $scope.userListShow = function() {
        $scope.userList.show = !$scope.userList.show;
    };
    $scope.choiceUser = function(name) {
        $scope.userList.show = false;
        $scope.user.userName = name;
    };
    $scope.rmUserList = function(u) {
        $scope.userList.rows.splice($scope.userList.rows.indexOf(u), 1);
        userList.removeUser(u.name);
    };
    //登录错误提示
    var err = $scope.error = {
        text: '登录失败',
        show: false
    };
    err.showFn = function(ddl, errName) {
        err.text = errName || '登录失败';
        err.show = true;
        if (!ddl) return;
        $timeout(function() {
            err.show = false;
        }, ddl);
        //登陆失败，更换验证码
        $scope.verifyCode();
    };
    //登录缓冲
    function loadingShow() {
        $ionicLoading.show({
            noBackdrop: true,
            template: '<ion-spinner icon="bubbles"></ion-spinner>',
            delay: 1000
        });
    };

    $scope.verifyCode = function() {
        var img = document.getElementById("code-img");
        img.src = baseUrl + "/sso/rest/code?" + Math.random();
    };

    $scope.verifyCode();

    function loadingHide() {
        $ionicLoading.hide();
    };
    $scope.user.userName = '';
    // 使用md5提交
    $scope.submitForm = function() {
        var url = baseUrl + '/sso/rest/login';
        var content = {};
        content.username = md5($scope.user.userName);
            content.password = md5($scope.user.pwd);
        content.code = md5($scope.user.verifycode);
        loadingShow();
        // userList.removeUser(content.username);
        // userList.addUser(content.username);
        $http.post(url, content).success(function(data) {
          //if(ionic.Platform.isIOS()){
          //  somai.upgrade.checkUpgrade();
          //}
            $scope.status = data.msgStatus;
            if (data.msgStatus == 1 || data.msgStatus == 2) {
                $ionicLoading.hide();
                storage['ssoid'] = data.obj;
                console.log(storage['ssoid']);
                //location.href = 'home/index.html';
              $state.go("tab.home");
            } else {
                if (data.msgStatus == -1) {} else {
                    $scope.user.pwd = '';
                }
                err.showFn(2500, data.msgText);
                $ionicLoading.hide();
            }
        }).error(function(error, status) {
            $scope.status = status;
            err.showFn(2500, '网络问题，请检查！');
            $ionicLoading.hide();
        });
    };
    $ionicModal.fromTemplateUrl('register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.registerModal = modal;
    })
    $scope.registerOpenModal = function() {
        $scope.registerModal.show();
    };
    $scope.registerCloseModal = function() {
        $scope.registerModal.hide();
    };
}]);



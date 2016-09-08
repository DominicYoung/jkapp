'use strict';
angular.module('homeApp')

.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'navData', function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, navData) {


    //$stateProvider.state('notFound', {
    //    url: '/notFound',
    //    templateUrl: '../notFound.html',
    //    controller: 'ctrl.notFound'
    //});
    ////var states = [];
    //
    ////转换nav为以为数组
    ////navData.forEach(function(nav) {
    ////    var len = states.length;
    ////    states[len] = {};
    ////    states[len].label = nav.label;
    ////    states[len].state = nav.state;
    ////  states[len].name = nav.name;
    ////    states = states.concat(nav.items);
    ////});
    ////
    //////对数组中item进行路由的注册
    ////states.forEach(function(state) {
    ////    var path = state.state.replace(/\./g, '/'),
    ////        nameList = state.state.split('.'),
    ////        name = nameList[nameList.length - 1],
    ////        templateUrl = 'views/' + path + '.html',
    ////        controller ='ctrl.' + state.state,
    ////      tabName = state.name;
    ////        if(name === 'knl'){
    ////            name = 'knl/:id';
    ////        }
    ////    $stateProvider.state('tab.' + state.state, {
    ////        url: '/' + name,
    ////      views:{
    ////        'tab-home' : {
    ////          templateUrl: templateUrl,
    ////          controller: controller
    ////        }
    ////      }
    ////    })
    ////});
    //$stateProvider.state("tab", {
    //  url: "/tab",
    //  abstract: true,
    //  templateUrl: "views/tabs.html",
    //})
    //  .state('tab.home', {
    //  url: '/home',
    //  views: {
    //    'tab-home': {
    //      templateUrl: 'views/home.html',
    //      controller: "ctrl.home"
    //    }
    //  }
    //}).state('tab.management', {
    //  url: '/management',
    //  views: {
    //    'tab-management': {
    //      templateUrl: 'views/management.html',
    //      controller: "ctrl.management"
    //    }
    //  }
    //}).state('tab.assess', {
    //  url: '/assess',
    //  views: {
    //    'tab-management': {
    //      templateUrl: 'views/assess.html',
    //      controller: "ctrl.assess"
    //    }
    //  }
    //})
    //  .state('tab.ours', {
    //    url: '/ours',
    //    views: {
    //      'tab-ours': {
    //        templateUrl: 'views/ours.html',
    //        controller: "ctrl.ours"
    //      }
    //    }
    //  })
    //  .state('tab.knl', {
    //    url: '/knl/:id',
    //    views: {
    //      'tab-knl': {
    //        templateUrl: 'views/knl.html',
    //        controller: "ctrl.knl"
    //      }
    //    }
    //  })
    //  .state("monthy",{
    //  url:"/monthy",
    //  templateUrl:"../important-event/views/monthly.html",
    //  controller:"monthly.imp"
    //});
    //
    //$urlRouterProvider
    //    //.when('/', '/home')
    //    .otherwise('/tab/home');


    $ionicConfigProvider.tabs.style('standard');

    //设置tabs默认位置为bottom
    $ionicConfigProvider.tabs.position('bottom');

    //增加头部元素terminal 为mobile
    $httpProvider.defaults.headers.common['ssoid'] = window.localStorage['ssoid'];

    //以表单形式进行提交
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);

'use strict';
angular.module('homeApp')
  .controller('ctrl.home', ['$scope', '$location', '$filter', '$ionicSlideBoxDelegate', 'sliderSource', 'hotKnlList', 'veryIndentify','$timeout','$state', function ($scope, $location, $filter, $ionicSlideBoxDelegate, sliderSource, hotKnlList, veryIndentify,$timeout,$state) {
    var vm = $scope.vm = {};
    vm.sliderList = [];
    //验证是否非法登录
    veryIndentify().then(function (data) {

    }, function (status) {
      //console.log(status);
      if (status == 401) {
        window.history.go(-1);
      }
    });
    sliderSource.getSliderList().then(function (data) {
      vm.sliderList = data;
      console.log(data);
    }, function (err) {
    });

    vm.hotSlideIndex = 0
    vm.hotSlideHasChanged = function ($index) {
      vm.hotSlideIndex = $index;
    };

    vm.hotSlideChange = function (index) {
      $ionicSlideBoxDelegate.$getByHandle('hotSlider').slide(index);
    };

    vm.hotKnlListFilter = 5;
    hotKnlList().then(function (data) {
      vm.hotKnlList = data;
    });

    vm.hotKnlListMore = function () {
      if (vm.hotKnlListFilter === 5) {
        vm.hotKnlListFilter = 10;
        return true;
      }
      $location.path('tab/knl/0');
      //$state.go('tab.knl',{'id':0});
    };
    vm.sliderOptions = {
      has_title: true,
      has_trigger: true,
      delay_time: 3000
    };

    $scope.goMonthy = function(){
      $state.go("monthy");
    }

    $timeout(function () {

      $ionicSlideBoxDelegate.$getByHandle('slideimgs').update();

      $ionicSlideBoxDelegate.$getByHandle('slideimgs').loop(true);

    }, 1000);
  }])
  .controller('ctrl.knl', ['$rootScope', '$scope', '$location', '$ionicModal', '$stateParams', 'knlNav', 'knl', 'resTypes', 'sysTypes', 'provinces', 'knlTypes', function ($rootScope, $scope, $location, $ionicModal, $stateParams, knlNav, knl, resTypes, sysTypes, provinces, knlTypes) {
    var vm = $scope.vm = {};
    vm.knlNav = knlNav;
    vm.knlActive = parseInt($stateParams.id) || 0;
    vm.knl = {};

    /**
     * [changeKnl 更改模块]
     * @param  {[num]} id [模块id]
     * @return {[type]}    [description]
     */
    vm.changeKnl = function (id) {
      vm.knlActive = id;
      angular.forEach(vm.knlNav, function (item) {
        if (item.id !== id) {
          item.active = false;
        } else {
          item.active = true;
        }
      });
      vm.knl = knl(id);
    };

    vm.swipeNext = function (id) {
      for (var i = 0, len = vm.knlNav.length; i < len; i++) {
        if (vm.knlNav[i].id == id) {
          vm.knlNav[i].active = false;
          if (i < len - 1) {
            vm.knlNav[i + 1].active = true;
            vm.knlActive = vm.knlNav[i + 1].id;
          } else {
            vm.knlNav[0].active = true;
            vm.knlActive = vm.knlNav[0].id;
          }
        }
      }
      vm.knl = knl(vm.knlActive);
    };
    vm.swipePre = function (id) {
      for (var i = 0, len = vm.knlNav.length; i < len; i++) {
        if (vm.knlNav[i].id == id) {
          vm.knlNav[i].active = false;
          if (i > 0) {
            vm.knlNav[i - 1].active = true;
            vm.knlActive = vm.knlNav[i - 1].id;
          } else {
            vm.knlNav[len - 1].active = true;
            vm.knlActive = vm.knlNav[len - 1].id;
          }
        }
      }
      vm.knl = knl(vm.knlActive);
    };
    vm.changeKnl(vm.knlActive);
    //搜索模块modal

    vm.searched = false;
    $ionicModal.fromTemplateUrl('views/search.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: false
    }).then(function (modal) {
      vm.searchModal = modal;
    });
    vm.openSearchModal = function () {
      vm.searchModal.show();
    };
    vm.closeSearchModal = function () {
      vm.searchModal.hide();
    };
    //下拉列表属性
    vm.searchList = {
      knlTypes: knlTypes,
      provinces: provinces,
      resTypes: resTypes,
      sysTypes: sysTypes
    };
    vm.search = {
      fullText: false,
      title: '',
      knlType: '-1',
      provKey: '',
      fullname: '',
      knlSysType: '',
      knlResourceType: '',
      releaseStartDate: '',
      releaseEndDate: ''
    };
    vm.searchReset = angular.copy(vm.search);
    var urlSearch = $location.search();
    for (var key in urlSearch) {
      if (vm.search.hasOwnProperty(key)) {
        vm.search[key] = urlSearch[key];
      }
    }
    ;
    //查询下拉显示
    vm.show = {
      knlTypes: false,
      provinces: false,
      resTypes: false,
      sysTypes: false,
      date: false,
    };
    //查询下拉
    vm.showFn = function (item) {
      vm.show[item] = !vm.show[item];
    };
    //查询时间段
    vm.dateRange = {
      on: 'dateStart',
      dateStart: {},
      dateEnd: {},
      years: [],
    };
    $rootScope.$on('dateShow', function (event, msg) {
      vm.show.date = msg;
    });
    //获取查询知识列表
    vm.getSearchList = function () {
      vm.knl.searchData = vm.search;
      if (vm.knl.search) {
        vm.knl.getNewListMore();
      } else {
        vm.knl.getSearchList();
      }
      vm.closeSearchModal();
      vm.knl.searched = true;
    };

    vm.clearSearchFn = function () {
      vm.search = angular.copy(vm.searchReset);
    }
  }])
  .controller('ctrl.management', ['$scope', function ($scope) {

  }])
  .controller('ctrl.assess', ['$scope', function ($scope) {

  }]);

angular.module('investApp').controller('ctrl.invest', ['$scope','$ionicSideMenuDelegate', function($scope,$ionicSideMenuDelegate) {
    var vm = $scope.vm = {};

    //异常来源类型列表
    vm.sourceList = ['网厅异常协查', '短厅异常协查', '平台共管自动协查', '平台共管异常协查', '业务流量监测自动协查', '业务流量监测异常协查', '业务探测自动协查', '业务探测异常协查', 'WAP厅异常协查', 'IVR探测异常协查'];
    
    //查询条件
    vm.search = {
        beginTime: '',
        endTime: '',
        state: '关闭',
        source: vm.sourceList[0]
    };

    // 原始查询条件
    vm.searchReset = angular.copy(vm.search);

    //条件下拉显示
    vm.show = {
    	source: false
    };

    // 条件下拉控制
    vm.showFn = function(type){
    	vm.show[type] = !vm.show[type];
    	console.log(vm.show[type]);
    };

    //获取查询结果
    vm.getSearchList = function() {

        $ionicSideMenuDelegate.toggleRight();
    };

    vm.clearSearchFn = function() { 
        vm.search = angular.copy(vm.searchReset);
    }

}])
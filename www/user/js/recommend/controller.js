angular.module('recommendApp')

/**
 * 推荐给我页面
 * @param {依赖服务} $scope, $http, $window, $ionicPopup
 */
.controller('recommendController', ['$scope', '$http', '$window', '$ionicPopup', '$timeout', '$ionicScrollDelegate', function($scope, $http, $window, $ionicPopup, $timeout, $ionicScrollDelegate) {
    $scope.knlList = {};
    $scope.choicedType = -1;
    $scope.moreData = {
        CanBeLoaded: true,
        loadedRemind: '已经到底了！'
    };
    var urlHost = window.localStorage['urlHost']; //ip地址
    /**
     * 获取推荐知识列表
     */
    function getKnlList(page) {
    //debugger;
        var page = page || 1, 
        url = urlHost + "rest/recommend/page/me/"+ (page || 1) +"/10",
        data = $scope.choicedType === -1 ? '' : 'knlModule=' + $scope.choicedType,
        postCfg={
                headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
            };
        if(page === 1){
            $ionicScrollDelegate.$getByHandle('knlsScroll').scrollTop(false);
        }
        return $http.post(url, data,postCfg).then(function(res){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return res.data;
        });
    }

    //推荐给我列表控制显示
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    
    $scope.getknlList = function(page){
        if($scope.knlList.curPage === undefined || page === 1){
            getKnlList(1).then(function(data){
               $scope.knlList.curPage = data.pageVO.curPage;
               $scope.knlList.totalPages = data.pageVO.totalPages;
               $scope.knlList.rows = data.rows;
        console.log($scope.knlList);
            });
        }else {
            getKnlList(++$scope.knlList.curPage).then(function(data){
               $scope.knlList.curPage = data.pageVO.curPage;
               $scope.knlList.totalPages = data.pageVO.totalPages;
               $scope.knlList.rows = $scope.knlList.rows.concat(data.rows);
        console.log($scope.knlList);
            });            
        }
    };
    
    $scope.moreDataCanBeLoaded = function(){
        if($scope.knlList.curPage === undefined){
            return true;
        }else if($scope.knlList.curPage === $scope.knlList.totalPages){
            $scope.moreData.CanBeLoaded = false;
            $scope.moreData.loadedRemind = '已经到底了！';
            return false;
        }else if($scope.knlList.curPage > $scope.knlList.totalPages){
            $scope.moreData.CanBeLoaded = false;
            $scope.moreData.loadedRemind = '暂无知识';
            return false;
        }else {
            $scope.moreData.CanBeLoaded = true;
            return true;
        }
    };

    $scope.choiceType = function(knlModule) {
        $scope.choicedType =  knlModule;
        $scope.getknlList(1);
    };

    /**
     * 删除指定推荐知识
     */
    $scope.deleteKnl = function(knl) {
        var url = urlHost + "rest/recommend/delete/" + knl.recommendID;
        $http.post(url).success(function(data) {
            if (data.msgStatus === 1) {
                $scope.knlList.rows.splice($scope.knlList.rows.indexOf(knl),1);
            } else if (data.msgStatus === -1) {
                $scope.showAlert('delete-knl-f'); //提示信息
            }
        }).error(function() {
            $scope.showAlert('delete-knl-f');
        });
    };

    /**
     * 提示信息
     */
    var showTemplates = {
        'delete-knl-s': {
            title: '提示信息',
            template: '知识删除成功！',
            okText: '确定'
        },
        'delete-knl-f': {
            title: '提示信息',
            template: '知识删除失败！',
            okText: '确定'
        }
    };
    $scope.showAlert = function(type) {
        var alertPopup = $ionicPopup.alert(showTemplates[type]);
        alertPopup.then(function(res) {});
        $timeout(function() {
            alertPopup.close(); //关闭提示框
        }, 3000);
    };

    /**
     * 返回个人中心页
     */
    // $scope.myGoBack = function() {
    //     location.href='../main.html#/user';
    // };

}]);

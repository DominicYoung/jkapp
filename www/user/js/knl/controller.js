angular.module('knlApp')

/**
 * 我的知识页面
 * @param {依赖服务} $scope, $http, $ionicSideMenuDelegate, $window, $ionicPopup
 */
.controller('myKnlController', ['$scope', '$http', '$ionicSideMenuDelegate', '$window', '$ionicPopup', '$timeout', '$ionicScrollDelegate', function($scope, $http, $ionicSideMenuDelegate, $window, $ionicPopup, $timeout, $ionicScrollDelegate) {
  console.log('ddjfjjfjjjg');
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.knlList = {};
    $scope.choicedType = -1;
    $scope.moreData = {
        CanBeLoaded: true,
        loadedRemind: '已经到底了！'
    };
    console.log($scope.moreData.CanBeLoaded);
    var urlHost = window.localStorage['urlHost']; //ip地址

    /**
     * 获取我的知识列表
     */
    function getKnlList(page) {
        var page = page || 1,
        url = urlHost + "rest/user/knl/me/"+ (page || 1) +"/10",
        data = $scope.choicedType === -1 ? '' : 'knlModule=' + $scope.choicedType,
        postCfg={
                headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
            };
        if(page === 1){
            $ionicScrollDelegate.$getByHandle('knlsScroll').scrollTop(false);
        }
        return $http.post(url, data, postCfg).then(function(res){
            if(res.data.rows.length > 0){
                checkOutdate(res.data.rows);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return res.data;
        });
    }

    //我的知识列表控制显示
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    $scope.getknlList = function(page){
        if($scope.knlList.curPage === undefined || page === 1){
            getKnlList(1).then(function(data){
               $scope.knlList.curPage = data.pageVO.curPage;
               $scope.knlList.totalPages = data.pageVO.totalPages;
               $scope.knlList.rows = data.rows;
            });
        }else {
            getKnlList(++$scope.knlList.curPage).then(function(data){
               $scope.knlList.curPage = data.pageVO.curPage;
               $scope.knlList.totalPages = data.pageVO.totalPages;
               $scope.knlList.rows = $scope.knlList.rows.concat(data.rows);
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
     * 废弃知识
     */
    $scope.disableKnl = function(knl) {
        var url = urlHost + "rest/disable/knl/" + knl.knlModule + "/" + knl.knlID;
        $http.post(url, {}).success(function(data) {
            if (data.msgStatus === 1) {
                knl.status = 4;
            } else if (data.msgStatus === -1) {
                $scope.showAlert('disable-knl-f'); //提示信息
            }
        }).error(function() {
            $scope.showAlert('disable-knl-f');
        });
    };

    /**
     * 删除知识
     */
    $scope.deleteKnl = function(knl) {
        var url = urlHost + "rest/knl/del/" + knl.knlModule + "/" + knl.knlID,
            data = "";
        $http.post(url,data).success(function(data) {
            if (data.msgStatus === 1) {
                $scope.showAlert('delete-knl-s'); //提示信息
                $scope.knlList.rows.splice($scope.knlList.rows.indexOf(knl),1);
            } else {
                $scope.showAlert('delete-knl-f'); //提示信息
            }
        }).error(function() {
            $scope.showAlert('delete-knl-f');;
        });
    };


    var outdateList = null;
    function checkOutdate(knlRows){
        if(outdateList === null){
            var url = urlHost + 'rest/knl/lib/0'; //获得过期知识列表
            $http.get(url).success(function(res){
                outdateList = res;
                for(var i = 0,ilen = res.length;i < ilen;i++){
                    for(var j = 0,jlen =knlRows.length; j < jlen;j++){
                        if(knlRows[j].knlID === res[i].knlID){
                            console.log('red');
                            knlRows[j].title='<span class="assertive">' + knlRows[j].title +'</span>';
                            knlRows[j].title =  knlRows[j].title + '（即将过期）'
                        }
                    }
                }
            });
        }else{
            for(var i = 0,ilen = outdateList.length;i < ilen;i++){
                for(var j = 0,jlen =knlRows.length; j < jlen;j++){
                    if(knlRows[j].knlID === outdateList[i].knlID){
                        console.log('red');
                        knlRows[j].title='<span class="assertive">' + knlRows[j].title +'</span>';
                        knlRows[j].title =  knlRows[j].title + '（即将过期）'
                    }
                }
            }
        }
    };


    /**
     * 提示信息
     */
    var showTemplates = {
        'disable-knl-s': {
            title: '提示信息',
            template: '废弃知识成功！',
            okText: '确定'
        },
        'disable-knl-f': {
            title: '提示信息',
            template: '废弃知识失败！',
            okText: '确定'
        },
        'delete-knl-s': {
            title: '提示信息',
            template: '删除知识成功！',
            okText: '确定'
        },
        'delete-knl-f': {
            title: '提示信息',
            template: '删除知识失败！',
            okText: '确定'
        }
    };
    $scope.showAlert = function(type) {
        var alertPopup = $ionicPopup.alert(showTemplates[type]);
        alertPopup.then(function(res) {});
        $timeout(function() {
            alertPopup.close(); //关闭提示框
        }, 1000);
    };

}])
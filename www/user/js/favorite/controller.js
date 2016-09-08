angular.module('favoriteApp')

/**
 * 我的收藏页面
 * @param {依赖服务} $scope, $http, $window, $ionicPopup
 */
.controller('favoriteController', ['$scope', '$http', '$window', '$timeout', '$ionicPopup', '$ionicScrollDelegate', function($scope, $http, $window, $timeout, $ionicPopup, $ionicScrollDelegate) {
    $scope.bookmakerList = []; //收藏夹列表
    $scope.promptObj = { //提示信息
        msgStatus: '',
        msgText: ''
    };

    //收藏夹列表控制显示
    
    $scope.bmknlList =   {
        shouldShowDelete : false,
        listCanSwipe : true
    };

    //收藏夹组列表显示
    $scope.bmGroup = {
        shouldShowDelete : false,
        listCanSwipe : true
    };
    /**
     * [crt 创建收藏夹]
     * @type {Object}
     */
    $scope.crt = {
        groupID : 0,
        groupName : ''
    };
    $scope.addBookmakerShow = false; //显示创建收藏夹


     //重命名
    $scope.renameObj = {};  //获取将要修改的收藏夹对象
    var renameObjCopy = {};  //收藏夹副本，如果修改失败，返回给原对象
    $scope.renameShow = false;

    var knlModule = ""; //知识分享方式
    $scope.knlList = {}; //知识列表
    $scope.choiceBookmaker = -1; //选定收藏夹ID
    $scope.moreData = {
        CanBeLoaded: true,
        loadedRemind: '已经到底了！'
    };
    var urlHost = window.localStorage['urlHost'];
    /**
     * 获取我的知识列表
     */
    function getKnlList(page) {
        var page = page || 1,
            url = urlHost + "rest/bookmaker/knl/page/"+ (page || 1) +"/10",
        data = $scope.choiceBookmaker === -1 ? '' : 'groupID=' + $scope.choiceBookmaker,
        postCfg={
                headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
            };
        if(page === 1){
            $ionicScrollDelegate.$getByHandle('knlsScroll').scrollTop(false);
        }
        return $http.post(url, data, postCfg).then(function(res){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return res.data;
        });
    }

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
        }else if($scope.knlList.rows.length === 0){
            $scope.moreData.CanBeLoaded = false;
            if($scope.choiceBookmaker === -1){
                $scope.moreData.loadedRemind = '默认收藏夹暂无知识，请查看其它收藏夹！';
            }else{
                $scope.moreData.loadedRemind = '此收藏夹暂无知识！';
            }
            return false;
        }else if($scope.knlList.curPage === $scope.knlList.totalPages){
            $scope.moreData.CanBeLoaded = false;
            $scope.moreData.loadedRemind = '已经到底了！';
            return false;
        }else {
            $scope.moreData.CanBeLoaded = true;
            return true;
        }
    };

    $scope.choiceBookmakerList = function(groupID) {
        $scope.choiceBookmaker =  groupID;
        $scope.getknlList(1);
    };

    /**
     * 创建收藏夹
     */
    
    $scope.addBookmakerShowFn = function () {
        $scope.addBookmakerShow = !$scope.addBookmakerShow;
    };

    $scope.addBookmaker = function() {
        var add_bookmaker_url = urlHost + "rest/bookmaker/add";
        var data = "groupName=" + $scope.crt.groupName;
        if (isBookmakerExist($scope.crt.groupName)) {
            return false;
        }
        $http.post(add_bookmaker_url, data).success(function(response) {
            $scope.promptObj.msgStatus = response.msgStatus,
                $scope.promptObj.msgText = response.msgText;
            if ($scope.promptObj.msgStatus === 1) {
                $scope.crt.groupID = response.obj;
                $scope.bookmakerList.push(angular.copy($scope.crt));
                $scope.crt.groupName =  '';
                $scope.addBookmakerShowFn();
                getBookmakerList(); //刷新收藏夹列表
            } else {
                $scope.showAlert('add-bookmaker-f'); //提示信息
            }
        }).error(function() {
            $scope.showAlert('add-bookmaker-f');
        });
    };

    /**
     * [deleteBookMaker 删除收藏夹]
     * @param  {[type]} groupID [收藏夹id]
     * @return {[type]}         [description]
     */
    $scope.deleteBookMaker = function (groupID){
        var del_bookmaker_url = urlHost + "rest/bookmaker/del/" + groupID;
        $scope.showConfirm('del-bookmaker-i',function(){
            $http.get(del_bookmaker_url).success(function(res){
                if(res.msgStatus === 1){
                    for(var i = 0,len = $scope.bookmakerList.length; i < len; i++){
                        if($scope.bookmakerList[i].groupID === groupID){
                            $scope.bookmakerList.splice(i,1);
                        }
                    }
                }else {
                    if(res.msgStatus === -1 && res.msgText === "收藏夹内有知识"){
                        $scope.showAlert('del-bookmaker-n');
                    }else{
                        $scope.showAlert('del-bookmaker-f');
                    }
                }
            }).error(function() {
                $scope.showAlert('del-bookmaker-f');
            })
        });

    }

    $scope.deleteknlbygroup = function(groupID){
        var url = urlHost + 'rest/bookmaker/deleteknlbygroup/' + groupID;
        $scope.showConfirm('del-knlbygroup-i',function(){
            $http.get(url).success(function(res){
                if(res.msgStatus === 1){
                    if($scope.choiceBookmaker === groupID){
                        $scope.knlList = {};
                    }
                    $scope.showAlert('del-knlbygroup-s');
                }else {
                    $scope.showAlert('del-knlbygroup-f');
                }
            }).error(function() {
                $scope.showAlert('del-knlbygroup-f');
            })
        });
    }

    /**
     * [rename 重命名]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    $scope.rename = function(obj){
        renameObjCopy = obj;
        $scope.renameObj = angular.copy(obj);
        $scope.renameShow = true;
    }

    $scope.renameShowFn = function(){
        $scope.renameShow  = !$scope.renameShow;
    }

    $scope.renamePost = function(){
        var url = urlHost + "rest/bookmaker/update/"+ $scope.renameObj.groupID;
        data = "groupName="+ $scope.renameObj.groupName;
        if (isBookmakerExist($scope.renameObj.groupName)) {
            $scope.renameObj.groupName = renameObjCopy.groupName;
            return false;
        }
        $http.post(url,data).success(function(res) {
            if(res.msgStatus === 1){
                renameObjCopy.groupName =  $scope.renameObj.groupName;
                $scope.renameShowFn();
                $scope.renameObj = {};
                renameObjCopy = {};
            }else{
                $scope.showAlert('upd-bookmaker-f');
                $scope.renameObj.groupName = renameObjCopy.groupName;
            }  
        }).error(function() {
            $scope.showAlert('upd-bookmaker-f');
        });
    }
    /**
     * 查询收藏夹列表
     */
    function getBookmakerList() {
        var url = urlHost + "rest/bookmaker/list/group";

        $http.post(url).success(function(data) {
            $scope.bookmakerList = data;
        }).error(function() {
            console.log("查询收藏夹列表失败！");
        });

        $scope.activeID = ""; //没有收藏夹被选中
    }


    /**
     * 判断收藏夹列表和要创建的收藏夹是否有重复或者为空
     */
    function isBookmakerExist(groupName) {
        console.log(groupName);
        if(!groupName){
            $scope.showAlert('add-bookmaker-n');
            return true;
        }
        
        if ($scope.bookmakerList == undefined || $scope.bookmakerList == []) {
            return false;
        }
        for (var i = 0; i < $scope.bookmakerList.length; i++) {
            if (groupName == $scope.bookmakerList[i].groupName) {
                $scope.showAlert('bookmaker-exist'); //提示信息
                return true;
            }
        }
    }


    /**
     * 查询收藏知识列表
     */
    function getFavoriteKnl() {
        var tmpObj = {};
        var url = urlHost + "rest/bookmaker/knl/page/1/10";

        $http.post(url).success(function(data) {
            tmpObj.rows = data.rows;
            tmpObj.curPage = data.pageVO.curPage;
            tmpObj.totalPages = data.pageVO.totalPages;
        }).error(function() {
            console.log("查询收藏知识失败");
        });
        $scope.knlList = tmpObj;
    }


    /**
     * 删除指定收藏的知识
     */
    $scope.deleteKnl = function(knlModule, knlID) {
        var url = urlHost + "rest/bookmaker/deleteknl/" + knlModule + "/" + knlID,
        data = $scope.choiceBookmaker === -1 ? "" : "groupID=" + $scope.choiceBookmaker;
        $http.post(url,data).success(function(data) {

            if (data.msgStatus === 1) {
                $scope.showAlert('delete-knl-s'); //提示信息
                getFavoriteKnl(); //刷新收藏夹知识列表
            } else if (data.msgStatus === -1) {
                $scope.showAlert('delete-knl-f'); //提示信息
            }
        }).error(function() {
            console.log("知识删除失败！");
        });
    };

    /**
     * 默认执行函数
     */
    (function() {
        getBookmakerList();
        getFavoriteKnl();
    })();


    /**
     * 提示信息
     */
    var showTemplates = {
        'add-bookmaker-s': {
            title: '提示信息',
            template: '收藏夹创建成功！',
            okText: '确定'
        },
        'add-bookmaker-n': {
            title: '提示信息',
            template: '收藏夹名不能为空！',
            okText: '确定'
        },
        'add-bookmaker-f': {
            title: '提示信息',
            template: '收藏夹创建失败！',
            okText: '确定'
        },
        'del-bookmaker-i': {
            title: '提示信息',
            template: '是否删除收藏夹！',
            okText: '确定',
            cancelText: '取消'
        },
        'upd-bookmaker-f': {
            title: '提示信息',
            template: '收藏夹重命名失败！',
            okText: '确定'
        },
        'del-knlbygroup-i': {
            title: '提示信息',
            template: '是否清空收藏夹！',
            okText: '确定',
            cancelText: '取消'
        },
        'del-knlbygroup-s': {
            title: '提示信息',
            template: '收藏夹已清空！',
            okText: '确定'
        },
        'del-knlbygroup-f': {
            title: '提示信息',
            template: '收藏夹清空失败！',
            okText: '确定'
        },
        'del-bookmaker-n': {
            title: '提示信息',
            template: '收藏夹内有知识,请先清空收藏夹！',
            okText: '确定'
        },
        'del-bookmaker-f': {
            title: '提示信息',
            template: '删除收藏夹失败！',
            okText: '确定'
        },
        'bookmaker-exist': {
            title: '提示信息',
            template: '你要创建的收藏夹已存在！请重新创建',
            okText: '确定'
        },
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
        $timeout(function() {
            alertPopup.close(); //关闭提示框
        }, 1000);
    };

    /**
     * [showConfirm 确认提示框]
     * @param  {[type]}   type     [提示类型]
     * @param  {Function} okCallback [确认调用函数]
     * @param  {Function} cancelCallback [取消调用函数]
     * @return {[type]}            [description]
     */
    $scope.showConfirm = function(type,okCallback,cancelCallback) {
        var confirmPopup = $ionicPopup.confirm(showTemplates[type]);
        confirmPopup.then(function(res) {
            if(res) {
                if(typeof okCallback === 'function'){
                    okCallback();
                }
            } else {
                if(typeof cancelCallback === 'function'){
                    cancelCallback();
                }                
            }
        });
    }

    /**
     * 返回个人中心页
     */
    $scope.myGoBack = function() {
        location.href='../user.html';
    };

}]);
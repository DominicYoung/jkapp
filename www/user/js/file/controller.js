angular.module('fileApp')

/**
 * 本地文件页面
 * @param {依赖服务} $scope, $http, $window, $ionicPopup
 */
.controller('fileController', ['$scope', '$http', '$window', '$timeout', '$ionicPopup','fileEntry', 'fileSqlite',function($scope, $http, $window, $timeout, $ionicPopup, fileEntry, fileSqlite) {
    var beginAdd = true,
        choiceFile = {};


    //文件列表控制显示
    
    $scope.fileList = [];
        
    $scope.doRefresh = function(){
        if(beginAdd){
            fileSqlite.getFileList(function(data){
                $scope.fileList = data;
                beginAdd = false;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }else{
            fileEntry.getFiles().then(function(data){
                $scope.fileList = data;
                $scope.$broadcast('scroll.refreshComplete');
            },function(err){
                console.log('刷新列表失败');
            });
        }
    };
    $scope.$on('createdDB',function(res){
        if(res){
            $scope.doRefresh();
        }
    });

    /**
     * 删除指定文件
     */
    

    $scope.deleteFile = function(f) {
        choiceFile = f;
        $scope.showConfirm('del-file-i',dtFile,function(){});
    };
    function dtFile(){
        var f = choiceFile;
        fileEntry.removeFile(f,$scope.fileList);
    };

    /**
     * [deleteAllFile 删除所有文件]
     * @return {[type]} [description]
     */
    $scope.deleteAllFile = function(){
        $scope.showConfirm('del-allFile-i',rmAllFile,function(){});
    };
    function rmAllFile(){
        fileEntry.removeAllFile().then(function(res){
            if(res)
                $scope.fileList = [];
        },function(err){
        });
    };
    /**
     * 返回个人中心页
     */
    $scope.myGoBack = function() {
        location.href='../user.html';
    };


    /**
     * 提示信息
     */
    var showTemplates = {
        'del-file-i': {
            title: '提示信息',
            template: '是否删除此文档！',
            okText: '确定',
            cancelText: '取消'
        },
        'del-allFile-i': {
            title: '提示信息',
            template: '是否清空所有文档！',
            okText: '确定',
            cancelText: '取消'
        }
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
    };

}]);
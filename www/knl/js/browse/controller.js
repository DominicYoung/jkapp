'use strict';
/**
 * 详情浏览控制器
 * @param  {依赖服务} $scope, $rootScope, $stateParams, $http, getKnlBrowse, knlManage
 */
browseApp.controller('knlController', ['$scope', '$rootScope', '$ionicModal', '$http', 'getKnlBrowse', 'knlManage', '$ionicPopup', '$timeout','$stateParams', function($scope, $rootScope, $ionicModal, $http, getKnlBrowse, knlManage, $ionicPopup, $timeout,$stateParams) {
    var vm = $scope.vm = {};
    vm.knlParams = $stateParams;
    console.log(vm.knlParams);

    $scope.knl = getKnlBrowse.getArticleAll(vm.knlParams);

    $scope.crtComment = {
        score: 0,
        content: ''
    };

    $scope.getCommentMore = function() {
        if ($scope.knl.comment.pageVO.curPage >= $scope.knl.comment.pageVO.totalPages) {
            return;
        }
        knlManage.getMoreComment(vm.knlParams.typeID, vm.knlParams.knlID, ++$scope.knl.comment.pageVO.curPage).then(function(data) {
            $scope.knl.comment.pageVO = data.pageVO;
            $scope.knl.comment.rows = $scope.knl.comment.rows.concat(data.rows)
        }, function(error) {

        })
    };

    $scope.knlManage = knlManage;
    knlManage.showToast = function() {
        var showPopup = $ionicPopup.alert({
            title: '暂未提供附件下载功能，请登录全网运维知识库网站查看附件',
            okText: '确定', // String (默认: 'OK')。OK按钮的文字。
            okType: 'button-positive' // String (默认: 'button-positive')。OK按钮的类型。
                // buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
                //    {
                //     text: '确定',
                //     type: 'button-positive'
                //     // onTap: function(e) {
                //         // 返回的值会导致处理给定的值。
                //         // return scope.data.response;
                //     // }
                // }]
        });
        // $timeout(function() {
        //     showPopup.close(); //关闭提示框
        // }, 1000);

    }

    if ($rootScope.userInfo.isProvisional && !$rootScope.userInfo.fromSearch) {
        var feedBack = $scope.feedBack = {
            hasfeedBack: false
        };
    }

    /**
     * 创建评分
     * @param score
     */
    $scope.crtScore = function(score) {
        knlManage.crtScore(vm.knlParams.typeID, vm.knlParams.knlID, score).then(function(score) {
            $scope.knl.myScoreObj.score = score;
        }, function(err) {});
    };
}]);






/**
 * 问答详情浏览控制器
 * @param  {依赖服务} $scope, $rootScope, $ionicModal, $http, $stateParams, $location, getKnlBrowse, knlManage,$window,$ionicPopup
 */
browseApp.controller('questionController', ['$scope', '$rootScope', '$ionicModal', '$http', '$stateParams', '$location', '$timeout', 'getKnlBrowse', 'knlManage', '$ionicPopup', function($scope, $rootScope, $ionicModal, $http, $stateParams, $location, $timeout, getKnlBrowse, knlManage, $ionicPopup) {

    /**
     * 选择最佳答案
     */
    $scope.choiceBst = function(ans) {
        var url = urlHost + 'rest/knl/1/best/' + vm.knlParams.knlID + '/' + ans.answerID;
        $http.get(url).success(function(data) {
            if (data.msgStatus === 1) {
                $scope.knl.knlCont.bestAnswerID = ans.answerID;
                $scope.knl.knlCont.bestAnswer = ans;
                $scope.knl.knlCont.isFinish = $scope.knl.knlCont.isFinish || 1;
                $scope.showAlert('best-s'); //提示信息
            } else {
                $scope.showAlert('best-f'); //提示信息
            }
        });
    };

    /**
     * 关闭问答
     */
    $scope.questionClose = function() {
        var url = urlHost + 'rest/knl/1/single/close/' + vm.knlParams.knlID;
        $http.post(url, '').success(function(data) {
            if (data.msgStatus === 1) {
                $scope.knl.knlCont.isClose = 1;
                $scope.knl.choiceBstAns = false;
                $scope.showAlert('close-s'); //提示信息
            } else {
                scope.showAlert('close-f'); //提示信息
            }
        });
    };

    /**
     * 知识废弃
     */
    $scope.knlDiscard = function() {
        knlManage.knlDiscard(1, vm.knlParams.knlID);
    };


    /**
     * 提示信息
     */
    var showTemplates = {
        'null': {
            title: '提示信息',
            template: '回答内容不能为空！',
            okText: '确定'
        },
        'comment-s': {
            title: '提示信息',
            template: '回复提交成功！',
            okText: '确定'
        },
        'comment-f': {
            title: '提示信息',
            template: '回复提交失败！',
            okText: '确定'
        },
        'best-s': {
            title: '提示信息',
            template: '最佳答案设置成功！',
            okText: '确定'
        },
        'best-f': {
            title: '提示信息',
            template: '最佳答案设置失败！',
            okText: '确定'
        },
        'close-s': {
            title: '提示信息',
            template: '知识已关闭！',
            okText: '确定'
        },
        'close-f': {
            title: '提示信息',
            template: '知识关闭失败！',
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

}]);

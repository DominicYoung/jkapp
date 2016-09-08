angular.module('userApp')
.controller('ctrl.user',['$http','$scope','getUserInfo','fileManage', function($http,$scope,userInfo,fileManage) {
         $scope.userInfo = {
        user: {},
        knlCredit: '', //积分
        knlCount: '',  //我的知识条数
        favoriteCount: '',  //我收藏知识的条数
        recommendCount: ''  //推荐给我的知识条数
    };
    var urlHost = window.localStorage['urlHost']; //ip地址
    // var userInfo = $scope.userInfo;

    /**
     * 获取用户信息、积分、知识条数
     */
    userInfo.getUser().then(function(data){
        $scope.userInfo.user = data;
    },function(err){});    
    userInfo.getKnlCredit().then(function(data){
        $scope.userInfo.knlCredit = data;
    },function(err){});    
    userInfo.getKnlCount().then(function(data){
        $scope.userInfo.knlCount = data;
    },function(err){});    
    userInfo.getFavoriteCount().then(function(data){
        $scope.userInfo.favoriteCount = data;
    },function(err){});
    userInfo.getRecommendCount().then(function(data){
        $scope.userInfo.recommendCount = data;
    },function(err){});


    document.addEventListener('deviceready',function(){
        fileManage.getfileList(function(rows){
            $scope.fileNum = rows.length;
        });
    },false);


/*
var urlHost = window.localStorage['urlHost']; //ip地址

   
    getUserInfo.getUser().then(function(data){
        $scope.userInfo.user = data;
    },function(err){});    
    getUserInfo.getKnlCredit().then(function(data){
        $scope.userInfo.knlCredit = data;
    },function(err){});    
    getUserInfo.getKnlCount().then(function(data){
        $scope.userInfo.knlCount = data;
    },function(err){});    
    getUserInfo.getFavoriteCount().then(function(data){
        $scope.userInfo.favoriteCount = data;
    },function(err){});
    getUserInfo.getRecommendCount().then(function(data){
        $scope.userInfo.recommendCount = data;
    },function(err){});


    document.addEventListener('deviceready',function(){
        fileManage.getfileList(function(rows){
            $scope.fileNum = rows.length;
        });
    },false);
*/
       
}]);
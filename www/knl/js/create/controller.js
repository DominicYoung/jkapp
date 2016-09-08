'use strict';

/**
 * 问答创建控制器
 * @param  {依赖服务} $scope, $rootScope, $q, $http, typeList, resourceData, sensitiveServ, resType, sysType, $window
 */
createApp.controller('createController', ['$scope', '$rootScope', '$http', '$q', '$ionicPopup', '$ionicLoading','$timeout', 'resTypes', 'sysTypes', '$window',
    function($scope, $rootScope, $http, $q, $ionicPopup, $ionicLoading,$timeout, resTypes, sysTypes, $window) {

        var knl = $scope.knl = {
            title: '',
            content: '',
            tag: '',
            knlType: '',
            knlSource: '',
            knlSysType: '',
            knlResourceType: ''    
        };
        $scope.types = {
            knlTypes: [{
                name: "业务知识类",
                ID: "1"
            }, {
                name: "日常运维类",
                ID: "2"
            }, {
                name: "故障处理类",
                ID: "3"
            }, {
                name: "管理知识类",
                ID: "5"
            }, {
                name: "行业知识类",
                ID: "6"
            }, {
                name: "其他",
                ID: "4"
            }],
            knlSources: [{
                name: "文档",
                ID: "1"
            }, {
                name: "日常维护",
                ID: "2"
            }, {
                name: "故障告警",
                ID: "3"
            }, {
                name: "客户投诉",
                ID: "4"
            }, {
                name: "培训获得",
                ID: "5"
            }, {
                name: "其他",
                ID: "6"
            }],
            sysTypes: sysTypes,
            resTypes: resTypes
        };

        $scope.subErr = {
            title: '标题过短！',
            content: '内容不能为空！',
            tag: '请输入关键字！',
            knlType: '请选择知识类型！',
            knlSource: '请选择知识来源！',
            knlSysType: '请选择所属系统！',
            knlResourceType: '请选择资源类型！'     
        };

        $scope.typeShow = {
            knlTypes: false,
            knlSources: false,
            sysTypes: false,
            resTypes: false
        };

        $scope.typeShowFn = function(type){
            $scope.typeShow[type] = !$scope.typeShow[type];
        }

        function loadingShow() {
            $ionicLoading.show({
                noBackdrop: true,
                template: '<ion-spinner icon="bubbles"></ion-spinner>',
            });
        };

        function loadingHide() {
            $ionicLoading.hide();
        };
        /**
         * 返回上一页
         */
        $scope.goBack = function() {
            window.history.go(-1);
        };

        var baseUrl = window.localStorage['baseUrl'];
        console.log(baseUrl);

        function reset (){
            angular.forEach(knl,function(value,key){
                knl[key] = "";
            });
        };
        $scope.submitFn = function() {
            var url = baseUrl + "/bskm/rest/knl/save/1",
                data = '',
                value = '';
                console.log($scope.aa);
            if($scope.aa){
                remindPopup('内容包含敏感词！')
            }
            for(var k in knl){
                if(k === "title" && knl[k].length < 5){
                    remindPopup("标题过短！");
                    return;
                }else if(!knl[k]){
                    remindPopup($scope.subErr[k]);
                    return;
                }
                value = encodeURIComponent(knl[k]);
                data += k +"="+ value +"&";
            }

            loadingShow();
            $http.post(url,data)
            .success(function(data){
                loadingHide();
                if(data.msgStatus === 1){
                    remindPopup("知识创建成功！");
                    reset();
                }else if(data.msgStatus === -3 || data.msgStatus === '-3'){
                    remindPopup("重复知识，需要管理员审核！");
                    reset();
                }else{
                    remindPopup(data.msgText);
                }
            }).error(function(err){
                loadingHide();
                remindPopup("创建失败，请检查网络！")
            });
        };
        function remindPopup(title){
            var showPopup = $ionicPopup.show({
                title: title,
            });
            showPopup.then(function(res) {  
            });
            $timeout(function() {
                showPopup.close(); 
            }, 2000);
        };
    }
]);
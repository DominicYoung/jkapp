angular.module('infoApp')


/**
 * 账户管理页面
 * @param {依赖服务} $scope, $http, $ionicModal, $timeout, $window, $ionicPopup
 */
.controller('infoController', ['$scope', '$http', '$ionicModal', '$timeout', '$window', '$ionicPopup', '$ionicActionSheet', '$cordovaCamera', '$cordovaFileTransfer', function($scope, $http, $ionicModal, $timeout, $window, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer) {
    $scope.userInfo = {};
    $scope.userInfo.knlCredit = ""; //积分
    $scope.userInfo.knlCount = ""; //我的知识条数
    var urlHost = window.localStorage['urlHost'];
    /**
     * 获取用户信息、积分、知识条数
     */
    function getUserInfo() {

        //获取用户基本信息
        var info_url = urlHost + "rest/user/single/me";
        $http.get(info_url).success(function(data) {

            $scope.userInfo = data;
            //console.log($scope.userInfo);
        }).error(function() {
            console.log("获取个人信息失败！");
        });

        //获取用户积分
        var credit_url = urlHost + "rest/user/credit";
        $http.get(credit_url).success(function(data) {
            $scope.userInfo.knlCredit = data;
        }).error(function() {
            console.log("获取个人积分失败！");
        });

        //获取我的知识条数
        var knl_count_url = urlHost + "rest/user/knl/count";
        $http.get(knl_count_url).success(function(data) {
            $scope.userInfo.knlCount = data;
        }).error(function() {
            console.log("获取知识条数失败！");
        });
    }


    /**
     * 默认执行函数：获取用户信息
     */
    getUserInfo();
    /**
     * 退出登录
     */
    $scope.userSwitch = function() {
        var url = urlHost + "rest/logout",
         data = {
            title: '提示',
            template: '确定要切换吗？',
            cancelText: '取消', 
            okText: '确定'
        };
        $scope.showConfirm(data,function(){
            $http.post(url).success(function(data) {
                location.href = "../../index.html";
            }).error(function(err){
                location.href = "../../index.html";
            });
        });
        
    }

    /**
     * 修改密码模态框
     */
    $ionicModal.fromTemplateUrl('change-pwd-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modalDragStart = {
            active: true,
            value: 0
        };
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        return $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });


    //新头像地址
    $scope.newImage = '';

    /**
     * [userPicShow 打开actionsheet，选择相册或者拍照上传头像]
     * @return {[type]} [description]
     */
    $scope.userPicShow = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '拍照'
            }, {
                text: '从相册选择'
            }],
            titleText: '选择照片',
            cancelText: '取消',
            cancel: function() {

            },
            buttonClicked: function(index) {

                // 配置相机，设置相片质量，格式，大小，是否默认保存等等
                // 此时默认是打开相机进行拍照
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,  //来源：来自相机拍照
                    allowEdit: true,
                    targetWidth: 100,
                    targetHeight: 100,
                    mediaType: 0,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };
                if (index == 1) {
                    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY; //使用图片库
                } 
                // 获取拍照后的相片地址
                $cordovaCamera.getPicture(options).then(
                    function(imageURI) {
                        $scope.newImage = imageURI;
                        $scope.$apply();   //注意手动触发更改
                        uploadImage($scope.newImage);
                    },
                    function(err) {

                    }
                );　　　　　　　
                return true;
            }
        });

        // 隐藏头型更换sheet
        $timeout(function() {
            hideSheet();
        }, 3000);

    };

    /**
     * [uploadImage 上传头像]
     * @param  {[str]} targetPath [头像在本地的地址]
     * @param  {[obj]} options    [上传的配置项，按照tansfer options进行配置]
     * @return {[type]}            []
     */
    function uploadImage (targetPath, options){
        var url = urlHost + 'rest/upload/photo/' + $scope.userInfo.userKey,
            targetPath = targetPath,
            fileOptions = options || {};
            if(!options){
                fileOptions.fileName = $scope.userInfo.userKey + targetPath.substr(targetPath.lastIndexOf('.'));
            }
            //上传文件
        $cordovaFileTransfer.upload(url, targetPath, fileOptions)
        .then(function(result){
            if(result.response.indexOf('100') === -1){
                $scope.showPopup('img-f');
            }else{
                $scope.userInfo.photo = '/rest/download/photo/' + $scope.userInfo.userKey + '.jpg?' + new Date().getTime();
                $scope.showPopup('img-s');
            };
        },function(err){
            $scope.showPopup('ceshi1');
            if(err.http_status !== 406){
                $scope.showPopup('img-f');
            }  
        },function(progress){
        });
    }
    

    $scope.edit = {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
    };

    $scope.dragDown = function(event) {
        if ($scope.modalDragStart.active) {
            $scope.modalDragStart = {
                active: false,
                value: event.gesture.center.pageY
            };
        }
        var element = angular.element('#modal'),
            windowHeight = $window.innerHeight,
            y = event.gesture.center.pageY - $scope.modalDragStart.value;
        if (y >= 0 && y <= windowHeight) {
            element.css({
                webkitTransform: 'translate3d(0,' + y + 'px,0)',
                transform: 'translate3d(0,' + y + 'px,0)'
            });
        }
    };

    $scope.resetPosition = function(event) {
        $scope.modalDragStart = {
            active: true,
            value: 0
        };
        var element = angular.element('#modal'),
            y = event.gesture.center.pageY,
            windowHeight = $window.innerHeight;
        if (y >= (windowHeight * 0.5)) {
            element.css({
                transform: 'translate3d(0,' + windowHeight + 'px,0)'
            });
            $timeout(function() {
                $scope.closeModal().then(function() {
                    element.removeAttr('style');
                });
            }, 100);
        } else {
            $timeout(function() {
                element.removeAttr('style');
            }, 100);
        }
    };


    /**
     * 验证密码的有效性
     */
    function validate() {
        if ($scope.edit.newPassword === $scope.edit.oldPassword) {
            $scope.showPopup('pwd1'); //提示信息
            return false;
        }

        if ($scope.edit.newPassword !== $scope.edit.newPassword2) {
            $scope.showPopup('pwd2'); //提示信息
            return false;
        }

        var reg = /^.{4,32}$/;
        if (!reg.test($scope.edit.newPassword)) {
            $scope.showPopup('pwd3'); //提示信息
            return false;
        }
        return true;
    }


    /**
     * 密码修改提示框
     */
    $scope.changePwd = function() {
        if (validate() == false) {
            console.log(1);
            return false;
        }
        var data = {
            title: '提示',
            template: '确定要修改密码吗？',
            cancelText: '取消', 
            okText: '确定'
        };
        $scope.showConfirm(data,postChangePwd);
    };

    /**
     * [postChangePwd 向服务器发起修改请求]
     * @return {[type]} [description]
     var content="username="+$scope.pcinfo.userKey+'&pwd='+hex_md5($scope.edit.OldPassword)+'&newpwd='+hex_md5($scope.edit.newPassword);

     */
    function postChangePwd (){
        //console.log($scope.userInfo.userKey);
        var url = urlHost + "rest/user/changepwd",
            sendData = "username="+$scope.userInfo.userKey+ '&pwd=' + md5($scope.edit.OldPassword) + '&newpwd=' + md5($scope.edit.newPassword),
            postCfg={
                headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
            };
        $http.post(url, sendData, postCfg).success(function(data) {
            if (data.msgStatus == '1') {
                $scope.showPopup('change-pwd-s'); //"密码修改成功"提示信息
                $timeout(function() {
                    location.href = '../../index.html';
                }, 1000);     
            } else {
                $scope.showPopup('change-pwd-f'); //"密码修改失败"提示信息
            }
        }).error(function() {
            $scope.showPopup('change-pwd-f'); //"密码修改失败"提示信息
            return false;
        });
    }

    /**
     * [showConfirm description]
     * @param  {[type]}   data [提示数据]
     * @param  {Function} cb   [回调函数]
     * @return {[type]}        [description]
     */
    $scope.showConfirm = function(data,cb) {
        if(!data || !cb) return;
        var confirmPopup = $ionicPopup.confirm(data);
        confirmPopup.then(function(res) {
            if (res) {
                 cb();
            } else {
                confirmPopup.close(); //关闭确认框
            }
        });
    };

    /**
     * 提示信息
     */
    var showTemplates = {
        'ceshi': {
            title: '提示',
            template: '上传了'
        },
        'ceshi1': {
            title: '提示',
            template: '上传有问题'
        },
        'change-pwd-s': {
            title: '提示',
            template: '密码修改成功！'
        },
        'change-pwd-f': {
            title: '提示',
            template: '密码修改失败！'
        },
        'pwd1': {
            title: '提示',
            template: '新旧密码一样，请检查！'
        },
        'pwd2': {
            title: '提示',
            template: '两次输入的密码不一致，请检查！'
        },
        'pwd3': {
            title: '提示',
            template: '新密码长度太短！'
        },
        'pwd4': {
            title: '提示',
            template: '旧密码长度太短！'
        },
        'img-f' : {
            title: '提示',
            template: ' 上传失败！'
        },
        'img-s' : {
            title: '提示',
            template: ' 更换成功！'
        }
    };
    
    $scope.showPopup = function(type) {
        var showPopup = $ionicPopup.show(showTemplates[type]);
        showPopup.then(function(res) {});
        $timeout(function() {
            showPopup.close(); //关闭提示框
        }, 2000);
    };
}]);

'use strict';

/**
 *   checkUpdate 检查APP更新，如果版本更新，下载新的APP apk
 *
 *
 *
 *
 */
angular.module('checkUpdate', ['ionic', 'ngCordova'])
  .factory('checkUpdate', ['$cordovaAppVersion', '$http', '$ionicPopup', '$ionicLoading', '$timeout', '$location', '$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2', function ($cordovaAppVersion, $http, $ionicPopup, $ionicLoading, $timeout, $location, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2) {
    return function () {
      try {
        if(ionic.Platform.isAndroid()) {
          $cordovaAppVersion.getVersionCode().then(function (version) {
            var date = new Date();
            var baseUrl = window.localStorage['baseUrl'],
              url = baseUrl + "/jkapp/rest/app/version/" + version + '?' + date.getTime()+'&client=android';
            $http.get(url).success(function (ret) {
              if (ret.msgStatus === 1) {
                  var confirmPopup = $ionicPopup.confirm({
                    title: '新版本出炉，是否要升级？',
                    cancelText: '取消',
                    okText: '确定'
                  });

                  confirmPopup.then(function (res) {
                    if (res) {
                      $ionicLoading.show({
                        template: "已经下载：0%"
                      });
                      var url = baseUrl + ret.msgText,
                        targetPath = "file:///storage/sdcard0/Download/ncnmApp.apk",
                        trustHosts = true,
                        options = {};
                      alert(url);
                      $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                        // 打开下载下来的APP
                        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                        ).then(function () {
                            // 成功
                          }, function (err) {
                            // 错误
                          });
                        $ionicLoading.hide();
                      }, function (err) {
                        var showPopup = $ionicPopup.show({
                          title: '下载失败'
                        });
                        $timeout(function () {
                          showPopup.close();
                        }, 1000);
                      }, function (progress) {
                        //进度，这里使用文字显示下载百分比
                        $timeout(function () {
                          var downloadProgress = (progress.loaded / progress.total) * 100;
                          $ionicLoading.show({
                            template: "已经下载：" + Math.floor(downloadProgress) + "%"
                          });
                          if (downloadProgress > 99) {
                            $ionicLoading.hide();
                          }
                        });
                      });
                    }
                  });
              } else if (ret.msgStatus === 0 && $location.path() == '/other') {
                var showPopup = $ionicPopup.show({
                  title: '当前版本为最新'
                });
                $timeout(function () {
                  showPopup.close();
                }, 1000);
              }
            });
          });
        }
      } catch (e) {
        console.warn("web调试，暂无版本！");
      }
    };
  }]);

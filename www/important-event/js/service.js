'use strict';
angular.module('impApp')
  .factory('monthyService', ['$q', '$http', function ($q, $http) {
    var monthyService = {};
    var baseUrl = window.localStorage['baseUrl'] + '/jkapp/rest';
    monthyService.getUserInfo = function () {
      var url = baseUrl + '/user/me',
        d = $q.defer();
      $http.get(url).success(function (data) {
        d.resolve(data);
      }).error(function (err) {
        d.reject(err);
      });
      return d.promise;
    };
    monthyService.isMonthyPosted = function (month) {
      var url = baseUrl + '/common/get/publish?date=' + month,
        d = $q.defer();
      $http.get(url).success(function (data) {
        d.resolve(data);
      }).error(function (err) {
        d.reject(err);
      });
      return d.promise;
    };
    monthyService.getLatestMonthy = function () {
      var url = baseUrl + '/common/get/month',
        d = $q.defer();
      $http.get(url).success(function (data) {
        d.resolve(data);
      }).error(function (err) {
        d.reject(err);
      });
      return d.promise;
    };
    monthyService.getDescData = function (route, month) {
      // var distUrl = 'AppPerCenter/imgConfig.properties';
      var url = baseUrl + route + month,
        d = $q.defer();
      $http.get(url).success(function (data) {
        console.log(data);
        d.resolve(data);
      }).error(function (err) {
        d.reject(err);
      });
      return d.promise;
    };
    //简版焦点投诉新需求的请求
    monthyService.getMonthyDataByRequestCode = function (requestCode,requestCodeName,route, month) {
      // var distUrl = 'AppPerCenter/imgConfig.properties';
      var url = baseUrl + route + month,
        d = $q.defer();
      $http.get(url).success(function (data) {
        var response = {};
        response.requestCode = requestCode;
        response.requestCodeName = requestCodeName;
        response.data = data;
        d.resolve(response);
      }).error(function (err) {
        var error = {};
        error.requestCode = requestCode;
        error.requestCodeName = requestCodeName;
        d.reject(error);
      });
      return d.promise;
    };
    return monthyService;
  }])
  .factory('ModalService', ['$ionicModal', '$ionicLoading', 'echartsDetail', 'echartsService', 'monthyDetailParseService', 'httpKey','monthyDetailService', function ($ionicModal, $ionicLoading, echartsDetail, echartsService, mothyDetailParseService, httpKey,monthyDetailService) {
    var ModalService = {};

    ModalService.createModal = function ($scope) {
      $scope.modalArr = [];

      for (var i = 0; i < echartsDetail.length; i++) {
        $ionicModal.fromTemplateUrl(echartsDetail[i].url, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modalArr.push(modal);
        });
        $scope.openModal = function (index, part) {
          var horizontalChart;
          $scope.modalArr[index].show();
          if (index == 1) {
            $ionicLoading.show();
          }
          var params = {date: $scope.month};
          var url, parseKey;
          if (part != 0) {
            echartsService.refreshTemplate(0, null, $scope);
            $scope.datasource = httpKey[part - 1].dataSource;
            url = httpKey[part - 1].url;
            parseKey = httpKey[part - 1].parseKey;
            if (angular.isDefined(httpKey[part - 1].paramsProId)) {
              if ($scope.userInfo.roleID != 1) {
                params.proId = $scope.userInfo.provKey;
              }
            }
            if (angular.isDefined(httpKey[part - 1].paramsKey)) {
              params.key = httpKey[part - 1].paramsKey;
            }
            if (angular.isDefined(httpKey[part - 1].paramsKpiName)) {
              params.kpiName = httpKey[part - 1].paramsKpiName;
            }
            if (angular.isDefined(httpKey[part - 1].isCap)) {
              params.isCap = httpKey[part - 1].isCap;
            }
          } else {
            horizontalChart = echarts.init(document.getElementById("chart-horizontal"));
          }
          var chartData = {};
          if (part == 33 || part == 32) {
            monthyDetailService.getDetail(url, params).then(function (data) {
              chartData = mothyDetailParseService.parseDeatil(parseKey, data);
              echartsService.refreshTemplate(2, mothyDetailParseService.parseDeatil(parseKey, data), $scope);
              $scope.dataByProv = chartData.dataByProv;
              $scope.detailTitle = $scope.userInfo.provName + chartData.title;
              if (angular.isDefined(chartData.description)) {
                $scope.description = $scope.month.substr(0, 4) + '年' + $scope.month.substr(4, 2) + '月' + $scope.userInfo.provName + chartData.description;
              } else {
                $scope.description = '';
              }
            }, function (err) {
              $scope.modalArr[index].hide();
            });
          } else if (part == 0) {
            echartsService.generateHorizontalChart(horizontalChart, $scope.dataByProv);
          } else if (part == 13 || part == 14 || part == 15 || part == 12) {
            monthyDetailService.getDetailPost(url, params).then(function (data) {
              chartData = mothyDetailParseService.parseDeatil(parseKey, data);
              echartsService.refreshTemplate(1, mothyDetailParseService.parseDeatil(parseKey, data), $scope);
              $scope.dataByProv = chartData.dataByProv;
              $scope.detailTitle = $scope.userInfo.provName + chartData.title;
              if (angular.isDefined(chartData.description)) {
                $scope.description = $scope.month.substr(0, 4) + '年' + $scope.month.substr(4, 2) + '月' + $scope.userInfo.provName + chartData.description;
              } else {
                $scope.description = '';
              }
            }, function (err) {
              $scope.modalArr[index].hide();
            });
          } else {
            monthyDetailService.getDetail(url, params).then(function (data) {
              chartData = mothyDetailParseService.parseDeatil(parseKey, data);
              echartsService.refreshTemplate(1, mothyDetailParseService.parseDeatil(parseKey, data), $scope);
              $scope.dataByProv = chartData.dataByProv;
              $scope.detailTitle = $scope.userInfo.provName + chartData.title;
              if (angular.isDefined(chartData.description)) {
                $scope.description = $scope.month.substr(0, 4) + '年' + $scope.month.substr(4, 2) + '月' + $scope.userInfo.provName + chartData.description;
              } else {
                $scope.description = '';
              }
            }, function (err) {
              $scope.modalArr[index].hide();
            });
          }
        };
        $scope.closeModal = function (index) {
          $scope.modalArr[index].hide();
        };
        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function () {
          for (var i = 0; i < $scope.modalArr.length; i++) {
            $scope.modalArr[i].remove();
          }
        });
      }
    };
    return ModalService;
  }])

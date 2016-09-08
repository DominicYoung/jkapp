'use strict';
angular.module('impApp')
    .factory('monthyDetailService', ['$http', "$q", '$ionicLoading', 'monthyService', 'detailHttpKey', 'monthyDetailParseService', function($http, $q, $ionicLoading, monthyService, detailHttpKey, monthyDetailParseService) {
        var monthyDetailService = {};
        var baseUrl = window.localStorage['baseUrl'] + '/jkapp/rest';

        monthyDetailService.getDetailDataByRequestName = function(index, month) {
            $ionicLoading.show();
            var config, d = $q.defer();
            switch (index) {
                case '40':
                    config = detailHttpKey.CostComplaint;
                    break;
                case '41':
                    config = detailHttpKey.fourGComplaint;
                    break;
                case '42':
                    config = detailHttpKey.GPRSComplaint;
                    break;
                default:
                    break;
            }
            for (var i = 0; i < config.routes.length; i++) {
                monthyService.getMonthyDataByRequestCode(null, config.routes[i].requestCodeName, config.routes[i].route, month).then(function(data) {
                    $ionicLoading.hide();
                    if (data.requestCodeName == 'COMPLAINT_COST_DETAIL' || data.requestCodeName == 'COMPLAINT_4G_DETAIL' || data.requestCodeName == 'COMPLAINT_GPRS_DETAIL') {
                        d.notify(angular.copy(data));
                    };
                    monthyDetailParseService.parseDetailComplaint(data.requestCodeName, data.data);
                }, function(err) {
                    $ionicLoading.hide();
                    d.reject(err);
                });
            };
            return d.promise;
        }

        monthyDetailService.getDetailPost = function(inter, param) { // var distUrl = 'AppPerCenter/imgConfig.properties';
            var url = baseUrl + inter,
                d = $q.defer();
            var paramStr = '';
            // if (param != null) {
            //     url = url + '?';
            // };
            for (var key in param) {
                paramStr = paramStr + key + '=' + param[key] + '&';
            }
            paramStr = paramStr.substring(0, paramStr.length - 1);
            // console.log(url);
            $http.post(url, paramStr).success(function(data) {
                $ionicLoading.hide();
                d.resolve(data);
            }).error(function(err) {
                //console.log(err);
                $ionicLoading.hide();
                $ionicLoading.show({ template: '请求数据失败', noBackdrop: true, duration: 2000 });
                d.reject(err);
            });
            return d.promise;
        };
        monthyDetailService.getDetail = function(inter, param) {
            var url = baseUrl + inter,
                d = $q.defer();
            if (param != null) {
                url = url + '?';
            }
            for (var key in param) {
                url = url + key + '=' + param[key] + '&';
            }
            url = url.substring(0, url.length - 1);
            $http.get(url).success(function(data) {
                $ionicLoading.hide();
                d.resolve(data);
            }).error(function(err) {
                $ionicLoading.hide();
                $ionicLoading.show({ template: '请求数据失败', noBackdrop: true, duration: 2000 });
                d.reject(err);
            });
            return d.promise;
        }
        return monthyDetailService;
    }])

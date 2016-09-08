'use strict';
angular.module('impApp')
    .controller('monthly.imp', ['$scope', 'monthyService', 'monthyDataService', 'echartsService', 'ModalService', '$ionicModal', 'provkey', '$ionicLoading', '$ionicPopup', '$state', 'requestCode', function($scope, monthyService, monthyDataService, echartsService, ModalService, $ionicModal, provkey, $ionicLoading, $ionicPopup, $state, requestCode) {
        var vm = $scope.vm = {};
        vm.hotListFilter = 5;
        vm.hotListMore = function() {
            vm.hotListFilter += 5;
        }

        vm.description = monthyDataService.modelDescription;

        Date.prototype.Format = function(fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        $scope.monthShow = true;
        $scope.centerShow = true;
        $scope.provShow = true;
        $scope.clientShow = true;
        $scope.raise_leftShow = false;
        $scope.raise_rightShow = false;
        $scope.drop_leftShow = false;
        $scope.drop_rightShow = false;
        $scope.intteruptOutShow = monthyDataService.intteruptOutShow;

        $scope.dataByProv;
        $scope.clientFirstClass = 'button-positive';
        $scope.clientSecondClass = 'button-clear';
        $scope.month = new Date().Format("yyyyMM");
        $scope.importantEvent = echartsService.importantEvent;
        $scope.pointComplait = {};

        $scope.monthyDataService = monthyDataService;
        $scope.goDetail = function(index, date, total) {
            $state.go('complaint-detail', { id: index, month: date,total:total });
        }

        $scope.clientSenseChange = function(index) {
            if (index == 1) {
                $scope.clientShow = true;
                $scope.clientFirstClass = 'button-positive';
                $scope.clientSecondClass = 'button-clear';
            } else {
                $scope.clientShow = false;
                $scope.clientFirstClass = 'button-clear';
                $scope.clientSecondClass = 'button-positive';
            }
        }

        $scope.showDataSource = function() {
            $ionicPopup.show({
                title: '统计口径',
                scope: $scope,
                templateUrl: 'important-event/templates/data-source.html',
                buttons: [{
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {}
                }]
            });
        }

        monthyService.getUserInfo().then(function(data) {
            $scope.userInfo = data;
            if (data.roleID == 1) {
                $scope.userInfo.provName = '全国';
            }
        }, function(err) {
            getDataFailedCallback('');
        });

        //获取月报最新月份
        monthyDataService.getLatestMonthy().then(function(data) {
            var date = data.substr(0, 4) + '/' + data.substr(4, 6) + '/' + '01';
            var latestDate = new Date(date);
            $scope.datepickerObject.to = latestDate;
            dataChangeCallback(latestDate);
        }, function(err) {
            getDataFailedCallback('');
        });

        $scope.$on('elmId', function(event, elmId) {
            monthyDataService.getMonthyData($scope.month, elmId).then(function(data) {
                if (elmId == 'point-complaint-content') {
                    return;
                };
                echartsService.refreshDiv(elmId, data);
            }, function(err) {
                if (elmId == 'point-complaint-content') {
                    return;
                };
                getDataFailedCallback(elmId);
            }, function(data) {
                if (elmId == 'point-complaint-content') {
                    switch (data.requestCode) {
                        case requestCode.COMPLAINT_SUM_BYMONTH:
                            $scope.pointComplait.ComplaintSum = data.data;
                            if (angular.isDefined($scope.pointComplait.charge) && angular.isDefined($scope.pointComplait.charge.currentMonthCharge)) {
                                $scope.pointChargeComplait.pointComplaitSum = ((($scope.pointComplait.charge.currentMonthCharge * 10000) / $scope.pointComplait.ComplaintSum) * 100).toFixed(2) + "%";
                            }
                            break;

                        case requestCode.COMPLAINT_CHARGE_BYMONTH:
                            $scope.pointComplait.charge = getComplaintDescription(data.data, $scope.month);
                            $scope.pointChargeComplait = getPointComplait($scope.pointComplait.charge, $scope.pointComplait.ComplaintSum);
                            break;

                        case requestCode.COMPLAINT_4G_BYMONTH:
                            $scope.pointComplait.traffic = getComplaintDescription(data.data, $scope.month);
                            $scope.point4GComplait = getPointComplait($scope.pointComplait.traffic, $scope.pointComplait.ComplaintSum);
                            break;

                        case requestCode.COMPLAINT_GPRS_BYMONTH:
                            $scope.pointComplait.gprs = getComplaintDescription(data.data, $scope.month);
                            $scope.pointGprsComplait = getPointComplait($scope.pointComplait.gprs, $scope.pointComplait.ComplaintSum);
                            break;

                        default:
                            break;
                    }
                    return;
                };
            });
        });

        function getPointComplait(complaintClass, yearComplaintSum) {
            var pointComplait = {};
            if (angular.isDefined(complaintClass.currentMonthCharge)) {
                pointComplait.complaitSum = Math.floor(complaintClass.currentMonthCharge * 10000);
                if (angular.isDefined(yearComplaintSum)) {
                    pointComplait.pointComplaitSum = (((complaintClass.currentMonthCharge * 10000) / yearComplaintSum) * 100).toFixed(2) + "%";
                }

                if (angular.isDefined(complaintClass.lastMonthCharge)) {
                    var dValue = complaintClass.currentMonthCharge - complaintClass.lastMonthCharge;
                    if (dValue >= 0) {
                        pointComplait.chainRatio = "增加" + ((dValue / complaintClass.lastMonthCharge) * 100).toFixed(2) + "%";
                    } else {
                        pointComplait.chainRatio = "减少" + ((-dValue / complaintClass.lastMonthCharge) * 100).toFixed(2) + "%";
                    }
                }

                if (angular.isDefined(complaintClass.lastYearCharge)) {
                    var dValue = complaintClass.currentMonthCharge - complaintClass.lastYearCharge;
                    if (dValue >= 0) {
                        pointComplait.lastYearRatio = "增加" + ((dValue / complaintClass.lastYearCharge) * 100).toFixed(2) + "%";
                    } else {
                        pointComplait.lastYearRatio = "减少" + ((-dValue / complaintClass.lastYearCharge) * 100).toFixed(2) + "%";
                    }
                }
            };
            return pointComplait;
        }

        function getComplaintDescription(data, month) {
            var result = {};
            result.currentMonthCharge = getCurrentMonthComplaint(data.bar, month);
            result.lastMonthCharge = getLastMonthComplaint(data.bar, month);
            result.lastYearCharge = getLastYearComplaint(data.line, month);
            return result;
        }

        function getCurrentMonthComplaint(data, month) {
            var currentMonthCharge = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].month == month) {
                    currentMonthCharge = currentMonthCharge + data[i].cnt;
                }
            }
            return currentMonthCharge
        }

        function getLastMonthComplaint(data, month) {
            var lastMonthCharge = 0;
            var year_int = parseInt(month.substr(0, 4));
            var mon_int = parseInt(month.substr(4, 2));
            if (mon_int == 1) {
                year_int = year_int - 1;
                mon_int = 12;
            } else {
                mon_int = mon_int - 1;
            }

            if (mon_int < 10) {
                month = year_int + "0" + mon_int;
            } else {
                month = year_int + "" + mon_int;
            }

            for (var i = 0; i < data.length; i++) {
                if (data[i].month == month) {
                    lastMonthCharge = lastMonthCharge + data[i].cnt;
                }
            }
            return lastMonthCharge
        }

        function getLastYearComplaint(data, month) {

            var newMonth = (parseInt(month.substr(0, 4)) - 1) + month.substr(4, 2);
            for (var i = 0; i < data.length; i++) {
                if (data[i].month == newMonth) {
                    return data[i].cnt;
                }
            }
            return;
            //return data[data.length-1].cnt;
        }

        //获取数据失败回调
        function getDataFailedCallback(elmId) {
            $ionicLoading.show({ template: '请求数据失败', noBackdrop: true, duration: 2000 });
            if (elmId != '') {
                document.getElementById(elmId).style.display = 'none';
            }
        }

        $(".section-content").css('display', 'none');

        var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
        var monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

        function dataChangeCallback(val) {
            if (val != null) {
                var month = new Date(val).Format("yyyyMM");
                monthyDataService.isMonthyPosted(new Date(val).Format("yyyyMM")).then(function(data) {
                    if (data == 1) {
                        $scope.datepickerObject.inputDate = val;
                        if ($scope.month != $scope.datepickerObject.inputDate.Format('yyyyMM')) {
                            $scope.month = $scope.datepickerObject.inputDate.Format('yyyyMM');
                            monthyDataService.wipeOut();
                            monthyDataService.getMonthyData($scope.month, '').then(function(data) {
                                //echartsService.refreshDiv('', data);
                                $scope.importantEvent = data.rows;
                                $scope.importantEvents = data.pageVO.totalRows;
                                $scope.eventArr = [];
                                $scope.topDescription = [];
                                var
                                    rowsArr = $scope.importantEvent,
                                    provArr = ["北京", "广东", "上海", "天津", "重庆", "辽宁", "江苏", "湖北", "四川", "陕西", "河北", "山西", "河南", "吉林", "黑龙江", "内蒙", "山东", "安徽", "浙江", "福建", "湖南", "广西", "江西", "贵州", "云南", "西藏", "海南", "甘肃", "宁夏", "青海", "新疆"],
                                    eventArr = $scope.eventArr;

                                for (var i = 0, lens = provArr.length; i < lens; i++) {
                                    var arr = $.grep(rowsArr, function(n, j) {
                                        return n.provName == provArr[i];
                                    });
                                    if (arr.length !== 0) {
                                        eventArr.push(arr)
                                    }
                                }
                                //console.log(eventArr);
                                for (var i = 0; i < eventArr.length; i++) {
                                    var topDescription = '';
                                    if (eventArr[i][0].provName === '北京' || eventArr[i][0].provName === '上海' || eventArr[i][0].provName === '天津' || eventArr[i][0].provName === '重庆') {
                                        topDescription += eventArr[i][0].provName + '市';
                                    } else {
                                        topDescription += eventArr[i][0].provName + '省';
                                    }
                                    for (var j = 0; j < eventArr[i].length; j++) {
                                        topDescription += eventArr[i][j].channel + '渠道中断' + eventArr[i][j].num2 + '分钟';
                                        if (j != eventArr[i].length - 1) {
                                            topDescription += '，'
                                        } else {
                                            topDescription += '。'
                                        }
                                    }
                                    $scope.topDescription.push(topDescription);
                                }
                                //console.log($scope.topDescription);
                            }, function(err) {
                                getDataFailedCallback('');
                            });
                        }
                    } else {
                        $ionicLoading.show({ template: '该月份月报暂未发布', noBackdrop: true, duration: 2000 });
                    }
                }, function(err) {
                    getDataFailedCallback('');
                });
            }
        }

        $scope.datepickerObject = {
            titleLabel: '月报时间选择器', //Optional
            closeLabel: '取消', //Optional
            setLabel: '确定', //Optional
            setButtonType: 'button-assertive', //Optional
            closeButtonType: 'button-assertive', //Optional
            inputDate: new Date(), //Optional
            monthList: monthList, //Optional
            templateType: 'popup', //Optional
            showTodayButton: 'false', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            from: new Date(2016, 1), //Optional
            to: new Date(), //Optional
            callback: function(val) { //Mandatory
                dataChangeCallback(val);
            },
            dateFormat: 'yyyy年MM月', //Optional
            closeOnSelect: false, //Optional
        };
        ModalService.createModal($scope);
    }])
    .filter('toYear', function() {
        return function(input) {
            var out = input.substr(0, 4) + '年' + input.substr(4, 2) + '月';
            return out;
        }
    })
    .filter('toMonth', function(){
        return function(input){
            var out = parseInt(input.substr(4,2));
            return out + "月";
        }
    })
    .controller('monthly.detail', ['$scope', '$stateParams', 'monthyDetailService', function($scope, $stateParams, monthyDetailService) {
        var vm = {};
        vm.id = $stateParams.id;
        vm.month = $stateParams.month;
        vm.total = $stateParams.total;
        $scope.description = '';
        monthyDetailService.getDetailDataByRequestName(vm.id, vm.month).then(function(data) { 
            }, function(err) {
            }, function(data) {      
                switch(data.requestCodeName){
                    case 'COMPLAINT_COST_DETAIL':
                        $scope.description=getChargeDescription(data.data, vm.total);
                    break;
                    case 'COMPLAINT_4G_DETAIL':
                        $scope.description=get4GDescription(data.data, vm.total);
                    break;
                    case 'COMPLAINT_GPRS_DETAIL':
                        $scope.description=getGprsDescription(data.data, vm.total);
                    break;
                    default:
                    break;
                }
            });

        function getChargeDescription(data, total){
            var classRatio=getComplaintClassPoint(data, total);
            var n=4;
            var topDescription=getTopDescription(data, n);
            var description="基础业务-费用质疑投诉占全部费用类投诉的" + classRatio[0].complaitSumRatio + "。其中投诉量较高的是" + topDescription;
            return description;
        }

        function get4GDescription(data, total){
            var classRatio=getComplaintClassPoint(data, total);
            var newClassRatio=getTopClassRatio(classRatio,3);
            var n=3;
            var topDescription=getTopDescription(data, n);
            var description=newClassRatio[0].complaitName + "、" + newClassRatio[1].complaitName + "和" +
            newClassRatio[2].complaitName + "的投诉分别占全部4G业务投诉的" + newClassRatio[0].complaitSumRatio + "、"+
            newClassRatio[1].complaitSumRatio + "、" + newClassRatio[2].complaitSumRatio + ", 其中投诉量较高的是" + topDescription;
            return description;
        }

        function getGprsDescription(data, total){
            var classRatio=getComplaintClassPoint(data, total);
            var newClassRatio=getTopClassRatio(classRatio,2);
            var n=4;
            var topDescription=getTopDescription(data, n);
            var description="流量业务投诉主要集中于" + newClassRatio[0].complaitName + "和" + newClassRatio[1].complaitName+", 分别占"+
            newClassRatio[0].complaitSumRatio + "和" + newClassRatio[1].complaitSumRatio + ", 另外";
            var sum=0;
            for(var i=2; i<newClassRatio.length; i++){
                if(i!=newClassRatio.length-1){
                    description=description+newClassRatio[i].complaitName+"、";
                }else{
                    description=description+newClassRatio[i].complaitName;
                }
                sum=sum+parseInt(newClassRatio[i].complaitSum);
            }
            description=description + "共占" + ((sum/total)*100).toFixed(2) + "%。其中投诉量较高的是" + topDescription;
            return description;
        }

        function getTopClassRatio(classRatio, n){
            for(var i=0; i<n; i++){
                var maxIndex=i;
                for(var j=i+1; j<classRatio.length; j++){
                    if(classRatio[j].complaitSumRatio>classRatio[maxIndex].complaitSumRatio){
                        maxIndex=j;
                    }
                }
                if(maxIndex!=i){
                    var temp=classRatio[i];
                    classRatio[i]=classRatio[maxIndex];
                    classRatio[maxIndex]=temp;
                }
            }
            return classRatio;
        }

        function getTopDescription(data, n){
            var topData=[];
            for(var i=0; i<n; i++){
                if(data[i].class5==data[i].class6){
                    topData[i]=data[i].class5;

                }else{
                    topData[i]=data[i].class5 + "-" + data[i].class6;
                }
            }
            for(var j=0; j<n-1; j++){
                var flag=false;
                for(var k=j+1; k<n; k++){
                    if(topData[j]==topData[k]){
                        topData[k]=topData[k]+"-"+data[k].class4;
                        flag=true;
                    }
                }
                if(flag){
                    topData[j]=topData[j]+"-"+data[j].class4;
                }
            }
            for(var j=0; j<n-1; j++){
                var flag=false;
                for(var k=j+1; k<n; k++){
                    if(topData[j]==topData[k]){
                        topData[k]=topData[k]+"-"+data[k].class3;
                        flag=true;
                    }
                }
                if(flag){
                    topData[j]=topData[j]+"-"+data[j].class3;
                }
            }
            var topDescription=topData[0];
            for(var i=1; i<topData.length; i++){
                topDescription=topDescription + ", " +topData[i];
            }
            return topDescription + "。";
        }

        function getComplaintClassPoint(data, total){
            var result=[];
            var complait={};
            complait.complaitName=data[0].class3;
            complait.complaitSum=data[0].cnt;
            result[0]=angular.copy(complait);
            for(var i=1; i<data.length; i++){
                var flag=true;
                for(var j=0; j<result.length; j++){
                    if(data[i].class3==result[j].complaitName){
                        result[j].complaitSum=result[j].complaitSum+data[i].cnt;
                        flag=false;
                        break;
                    }
                }
                if(flag){
                    complait.complaitName=data[i].class3;
                    complait.complaitSum=data[i].cnt;
                    result.push(angular.copy(complait));
                }
            }
            for(var k=0; k<result.length; k++){
                result[k].complaitSumRatio=((result[k].complaitSum/total)*100).toFixed(2)+"%";
            }
            return result;
        }

        $scope.$on('detailclick', function(event, param) {
            switch (param.chartId) {
                case 'groupByDistribution-chart':
                    monthyDetailService.getDetailPost('/point/cost/dept/by/month', { date: vm.month, dept: encodeURIComponent('其他部门') })
                        .then(function(data) {
                        })
                    break;
                default:
                    break;
            }
        });
    }]);

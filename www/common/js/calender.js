'use strict';


/**
 *   日历插件   calendar
 *
 *
 * 
 */
angular.module('calender',['ionic'])
.directive('calender', ['$rootScope', '$ionicModal', '$filter', function($rootScope, $ionicModal, $filter){
    var DATE_NOW = new Date(),
        YEAR_NOW = DATE_NOW.getFullYear(),
        MONTH_NOW = DATE_NOW.getMonth(),
        DAY_NOW = DATE_NOW.getDate(),
        DATE_FIV_PRE = new Date().setFullYear(YEAR_NOW,MONTH_NOW,DAY_NOW-4),
        MONTH_DAYS = [31, 27, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        MONTH_DAYS_LEAP = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    

    var linkFn = function(scope, element, attrs, ctrl) {


        var htmlTemplate = '<ion-modal-view>'
                + '<div class="qw-row bar-header">'
                + '<div class="qw-col-50"><label class="item-radio" on-touch="choiceDateFn(startDate)"><input type="radio" name="choiceDate" value="startDate" ng-checked="date == startDate"><div class="item-content qw-check qw-check-clam">开始日期<div>{{startDate | date:\'yyyy-MM-dd\'}}</div></div></label></div>'
                + '<div class="qw-col-50"><label class="item-radio" on-touch="choiceDateFn(endDate)"><input type="radio" name="choiceDate" value="endDate" ng-checked="date === endDate"><div class="item-content qw-check qw-check-clam">结束日期<div>{{endDate | date:\'yyyy-MM-dd\'}}</div></div></label></div>'
                + '<div class="date-range"></div>'
                + '<div class="qw-row">'
                +     '<div class="qw-col-50">'
                +         '<div class="qw-row-time"><i class="ion ion-ios-arrow-back" on-touch="changeYear(year - 1)"></i><span on-touch="dayToOther(\'year\')">{{year}}</span><i class="ion ion-ios-arrow-forward" on-touch="changeYear(year + 1)"></i></div>'
                +     '</div>'
                +     '<div class="qw-col-50">'
                +         '<div class="qw-row-time"><i class="ion ion-ios-arrow-back" on-touch="changeMonth(month - 1)"></i><span on-touch="dayToOther(\'month\')">{{month + 1}}</span><i class="ion ion-ios-arrow-forward" on-touch="changeMonth(month + 1)"></i></div>'
                +     '</div>'
                + '</div>'
                + '<ul class="qw-row qw-date-model" ng-show="show.year">'
                +      '<li class="qw-col-33" ng-repeat="y in yearArr track by $index"><label class="item-radio" on-touch="changeMonthORYear(y,\'year\')"><input type="radio" name="year" ng-value="y"  ng-checked="year === y"><div class="item-content qw-check qw-check-clam">{{y}}</div></label></li>'
                + '</ul>' 
                + '<ul class="qw-row qw-date-model" ng-show="show.month">'
                +      '<li class="qw-col-33" ng-repeat="m in monthArr"><label class="item-radio" on-touch="changeMonthORYear($index,\'month\')"><input type="radio" name="month" ng-value="$index" ng-checked="month === $index"><div class="item-content qw-check qw-check-clam">{{m}}</div></label></li>'
                + '</ul>'                
                + '<div class="day">'
                +      '<ul class="row qw-day-header"><li class="col">日</li><li class="col">一</li><li class="col">二</li><li class="col">三</li><li class="col">四</li><li class="col">五</li><li class="col">六</li></ul>'
                +      '<ul class="qw-row">'
                +      '<li class="qw-col-14" ng-repeat="d in dayArr track by $index"><label class="item-radio" on-touch="changeDay(d)"><div class="item-content qw-check qw-check-clam" ng-class="{choiced: d.choiced}">{{d.day}}</div></label></li>'
                +      '</ul>'  
                + '</div>'
                + '<div class="qw-right">'
                + '<button class="button button-clear button-calm" on-touch="setFullDate()">确定</button>'
                + '<button class="button button-clear button-calm" on-touch="closeModal()">取消</button>'
                + '</div>'
                + '</div>'
                + '</ion-modal-view>';
        var  inputs = angular.element(element[0].querySelectorAll('input')),
             startInput = {},
             endInput = {};
        angular.forEach(inputs,function(value,key){
            if(value.name === "startDate"){
                startInput = angular.element(inputs[key]);
            }else if(value.name === "endDate"){
                endInput = angular.element(inputs[key]);
            }
        });

        console.log(startInput);
        console.log(endInput);

        
        //获取结束日和开始日期input的值
        var startInputVal = startInput.val(),
            endInputVal = endInput.val();
            scope.startDate = startInputVal ? new Date(startInputVal) : new Date(DATE_FIV_PRE);
            
            scope.startDate.setHours(0,0,0,0);
            scope.endDate = endInputVal ? new Date(endInputVal) : new Date(DATE_NOW);
            scope.endDate.setHours(23,59,59,999);
        scope.yearArr = [];
        scope.monthArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
        scope.dayArr = [];
        

        //初始化
        scope.choiceDateFn = function(date){
            var  date = scope.date = date || new Date(); 
            scope.year = date.getFullYear();
            scope.month = date.getMonth();
            scope.day = date.getDate();
            crtYearArr();
            crtMonthArr();
            getDayArr(); 
        }


        //监听 开始日期和结束日期变化，如果开始日期大于结束日期，就对调
        scope.$watch('startDate',function(value){
            if(value > scope.endDate){
                var date = scope.startDate;
                scope.startDate = scope.endDate;
                scope.endDate = date;
                scope.choiceDateFn(scope.endDate);
            }
        },true);
        scope.$watch('endDate',function(value){
            if(value < scope.startDate){
                var date = scope.startDate;
                scope.startDate = scope.endDate;
                scope.endDate = date;
                scope.choiceDateFn(scope.startDate);
            }
        },true);

        //展示可选年月日。

        scope.show = {
            year: false,
            month: false
        };

        //监听日期input被focus，显示calender
        startInput.bind('focus',function onInputFocus(){
            console.log('1');
            scope.choiceDateFn(scope.startDate);
            scope.dateModal.show();
            scope.$apply();
        });
        endInput.bind('focus', function onInputFocus() {
            console.log('2');
            scope.choiceDateFn(scope.endDate);
            scope.dateModal.show();
            scope.$apply();        
        });        
 
        //日期模态框
        scope.dateModal = $ionicModal.fromTemplate(htmlTemplate, {
            scope: scope,
            animation: 'slide-in-up'
        });
        scope.openModal = function() {
            scope.dateModal.show();
        };
        scope.closeModal = function() {
            scope.dateModal.hide();
        };

        scope.$on('$destroy', function() {
            scope.dateModal.remove();
        });

        /**
         * [crtYearArr 创建一个年份的列表供用户选择，默认生成一个长度
         * 12的数组，然后起始按照1900开始]
         * @param  {[type]} year [description]
         * @return {[type]}      [description]
         */
        function crtYearArr(year){
            var year = Number(year) || scope.year,
                yearArr = [];
            if(year > YEAR_NOW){
                year = YEAR_NOW;
            }else if(year < 1900){
                year = 1900;
            };
            var extra = year - 1900,
                remainder = extra % 12; 
            for (var i = 0; i < 12;i++){
                yearArr[i] = year - remainder + i;
                if(yearArr[i] === YEAR_NOW) break; 
            }
            scope.yearArr = yearArr;
            return yearArr;
        };

        /**
         * [crtMonthArr 获取月份数组]
         * @param  {[type]} year [description]
         * @return {[type]}      [description]
         */
        function crtMonthArr(year){
            var year = year || scope.year,
                monthArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
            if(year === YEAR_NOW){
                monthArr.splice(MONTH_NOW + 1);
            }
            scope.monthArr = monthArr;
            return monthArr;
        }
        /**
         * [getMonthDays 获取每个月有多少天]
         * @param  {[type]} year [description]
         * @return {[type]}      [description]
         */
        function getMonthDays(year) {
            var year = year || scope.year;
            if (year % 4 || !(year % 100) && year % 400) {
                return MONTH_DAYS;
            } else {
                return MONTH_DAYS_LEAP;
            }
        };  
        /**
         * [getDayArr 根据年月生成这个月的日期数组]
         * @param  {[num]} year  [description]
         * @param  {[num]} month [0-11]
         * @return {[type]}       [description]
         */
        function getDayArr(year,month){
            var year = year || scope.year,
                month = month || scope.month,
                dayNum = getMonthDays(year)[month],
                date = new Date(year, month, 1),
                firstDay = date.getDay(),
                dayArr = new Array(dayNum);
                for(var i = 0, len = firstDay + dayNum; i < len;i++){
                    dayArr[i] = {};
                    if(i < firstDay){
                        dayArr[i].day = '';
                    }else {
                        if(year >= YEAR_NOW && month === MONTH_NOW){
                            var dayc = i + 1 - firstDay;
                            if( dayc <= DAY_NOW){
                                dayArr[i].day = dayc;
                                dayArr[i].choiced = false;
                                continue;
                            }  
                        }else{
                            dayArr[i].day = i + 1 - firstDay;
                            dayArr[i].choiced = false;
                        }
                    }
                }
            scope.dayArr = dayArr;
            scope.isChiocedDay(year,month);
            return dayArr;
        };

        scope.isChiocedDay = function(year,month,dayArr){
            var year = year || scope.year,
                month = month || scope.month,
                dayArr = dayArr || scope.dayArr,
                thisDay = new Date(),
                thisTime = 0,
                startTime = scope.startDate.getTime(),
                endTime = scope.endDate.getTime();
                console.log(endTime);
                for(var i = 0,len = dayArr.length; i < len;i++){
                    if(dayArr[i].day > 0 && dayArr[i].day < 32){
                        thisDay.setFullYear(year,month,dayArr[i].day);
                        thisTime = thisDay.getTime();
                        if( startTime <= thisTime &&  endTime >= thisTime){
                            dayArr[i].choiced = true;
                        }else{
                            dayArr[i].choiced = false;
                        }
                    }
                }
        }
        /**
         * [changeYear 修改年份]
         * @param  {[num]} year [1900年以后的日期]
         * @return {[type]}      [description]
         */
        scope.changeYear = function(year){
            var year = year || scope.year;
            if(year > YEAR_NOW){
                year = YEAR_NOW;
            }else if(year < 1900){
                year = 1900;
            };
            scope.year = year;
            crtYearArr(year);
            crtMonthArr(year);
            getDayArr(year);
        };
        /**
         * [changeMonth 月份更改]
         * @param  {[num]} month [0-11的数字,当大于11或者小于0时，会改变年份]
         * @return {[type]}       [description]
         */
        scope.changeMonth = function(month){
            var year = year || scope.year,
                month = month === undefined ? scope.month : month;
            if(year === YEAR_NOW && month > MONTH_NOW){
                return;
            }
            if(month > 11){
                month = 0;
                scope.changeYear(year+1);
            }else if(month < 0){
                month = 11;
                scope.changeYear(year-1);
            };
            getDayArr(year,month);
            scope.month = month;
        };

        /**
         * [changeDay 改变月份中的日]
         * @param  {[num]} day [1-31的数字]
         * @return {[type]}     [description]
         */
        scope.changeDay = function(d){
            var day = d.day;
            scope.day = day;
            scope.date.setFullYear(scope.year,scope.month,scope.day)
            scope.isChiocedDay();
        };

        /**
         * [changeMonthORYear 选择月份或者年份后，改变月份和年份并且相应隐藏选项卡]
         * @param  {[type]} num    [description]
         * @param  {[type]} target [description]
         * @return {[type]}        [description]
         */
        scope.changeMonthORYear = function(num,target){
            if(target === 'month'){
                scope.changeMonth(num);
            }else{
                scope.changeYear(num);
            }
            scope.dayToOther(target);
        };

        /**
         * [dayToOther 点击年份或者月份显示或者隐藏选项卡]
         * @param  {[string]} option [为month或者year]
         * @return {[type]}        [description]
         */
        scope.dayToOther = function(option){
            if(scope.show[option]){
                scope.show[option] = false;
                return;
            }else{
                scope.show.year = scope.show.month = false;
                scope.show[option] = true;
            }
        };

        scope.setFullDate = function(){
            var startDateStr = $filter('date')(scope.startDate,'yyyy-MM-dd'), 
                endDateStr = $filter('date')(scope.endDate,'yyyy-MM-dd');  
            startInput.val(startDateStr);
            endInput.val(endDateStr);
            startInput.triggerHandler('input');
            startInput.triggerHandler('change');
            endInput.triggerHandler('input');
            endInput.triggerHandler('change');
            scope.closeModal();
        }
    }; 
    return {
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        scope: {
            dateStart:'=dateStart',
            dateEnd: '=dateEnd'
        },
        link: linkFn
    };
}]);
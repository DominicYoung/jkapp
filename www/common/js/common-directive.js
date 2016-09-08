'use strict';
/**
 * CONTENTS
 *
 *module[commonDirective].............常用指令
 *
 *
 * previousPage..........返回上一页
 *
 * userSignOut............用户退出
 *
 *
 * scoreStar...... 评分显示及评分
 * 使用方法
 * <div score-star mg-score="" my-disable=""></div>
 * my-score设置初始分数，目前评分为5，显示粒度为0.5
 * crt-score提交评分函数
 * 添加style属性
 * abs-score
 *  .row-score{
 *	   display: inline-block;
 *	   position: relative;
 *	   height: 100%;
 *	   width: 100%;
 *	   i{
 *		   display: inline-block;
 *		   width: 20%;
 *		   height: 20%;
 *		   text-align: center;
 *	    }
 *   }
 *   .abs-score{
 *   	display: inline-block;
 *   	position: absolute;
 *   	top: 0;
 *   	left: 0;
 *   	width: 100%;
 *   	height: 100%;
 *   	opacity: 0;
 *   	filter: alpha(opacity=0);
 *   	span{
 *   		display: inline-block;
 *   		width: 10%;
 *   		height: 100%;
 *   		opacity: 0;
 *   		filter: alpha(opacity=0);
 *   	}
 *   }
 * multiCheckbox3...... 三级下拉多选框
 * 使用方法
 * <div multi-checkbox3 box-datas="" checked-id="" check-datas="" box-options="false"></div>
 * 分两种方式。
 * 1.默认所有参数都传入
 * box-datas为传入数组 形如： [{id:'1',name:'数组名',checked:true,child:[{id:'11',name:'',child:[]}]},{}]; checked为可选
 * checke-id 为默认选中id 需要传入 id数值 可选
 * 2.一次传入一个子类型数组
 * box-datas为传入数组 形如： [{id:,name:,hasChild:},{}];  hasChild为false,true。
 * getSubDatas  获取子类数组函数
 *
 * box-options 布尔型 选择多选还是单选。默认为false 是多选。单选默认为依次获取数据
 *
 * check-datas 多选为为绑定的选中类型的id数组。单选为只有一个对象的数组
 *
 *
 * 添加style属性
 * .box {
 *      display: block;
 *      width:100%;
 *  }
 *  .list-group dl{
 *     margin-bottom: 0;
 *  }
 *  .list-group-item dd {
 *      padding-left: 20px;
 *  }
 *
 */
angular.module('commonDirective', [])
    .directive('previousPage', function() {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm, iAttrs, controller) {
                iElm.on('click', function() {
                    history.go(-1);
                })
            }
        };
    })
    .directive('signOut', ['$http', function($http) {
        // Runs during compile
        return {

            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment

            link: function($scope, iElm, iAttrs, controller) {
                iElm.on('click', signOutFn);

                function signOutFn() {
                    var urlHost = window.localStorage['urlHost'],
                        url = urlHost + 'rest/logout';
                    $http.get(url).success(function(data, status) {
                            if (data.msgStatus === 1) {
                                location.href = '../../index.html';
                            };
                        })
                        .error(function(data, status) {
                            if (status === 401) {
                                location.href = '../../index.html';
                            }
                        });
                }
            }
        };
    }])
    .directive('scoreStar', ['$http','knlManage',function($http,knlManage) {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            scope: {
                scoreObj: '=myScore',
                crtScore : '&crtScore'
            }, // {} = isolate, true = child, false/undefined = no change
            template: '<div class="row-score">' 
                    + '<i ng-repeat = "s in scoreShow" ng-class="{\'ion ion-ios-star-outline\':s.hide,\'ion ion-ios-star-half\':s.half,\'ion ion-ios-star\':s.show}"></i>' 
                    + '<div class="abs-score" ng-mouseleave="clearScore()">' 
                    + '<span class="score-nav"  ng-click="changeScore(0.5)" ng-mouseenter="setScore(0.5)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(1)" ng-mouseenter="setScore(1)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(1.5)" ng-mouseenter="setScore(1.5)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(2)" ng-mouseenter="setScore(2)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(2.5)" ng-mouseenter="setScore(2.5)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(3)" ng-mouseenter="setScore(3)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(3.5)" ng-mouseenter="setScore(3.5)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(4)" ng-museenter="setScore(4)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(4.5)" ng-mouseenter="setScore(4.5)"></span>'
                    + '<span class="score-nav"  ng-click="changeScore(5)" ng-mouseenter="setScore(5)"></span>'
                    + '</div>' 
                    + '</div>',
            replace: false,
            link: function(scope, elem, attrs, controller) {
                scope.disable = false;
                scope.scoreShow = [{
                    hide: true,
                    half: false,
                    show: false
                }, {
                    hide: true,
                    half: false,
                    show: false
                }, {
                    hide: true,
                    half: false,
                    show: false
                }, {
                    hide: true,
                    half: false,
                    show: false
                }, {
                    hide: true,
                    half: false,
                    show: false
                }];
                scope.setScore = function (score) {
                    if (scope.disable) {
                        return;
                    };
                    var num = Math.round(score * 2),
                        intScore = Math.floor(num/2),
                        decimalScore = num/2 - intScore;
                    for (var i = 0; i < scope.scoreShow.length; i++) {
                        if (i < intScore) {
                            scope.scoreShow[i] = {
                                hide: false,
                                half: false,
                                show: true
                            };
                        } else if (i === intScore) {
                            if(decimalScore === 0.5){
                                scope.scoreShow[i].show = false;
                                scope.scoreShow[i].half = true;
                                scope.scoreShow[i].hide = false; 
                            }else{
                                scope.scoreShow[i].show = false;
                                scope.scoreShow[i].half = false;
                                scope.scoreShow[i].hide = true;
                            }
                        } else {
                            scope.scoreShow[i] = {
                                hide: true,
                                half: false,
                                show: false
                            };
                        }
                    }
                };
                /**
                 * [clearScore 清空分数]
                 * @return {[type]} [无返回值]
                 */
                scope.clearScore = function(){
                    if(scope.disable){
                        return;
                    }
                    for (var i = 0; i < scope.scoreShow.length; i++) {
                        scope.scoreShow[i] = {
                                hide: true,
                                half: false,
                                show: false
                            };
                    }
                }
                /**
                 * [changeScore 修改分数]
                 * @param  {[number]} score [分数]
                 * @param  {[boolean]}    [是否为已经设置分数]
                 * @return {[type]}     [description]
                 */
                scope.changeScore = function(score) {
                    var _score = score;
                    if (scope.disable){
                        return;
                    };
                    if(arguments[1]){
                        scope.setScore(_score);
                        scope.disable = true;
                    }else{
                        if(!angular.isFunction(scope.crtScore)){
                            throw new Error("请绑定提交分数函数");
                        }
                        scope.crtScore({score:_score});
                    } 
                };
                var scoreWatch = scope.$watch('scoreObj.score',function(data){
                    console.log(data);
                    if(angular.isDefined(data) && data > 0.25){
                        scope.changeScore(data,true);
                        console.log('defined');
                        scoreWatch();
                    };
                });
            }
        };
    }])
    .directive('multiCheckbox3', function() {
        return {
            scope: {
                boxDatas: '=boxDatas',
                checkDatas: '=checkDatas',
                checkedID: '=checkedId',
                getSubDatas: '&getSubDatas',
                boxOptions: '@boxOptions'
            },
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<div class="list-group" >' + '<dl class="list-group-item" ng-repeat=" d1 in boxDatas">' + '<dt class="box" >' + '<input ng-if="!boxOptions" ng-model="d1.checked" ng-change="choiceBox(d1)" type="checkbox"><input ng-if="boxOptions && d1.hasChild < 1" ng-model="checkDatas" name="checkDates"  type="radio" value="{{d1.id}}">{{d1.name}}<i ng-click="subShowBox(d1)" ng-show="d1.hasChild > 0" ng-class="{true:\'fa fa-caret-up pull-right\',false:\'fa fa-caret-down pull-right\'}[d1.subShow]"></i>' + '</dt>' + '<dd ng-repeat="d2 in d1.child">' + '<dl ng-show="d2.show">' + '<dt class="box" ><input ng-if="!boxOptions" ng-model="d2.checked" ng-change="choiceBox(d2)" type="checkbox"><input ng-if="boxOptions && d2.hasChild < 1" ng-model="checkDatas[0]" name="checkDates"  type="radio" ng-value="d2">{{d2.name}}<i ng-click="subShowBox(d2)" ng-show="d2.hasChild > 0" ng-class="{true:\'fa fa-caret-up pull-right\',false:\'fa fa-caret-down pull-right\'}[d2.subShow]"></i></dt>' + '<dd class="box" ng-repeat="d3 in d2.child" ng-show="d3.show"><input ng-if="!boxOptions" ng-model="d3.checked" ng-change="choiceBox(d3)" type="checkbox"><input ng-if="boxOptions" ng-model="checkDatas[0]" name="checkDates"  type="radio" ng-value="d3">{{d3.name}}</dd>' + '</dl>' + '</dd>' + '</dl>' + '</div>',
            replace: false,
            link: function(scope, iElm, iAttrs, controller) {
                scope.boxOptions = undefined === scope.boxOptions ? false : scope.boxOptions === "true";

                function init(arr) {
                    if (!arr) return;
                    for (var i = 0, ii = arr.length; i < ii; i++) {
                        arr[i].show = arr[i].show === undefined && false;
                        arr[i].subShow = arr[i].subShow === undefined && false;
                        arr[i].hasChild = arr[i].child !== undefined && arr[i].child.length > 0;
                        arr[i].checked = !!arr[i].checked;
                        scope.checkedID === arr[i].id && scope.choiceBox(arr[i], true);
                        if (arr[i].hasChild > 0) {
                            init(arr[i].child);
                        }
                    }
                };
                scope.$watch('boxDatas', function(value) {
                    if (!!value && value.length >= 1) {
                        init(scope.boxDatas);
                    }
                    angular.forEach(scope.boxDatas, function(b) {
                        b.show = true;
                    });
                });

                //第二个参数，可选设置是否显示
                scope.subShowBox = function(obj) {
                    var tobj = obj;
                    tobj.subShow = arguments.length === 1 ? !tobj.subShow : arguments[1];
                    if (scope.boxOptions && tobj.subShow) {
                        if (tobj.child === undefined || tobj.child.length === 0) {
                            scope.getSubDatas({
                                id: tobj.id
                            }).then(function(data) {
                                tobj.child = data;
                                for (var i = 0, ii = tobj.child.length; i < ii; i++) {
                                    tobj.child[i].show = true;
                                    tobj.child[i].subShow = false;
                                    tobj.child[i].checked = false;
                                };
                            }, function(err) {

                            });
                        }
                        return;
                    };
                    if (!tobj.hasChild) {
                        return;
                    }
                    for (var i = 0, ii = tobj.child.length; i < ii; i++) {
                        tobj.child[i].show = tobj.subShow;
                        if (!tobj.subShow) {
                            scope.subShowBox(tobj.child[i], false);
                        }
                    };
                };
                scope.choiceBox = function(obj, check) {
                    var obj = obj;
                    obj.checked = check !== undefined ? check : obj.checked;
                    if (!obj.hasChild) {
                        if (!angular.isArray(scope.checkDatas))
                            throw new Error("check-datas is not a arrary");
                        var cindex = scope.checkDatas.indexOf(obj.id);
                        cindex === -1 ? scope.checkDatas.push(obj.id) : scope.checkDatas.splice(cindex, 1);
                        return;
                    }
                    for (var i = 0, ii = obj.child.length; i < ii; i++) {
                        scope.choiceBox(obj.child[i], obj.checked);
                    };
                };
            }
        };
    })
    .directive('multiRadiu', function() {
        return {
            scope: {
                isShow: '=isShow',
                boxDatas: '=boxDatas',
                checkData: '=checkData'
            },
            replace: true,
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<div class="focus-down" ng-show="isShow">' + '<div class="list-group">' + '<dl class="list-group-item">' + '<dt ng-click="choice(-1)" class="box">' + '<span>--请选择--</span>' + '</dt>' + '</dl>' + '<dl class="list-group-item" ng-repeat=" d1 in boxDatas">' + '<dt class="box">' + '<span>{{d1.name}}</span>' + '</dt>' + '<dd ng-repeat="d2 in d1.child">' + '<dl >' + '<dt class="box" ng-click="choice(d2)"><span>{{d2.name}}</span></dt>' + '<dd class="box" ng-if="d2.child.length > 0" ng-repeat="d3 in d2.child" ng-click="choice(d3)"><span>{{d3.name}}</span></dd>' + '</dl>' + '</dd>' + '</dl>' + '</div>' + '</div>',
            link: function(scope, iElm, iAttrs, controller) {
                scope.checkData = {};
                scope.choice = function(obj) {
                    var obj = angular.isObject(obj) ? obj : {
                        name: '',
                        id: '-1'
                    };
                    if (obj.child && obj.child.length > 0) {
                        return;
                    }
                    scope.checkData = angular.copy(obj);
                    scope.isShow = false;
                };
            }
        };
    });

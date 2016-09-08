'use strict';
angular.module('impApp')
    .factory('monthyDataService', ['$q', 'monthyService', '$ionicLoading', 'monthyParseData', 'requestCode', 'echartsService', function($q, monthyService, $ionicLoading, monthyParseData, requestCode, echartsService) {
        var monthyDataService = {};
        monthyDataService.intteruptOutShow = true;

        monthyDataService.importantEvents;
        monthyDataService.bearerBusinessarr;
        monthyDataService.interruptdataarr;
        monthyDataService.clientsensearr;
        monthyDataService.businessoperatearr;
        monthyDataService.systemoperatearr;
        monthyDataService.complaintarr;
        monthyDataService.importantEvent = [];

        monthyDataService.resultMap = {}; //记录请求结果

        //文字描述
        monthyDataService.modelDescription = {};

        function descrition(elmId, data) {
            if (elmId == 'bearer-business-content') {
                var
                    businessPhyCur = data.bussiness.physical.cur,
                    businessPhyLast = data.bussiness.physical.last,
                    businessEleCur = data.bussiness.electronic.cur,
                    businessEleLast = data.bussiness.electronic.last;
                monthyDataService.modelDescription.businessPhyCur = businessPhyCur;
                monthyDataService.modelDescription.businessEleCur = businessEleCur;
                monthyDataService.modelDescription.businessPhyDval = (Math.abs(businessPhyCur - businessPhyLast) / businessPhyLast * 100).toFixed(2);
                monthyDataService.modelDescription.businessEleDval = (Math.abs(businessEleCur - businessEleLast) / businessEleLast * 100).toFixed(2);
                monthyDataService.modelDescription.businessPhyDayCur = (businessPhyCur / 30).toFixed(2);
                monthyDataService.modelDescription.businessEleDayCur = (businessEleCur / 30).toFixed(2);
                monthyDataService.modelDescription.businessEleScale = (businessEleCur / (businessPhyCur + businessEleCur) * 100).toFixed(2);
                if (businessPhyCur - businessPhyLast > 0) {
                    monthyDataService.modelDescription.businessPhyAdd = "增加";
                } else {
                    monthyDataService.modelDescription.businessPhyAdd = "减少";
                }
                if (businessEleCur - businessEleLast > 0) {
                    monthyDataService.modelDescription.businessEleAdd = "增加";
                } else {
                    monthyDataService.modelDescription.businessEleAdd = "减少";
                }

                var
                    billCur02 = data.bill.cur.ZC_07_KSF_02_02a_MON,
                    billCur014 = data.bill.cur.ZC_CC_014,
                    billCur01401 = data.bill.cur.ZC_CC_014_01,
                    billCur01404 = data.bill.cur.ZC_CC_014_04,
                    billCur01405 = data.bill.cur.ZC_CC_014_05,
                    billLast02 = data.bill.last.ZC_07_KSF_02_02a_MON,
                    billLast014 = data.bill.last.ZC_CC_014,
                    billLast01401 = data.bill.last.ZC_CC_014_01,
                    billLast01404 = data.bill.last.ZC_CC_014_04,
                    billLast01405 = data.bill.last.ZC_CC_014_05;
                monthyDataService.modelDescription.billCur02 = (billCur02).toFixed(2);
                monthyDataService.modelDescription.billCur014 = (billCur014).toFixed(2);
                monthyDataService.modelDescription.billCur01401 = (billCur01401).toFixed(2);
                monthyDataService.modelDescription.billCur01404 = (billCur01404).toFixed(2);
                monthyDataService.modelDescription.billCur01405 = (billCur01405).toFixed(2);
                monthyDataService.modelDescription.bill02Dval = (Math.abs(billCur02 - billLast02) / billLast02 * 100).toFixed(2);
                monthyDataService.modelDescription.bill01404Dval = (Math.abs(billCur01404 - billLast01404) / billLast01404 * 100).toFixed(2);
                monthyDataService.modelDescription.bill01401Dval = (Math.abs(billCur01401 - billLast01401) / billLast01401 * 100).toFixed(2);
                monthyDataService.modelDescription.bill01405Dval = (Math.abs(billCur01405 - billLast01405) / billLast01405 * 100).toFixed(2);
                monthyDataService.modelDescription.billCur014Scale = (billCur014 / billCur02 * 100).toFixed(2);
                monthyDataService.modelDescription.billCur01404Scale = (billCur01404 / billCur014 * 100).toFixed(2);
                monthyDataService.modelDescription.billCur01401Scale = (billCur01401 / billCur014 * 100).toFixed(2);
                monthyDataService.modelDescription.billCur01405Scale = (billCur01405 / billCur014 * 100).toFixed(2);
                if (billCur02 - billLast02 > 0) {
                    monthyDataService.modelDescription.bill02Add = "增加";
                } else {
                    monthyDataService.modelDescription.bill02Add = "减少";
                }
                if (billCur01404 - billLast01404 > 0) {
                    monthyDataService.modelDescription.bill01404Add = "增加";
                } else {
                    monthyDataService.modelDescription.bill01404Add = "减少";
                }
                if (billCur01401 - billLast01401 > 0) {
                    monthyDataService.modelDescription.bill01401Add = "增加";
                } else {
                    monthyDataService.modelDescription.bill01401Add = "减少";
                }
                if (billCur01405 - billLast01405 > 0) {
                    monthyDataService.modelDescription.bill01405Add = "增加";
                } else {
                    monthyDataService.modelDescription.bill01405Add = "减少";
                }

                var
                    financialCur02a = data.financial.cur.ZC_07_KSF_02_01a_MON,
                    financialCur02c = data.financial.cur.ZC_07_KSF_02_01c_MON,
                    financialCur001 = data.financial.cur.ZC_Prov_001,
                    financialCur007 = data.financial.cur.ZC_Prov_007,
                    financialCur012 = data.financial.cur.ZC_Prov_012,
                    financialLast02a = data.financial.last.ZC_07_KSF_02_01a_MON,
                    financialLast02c = data.financial.last.ZC_07_KSF_02_01c_MON,
                    financialLast001 = data.financial.last.ZC_Prov_001,
                    financialLast007 = data.financial.last.ZC_Prov_007,
                    financialLast012 = data.financial.last.ZC_Prov_012,
                    financialCurScale = parseInt(financialCur007 / (financialCur007 + financialCur012) * 100);
                monthyDataService.modelDescription.financialCur02a = financialCur02a;
                monthyDataService.modelDescription.financialCur02c = financialCur02c;
                monthyDataService.modelDescription.financialCur001 = financialCur001;
                monthyDataService.modelDescription.financialCur02cScale = (financialCur02c / financialCur02a * 100).toFixed(2);
                monthyDataService.modelDescription.financialCur007Scale = ((financialCur007 + financialCur012) / financialCur001 * 100).toFixed(2);
                monthyDataService.modelDescription.financialCurScale = financialCurScale + '：' + (100 - Number(financialCurScale));
                if (financialCur02a - financialLast02a > 0) {
                    monthyDataService.modelDescription.financial02aAdd = "增加" + (Math.abs(financialCur02a - financialLast02a) / financialLast02a * 100).toFixed(2);
                } else {
                    monthyDataService.modelDescription.financial02aAdd = "减少" + (Math.abs(financialCur02a - financialLast02a) / financialLast02a * 100).toFixed(2);
                }
                if (financialCur02c - financialLast02c > 0) {
                    monthyDataService.modelDescription.financial02cAdd = "增加" + (Math.abs(financialCur02c - financialLast02c) / financialLast02c * 100).toFixed(2);
                } else {
                    monthyDataService.modelDescription.financial02cAdd = "减少" + (Math.abs(financialCur02c - financialLast02c) / financialLast02c * 100).toFixed(2);
                }
                if (financialCur001 - financialLast001 > 0) {
                    monthyDataService.modelDescription.financial001Add = "增加" + (Math.abs(financialCur001 - financialLast001) / financialLast001 * 100).toFixed(2);
                } else {
                    monthyDataService.modelDescription.financial001Add = "减少" + (Math.abs(financialCur001 - financialLast001) / financialLast001 * 100).toFixed(2);
                }
            } else if (elmId == 'interrupt-business-content') {
                var
                    pieInReason = data.pie.inReason,
                    pieInChannel = data.pie.inChannel,
                    pieOutReason = data.pie.outReason,
                    pieOutChannel = data.pie.outChannel,
                    pieOutGrade = data.pie.outGrade,
                    pieOutTimes = 0,
                    pieInTimes = 0,
                    pieOutTime = 0,
                    pieInTime = 0,
                    pieOutStr = [],
                    pieInStr = [],
                    pieInChannelV = [],
                    j = 0;
                for (var i = 0; i < pieOutReason.length; i++) {
                    pieOutTimes += pieOutReason[i].v;
                }
                monthyDataService.modelDescription.pieOutTimes = pieOutTimes;
                for (var i = 0; i < pieOutChannel.length; i++) {
                    pieOutTime += pieOutChannel[i].v;
                }
                monthyDataService.modelDescription.pieOutTime = pieOutTime;
                for (var i = 0; i < pieOutGrade.length; i++) {
                    pieOutStr.push(pieOutGrade[i].k + pieOutGrade[i].v + '次');
                }
                monthyDataService.modelDescription.pieOutGrade = pieOutStr.join('，');
                for (var i = 0; i < pieInReason.length; i++) {
                    pieInTimes += pieInReason[i].v;
                }
                monthyDataService.modelDescription.pieInTimes = pieInTimes;
                for (var i = 0; i < pieInChannel.length; i++) {
                    pieInTime += pieInChannel[i].v;
                    pieInChannelV.push(pieInChannel[i].v);
                }
                for (var i = 0; i < pieInChannel.length; i++) {
                    if (pieInChannel[i].v === Math.max.apply({}, pieInChannelV)) {
                        j = i;
                        break;
                    }
                }
                monthyDataService.modelDescription.pieInMaxTime = pieInChannel[j].k + '（' + pieInChannel[j].v + '分钟）';
                monthyDataService.modelDescription.pieInTime = pieInTime;
                for (var i = 0; i < pieInReason.length; i++) {
                    pieInStr.push(pieInReason[i].k + '（' + pieInReason[i].v + '）');
                }
                monthyDataService.modelDescription.pieInReason = pieInStr.join('、');
            }
        }

        //文字描述

        monthyDataService.wipeOut = function() {
            monthyDataService.importantEvents = monthyDataService.bearerBusinessarr = monthyDataService.interruptdataarr = monthyDataService.clientsensearr = monthyDataService.businessoperatearr = monthyDataService.systemoperatearr = monthyDataService.complaintarr = null;
            monthyDataService.intteruptOutShow = true;
            $(".section-content").css('display', 'none');
        }

        monthyDataService.parseChartData = function(elmId, data) {
            // var chartData = {};
            descrition(elmId, data);
            var chartData = [];
            if (elmId == 'bearer-business-content') {
                var operatePieData = {},
                    operateStickData = {},
                    billPieData = {},
                    billStickData1 = {},
                    billStickData2 = {},
                    finanielPieData = {},
                    finanielStickData = {},
                    finaniel2PieData = {},
                    finaniel2StickData = {};

                operatePieData.name = '';
                operateStickData.data = ['实体厅', '电子渠道'];
                operateStickData.legendData = ['上期', '本期'];
                //应该可以根据KEY值遍历
                if (angular.isDefined(data.bussiness.physical.last) && angular.isDefined(data.bussiness.physical.cur)) {
                    var business = data.bussiness;
                    operatePieData.data = [{ value: business.electronic.cur, name: '电子渠道' },
                        { value: business.physical.cur, name: '实体厅' }
                    ];
                    operateStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [(business.physical.last / 10000).toFixed(2), (business.electronic.last / 10000).toFixed(2)]
                    }, { name: '本期', type: 'bar', data: [(business.physical.cur / 10000).toFixed(2), (business.electronic.cur / 10000).toFixed(2)] }];
                }

                billPieData.name = '计费';
                billStickData1.data = ['原始话单量', '计费话单量'];
                billStickData1.legendData = ['上期', '本期'];
                billStickData2.data = ['GPRS', '语音', '短信'];
                billStickData2.legendData = ['上期', '本期'];
                if (angular.isDefined(data.bill.cur) && angular.isDefined(data.bill.last)) {
                    var bill = data.bill;
                    var billCur = bill.cur;
                    var billLast = bill.last;
                    var other = billCur.ZC_CC_014 - billCur.ZC_CC_014_01 - billCur.ZC_CC_014_04 - billCur.ZC_CC_014_05;
                    other = Math.floor(other * 100) / 100;
                    billPieData.secondData = [
                        { value: billCur.ZC_CC_014_01 || 0, name: '语音' },
                        { value: billCur.ZC_CC_014_04 || 0, name: 'GPRS' },
                        { value: billCur.ZC_CC_014_05 || 0, name: '短信' },
                        { value: other || 0, name: '其他计费话单量' }
                    ];
                    billPieData.data = [
                        { value: billCur.ZC_CC_014 || 0, name: '计费话单量' },
                        { value: ((billCur.ZC_07_KSF_02_02a_MON || 0) - (billCur.ZC_CC_014 || 0)).toFixed(2), name: '其他原始话单量' }
                    ];
                    billStickData1.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [billLast.ZC_07_KSF_02_02a_MON, billLast.ZC_CC_014] //由万转亿
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [billCur.ZC_07_KSF_02_02a_MON, billCur.ZC_CC_014]
                    }];
                    billStickData2.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [billLast.ZC_CC_014_04, billLast.ZC_CC_014_01, billLast.ZC_CC_014_05]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [billCur.ZC_CC_014_04, billCur.ZC_CC_014_01, billCur.ZC_CC_014_05]
                    }];
                }
                finanielPieData.name = '';
                finanielStickData.data = ['BOSS用户数', '账单用户数'];
                finanielStickData.legendData = ['上期', '本期'];
                finaniel2PieData.name = '';
                finaniel2StickData.legendData = ['上期', '本期'];
                finaniel2StickData.data = ['向HLR发送工单总量', '开机工单量', '停机工单量'];
                if (angular.isDefined(data.financial.cur) && angular.isDefined(data.financial.last)) {
                    var financial = data.financial;
                    var financialCur = financial.cur;
                    var financialLast = financial.last;
                    finanielPieData.data = [{
                            value: ((financialCur.ZC_07_KSF_02_01a_MON || 0) - (financialCur.ZC_07_KSF_02_01c_MON || 0)).toFixed(2),
                            name: '其他用户数'
                        },
                        { value: financialCur.ZC_07_KSF_02_01c_MON || 0, name: '账单用户数' }
                    ];
                    finanielStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [financialLast.ZC_07_KSF_02_01a_MON || 0, financialLast.ZC_07_KSF_02_01c_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [financialCur.ZC_07_KSF_02_01a_MON || 0, financialCur.ZC_07_KSF_02_01c_MON || 0]
                    }];
                    finaniel2PieData.secondData = [
                        { value: financialCur.ZC_Prov_007 || 0, name: '开机工单量' },
                        { value: financialCur.ZC_Prov_012 || 0, name: '停机工单量' }
                    ];
                    finaniel2PieData.data = [{ value: ((financialCur.ZC_Prov_007 || 0) + (financialCur.ZC_Prov_012 || 0)).toFixed(2), name: '停开机工单量' }, {
                        value: ((financialCur.ZC_Prov_001 || 0) - (financialCur.ZC_Prov_007 || 0) - (financialCur.ZC_Prov_012 || 0)).toFixed(2),
                        name: '其他工单量'
                    }];
                    finaniel2StickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [financialLast.ZC_Prov_001 || 0, financialLast.ZC_Prov_007 || 0, financialLast.ZC_Prov_012 || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [financialCur.ZC_Prov_001 || 0, financialCur.ZC_Prov_007 || 0, financialCur.ZC_Prov_012 || 0]
                    }];
                }

                chartData.push(operatePieData);
                chartData.push(operateStickData);
                chartData.push(billPieData);
                chartData.push(billStickData1);
                chartData.push(billStickData2);
                chartData.push(finanielPieData);
                chartData.push(finanielStickData);
                chartData.push(finaniel2PieData);
                chartData.push(finaniel2StickData);
            } else if (elmId == 'interrupt-business-content') {
                var provJson = [{ "prov": "北京" }, { "prov": "广东" }, { "prov": "上海" }, { "prov": "天津" }, { "prov": "重庆" }, { "prov": "辽宁" }, { "prov": "江苏" }, { "prov": "湖北" }, { "prov": "四川" }, { "prov": "陕西" }, { "prov": "河北" }, { "prov": "山西" }, { "prov": "河南" }, { "prov": "吉林" }, { "prov": "黑龙江" }, { "prov": "内蒙" }, { "prov": "山东" }, { "prov": "安徽" }, { "prov": "浙江" }, { "prov": "福建" }, { "prov": "湖南" }, { "prov": "广西" }, { "prov": "江西" }, { "prov": "贵州" }, { "prov": "云南" }, { "prov": "西藏" }, { "prov": "海南" }, { "prov": "甘肃" }, { "prov": "宁夏" }, { "prov": "青海" }, { "prov": "新疆" }]; // 省份数组
                var interlevelStickData = {},
                    intercauseStickData = {},
                    intertimeStickData = {},
                    interinreasonStickData = {},
                    interinchannelStickData = {};
                interlevelStickData.data = [];
                interlevelStickData.seriesData = [];
                intercauseStickData.data = [];
                intercauseStickData.seriesData = [];
                intertimeStickData.data = [];
                intertimeStickData.seriesData = [];
                interinreasonStickData.data = [];
                interinreasonStickData.seriesData = [];
                interinchannelStickData.data = [];
                interinchannelStickData.seriesData = [];

                var interlevelPieData = {},
                    intercausePieData = {},
                    intertimePieData = {},
                    interinreasonPieData = {},
                    interinchannelPieData = {};

                if (data.bar.outChannel.length == 0 && data.bar.outGrade.length == 0 && data.bar.outReason.length == 0) {
                    monthyDataService.intteruptOutShow = false;
                } else {
                    monthyDataService.intteruptOutShow = true;
                };
                var fucData = parseInterrupt(data);
                var funcObj = {};
                funcObj.provJson = provJson;

                if (angular.isDefined(fucData.PieOutGrade)) {
                    interlevelPieData = fucData.PieOutGrade;
                }
                if (angular.isDefined(fucData.PieOutChannel)) {
                    intertimePieData = fucData.PieOutChannel;
                }
                if (angular.isDefined(fucData.PieOutReason)) {
                    intercausePieData = fucData.PieOutReason;
                }
                if (angular.isDefined(fucData.PieInReason)) {
                    interinreasonPieData = fucData.PieInReason;
                }
                if (angular.isDefined(fucData.PieInChannel)) {
                    interinchannelPieData = fucData.PieInChannel;
                }

                funcObj.barData = fucData.barInChannel;
                generateInterruptChartData(funcObj, interinchannelStickData);
                funcObj.barData = fucData.barOutGrade;
                generateInterruptChartData(funcObj, interlevelStickData);
                funcObj.barData = fucData.barOutReason;
                generateInterruptChartData(funcObj, intercauseStickData);
                funcObj.barData = fucData.barOutChannel;
                generateInterruptChartData(funcObj, intertimeStickData);
                funcObj.barData = fucData.barInReason;
                generateInterruptChartData(funcObj, interinreasonStickData);

                chartData.push(interlevelPieData);
                chartData.push(interlevelStickData);
                chartData.push(intercausePieData);
                chartData.push(intercauseStickData);
                chartData.push(intertimePieData);
                chartData.push(intertimeStickData);
                chartData.push(interinreasonPieData);
                chartData.push(interinreasonStickData);
                chartData.push(interinchannelPieData);
                chartData.push(interinchannelStickData);
            } else if (elmId == 'client-sense-content') {
                var mainBussinessData = {},
                    realTimeBillData = {},
                    t_realTimeBillData = {},
                    billData = {},
                    t_billData = {},
                    infoQuery = {},
                    t_infoQuery = {},
                    paymentBussiness = {},
                    t_paymentBussiness = {},
                    infoChange = {},
                    t_infoChange = {},
                    billDetailData = {},
                    t_billDetailData = {};
                mainBussinessData.data = ['实体厅', '网厅'];
                realTimeBillData.data = ['实体厅', '网厅'];
                billData.data = ['实体厅', '网厅'];
                billDetailData.data = ['实体厅', '网厅'];
                infoQuery.data = ['实体厅', '网厅'];
                paymentBussiness.data = ['实体厅'];
                infoChange.data = ['实体厅'];
                t_realTimeBillData.data = ['实体厅', '网厅'];
                t_billData.data = ['实体厅', '网厅'];
                t_billDetailData.data = ['实体厅', '网厅'];
                t_infoQuery.data = ['实体厅', '网厅'];
                t_paymentBussiness.data = ['实体厅'];
                t_infoChange.data = ['实体厅'];
                //这里一个for循环，抓3个排名最前的数据

                if (angular.isDefined(data.main)) {
                    mainBussinessData.legendData = ['上期', '本期'];
                    mainBussinessData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.main.usabilityLastForST_main || 0, data.main.usabilityLastForWT_main || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.main.usabilityCurForST_main || 0, data.main.usabilityCurForWT_main || 0]
                    }];
                }
                if (angular.isDefined(data.orther.usabilityLastForST) && angular.isDefined(data.orther.usabilityLastForWT) && angular.isDefined(data.orther.usabilityCurForWT) && angular.isDefined(data.orther.usabilityCurForST)) {
                    realTimeBillData.legendData = ['上期', '本期'];
                    realTimeBillData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.usabilityLastForST['实时话费查询'] || 0, data.orther.usabilityLastForWT['实时话费查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.usabilityCurForST['实时话费查询'] || 0, data.orther.usabilityCurForWT['实时话费查询'] || 0]
                    }];
                    t_realTimeBillData.legendData = ['上期', '本期'];
                    t_realTimeBillData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.capabilityLastForST['实时话费查询'] || 0, data.orther.capabilityLastForWT['实时话费查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.capabilityCurForST['实时话费查询'] || 0, data.orther.capabilityCurForWT['实时话费查询'] || 0]
                    }];
                    billData.legendData = ['上期', '本期'];
                    billData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.usabilityLastForST['账单查询'] || 0, data.orther.usabilityLastForWT['账单查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.usabilityCurForST['账单查询'] || 0, data.orther.usabilityCurForWT['账单查询'] || 0]
                    }];
                    t_billData.legendData = ['上期', '本期'];
                    t_billData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.capabilityLastForST['账单查询'] || 0, data.orther.capabilityLastForWT['账单查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.capabilityCurForST['账单查询'] || 0, data.orther.capabilityCurForWT['账单查询'] || 0]
                    }];
                    billDetailData.legendData = ['上期', '本期'];
                    billDetailData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.usabilityLastForST['详单查询'] || 0, data.orther.usabilityLastForWT['详单查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.usabilityCurForST['详单查询'] || 0, data.orther.usabilityCurForWT['详单查询'] || 0]
                    }];
                    t_billDetailData.legendData = ['上期', '本期'];
                    t_billDetailData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.orther.capabilityLastForST['详单查询'] || 0, data.orther.capabilityLastForWT['详单查询'] || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.orther.capabilityCurForST['详单查询'] || 0, data.orther.capabilityCurForWT['详单查询'] || 0]
                    }];
                    paymentBussiness.legendData = ['上期', '本期'];
                    paymentBussiness.series = [{ name: '上期', type: 'bar', data: [data.orther.usabilityLastForST['缴费'] || 0] },
                        { name: '本期', type: 'bar', data: [data.orther.usabilityCurForST['缴费'] || 0] }
                    ];
                    t_paymentBussiness.legendData = ['上期', '本期'];
                    t_paymentBussiness.series = [{ name: '上期', type: 'bar', data: [data.orther.capabilityLastForST['缴费'] || 0] },
                        { name: '本期', type: 'bar', data: [data.orther.capabilityCurForST['缴费'] || 0] }
                    ];
                }

                if (angular.isDefined(data.infoQuery)) {
                    infoQuery.legendData = ['上期', '本期'];
                    infoQuery.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.infoQuery.usabilityLastForST_infoQuery || 0, data.infoQuery.usabilityLastForWT_infoQuery || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.infoQuery.usabilityCurForST_infoQuery || 0, data.infoQuery.usabilityCurForWT_infoQuery || 0]
                    }];
                    t_infoQuery.legendData = ['上期', '本期'];
                    t_infoQuery.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.infoQuery.capabilityLastForST_infoQuery || 0, data.infoQuery.capabilityLastForWT_infoQuery || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.infoQuery.capabilityCurForST_infoQuery || 0, data.infoQuery.capabilityCurForWT_infoQuery || 0]
                    }];
                }

                if (angular.isDefined(data.infoChange)) {
                    infoChange.legendData = ['上期', '本期'];
                    infoChange.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.infoChange.usabilityLastForST_infoChange || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.infoChange.usabilityCurForST_infoChange || 0]
                    }];
                    t_infoChange.legendData = ['上期', '本期'];
                    t_infoChange.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.infoChange.capabilityLastForST_infoChange || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.infoChange.capabilityCurForST_infoChange || 0]
                    }];
                }
                chartData.push(mainBussinessData);
                chartData.push(billData);
                chartData.push(t_billData);
                chartData.push(realTimeBillData);
                chartData.push(t_realTimeBillData);
                chartData.push(billDetailData);
                chartData.push(t_billDetailData);
                chartData.push(infoQuery);
                chartData.push(t_infoQuery);
                chartData.push(paymentBussiness);
                chartData.push(t_paymentBussiness);
                chartData.push(infoChange);
                chartData.push(t_infoChange);
            } else if (elmId == 'business-operate-content') {
                var fiveStickData = {},
                    tenStickData = {},
                    qianfeiStickData = {},
                    gprsStickData = {},
                    daozhangStickData = {},
                    remindPayStickData = {},
                    remindBankStickData = {},
                    remindHlrStickData = {},
                    remindKefuStickData = {},
                    remindMsnStickData = {},
                    remindOnlineStickData = {},
                    dealtimeHuafeiStickData = {},
                    dealtimeKaijiStickData = {},
                    dealtimeTingjiStickData = {},
                    dealtimeGfKaijiStickData = {},
                    dealtimeGfTingjiStickData = {};

                //如果是客户感知
                fiveStickData.data = ['5分钟缴费开机及时率'];
                fiveStickData.legendData = ['上期', '本期'];
                tenStickData.data = ['10分钟缴费开机延迟率'];
                tenStickData.legendData = ['上期', '本期'];
                qianfeiStickData.data = ['欠费停机前短信提醒'];
                qianfeiStickData.legendData = ['上期', '本期'];
                gprsStickData.data = ['GPRS流量佣金提醒'];
                gprsStickData.legendData = ['上期', '本期'];
                daozhangStickData.data = ['话费汇款到账提醒'];
                daozhangStickData.legendData = ['上期', '本期'];
                remindPayStickData.data = ['充值业务'];
                remindPayStickData.legendData = ['上期', '本期'];
                remindBankStickData.data = ['银行业务'];
                remindBankStickData.legendData = ['上期', '本期'];
                remindHlrStickData.data = ['HLR业务'];
                remindHlrStickData.legendData = ['上期', '本期'];
                remindKefuStickData.data = ['客服业务'];
                remindKefuStickData.legendData = ['上期', '本期'];
                remindMsnStickData.data = ['短厅'];
                remindMsnStickData.legendData = ['上期', '本期'];
                remindOnlineStickData.data = ['网厅'];
                remindOnlineStickData.legendData = ['上期', '本期'];
                dealtimeHuafeiStickData.data = ['话单计费处理平均时长'];
                dealtimeHuafeiStickData.legendData = ['上期', '本期'];
                dealtimeKaijiStickData.data = ['日常开机工单处理时长'];
                dealtimeKaijiStickData.legendData = ['上期', '本期'];
                dealtimeTingjiStickData.data = ['日常停机工单处理时长'];
                dealtimeTingjiStickData.legendData = ['上期', '本期'];
                dealtimeGfKaijiStickData.data = ['业务高峰期开机工单处理时长'];
                dealtimeGfKaijiStickData.legendData = ['上期', '本期'];
                dealtimeGfTingjiStickData.data = ['业务高峰期停机工单处理时长'];
                dealtimeGfTingjiStickData.legendData = ['上期', '本期'];

                if (angular.isDefined(data.customer.cur) && angular.isDefined(data.customer.last)) {
                    fiveStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_03_KSF_02_01c_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_03_KSF_02_01c_MON || 0]
                    }];
                    tenStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_03_KSF_02_01e_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_03_KSF_02_01e_MON || 0]
                    }];
                    qianfeiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_03_KSF_01_03a_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_03_KSF_01_03a_MON || 0]
                    }];
                    gprsStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_03_KSF_01_13_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_03_KSF_01_13_MON || 0]
                    }];
                    daozhangStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_03_KSF_01_08_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_03_KSF_01_08_MON || 0]
                    }];
                    remindPayStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01a_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01a_MON || 0]
                    }];
                    remindBankStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01b_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01b_MON || 0]
                    }];
                    remindHlrStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01e_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01e_MON || 0]
                    }];
                    remindKefuStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01f_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01f_MON || 0]
                    }];
                    remindMsnStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01c_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01c_MON || 0]
                    }];
                    remindOnlineStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.ZC_04_KSF_01_01d_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.ZC_04_KSF_01_01d_MON || 0]
                    }];
                    dealtimeHuafeiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.customer.last.MO_04_KSF_02_08_01_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.customer.cur.MO_04_KSF_02_08_01_MON || 0]
                    }];
                }
                //如果是系统运营
                if (angular.isDefined(data.system)) {
                    dealtimeKaijiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.system.last.ZC_04_KSF_02_01_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.system.cur.ZC_04_KSF_02_01_MON || 0]
                    }];
                    dealtimeTingjiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.system.last.ZC_04_KSF_02_03_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.system.cur.ZC_04_KSF_02_03_MON || 0]
                    }];
                    dealtimeGfKaijiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.system.last.ZC_04_KSF_02_02_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.system.cur.ZC_04_KSF_02_02_MON || 0]
                    }];
                    dealtimeGfTingjiStickData.series = [{
                        name: '上期',
                        type: 'bar',
                        data: [data.system.last.ZC_04_KSF_02_04_MON || 0]
                    }, {
                        name: '本期',
                        type: 'bar',
                        data: [data.system.cur.ZC_04_KSF_02_04_MON || 0]
                    }];
                }
                chartData.push(fiveStickData);
                chartData.push(tenStickData);
                chartData.push(qianfeiStickData);
                chartData.push(gprsStickData);
                chartData.push(daozhangStickData);
                chartData.push(remindPayStickData);
                chartData.push(remindBankStickData);
                chartData.push(remindHlrStickData);
                chartData.push(remindKefuStickData);
                chartData.push(remindMsnStickData);
                chartData.push(remindOnlineStickData);
                chartData.push(dealtimeHuafeiStickData);
                chartData.push(dealtimeKaijiStickData);
                chartData.push(dealtimeTingjiStickData);
                chartData.push(dealtimeGfKaijiStickData);
                chartData.push(dealtimeGfTingjiStickData);
            } else if (elmId === 'system-operate-content') {
                var dbCapStickData = {},
                    hostCapStickData = {};
                hostCapStickData.data = ['主机可用性'];
                //应该可以根据KEY值遍历
                if (angular.isDefined(data.cur.PM_DM_HostStatus) || angular.isDefined(data.last.PM_DM_HostStatus)) {
                    hostCapStickData.legendData = ['上期', '本期'];
                    hostCapStickData.series = [{ name: '上期', type: 'bar', data: [data.last.PM_DM_HostStatus || 0] },
                        { name: '本期', type: 'bar', data: [data.cur.PM_DM_HostStatus || 0] }
                    ];
                }
                dbCapStickData.data = ['数据库可用性'];
                //应该可以根据KEY值遍历
                if (angular.isDefined(data.cur.PM_DM_DbStatus) || angular.isDefined(data.last.PM_DM_DbStatus)) {
                    dbCapStickData.legendData = ['上期', '本期'];
                    dbCapStickData.series = [{ name: '上期', type: 'bar', data: [data.last.PM_DM_DbStatus || 0] },
                        { name: '本期', type: 'bar', data: [data.cur.PM_DM_DbStatus || 0] }
                    ];
                }
                chartData.push(hostCapStickData);
                chartData.push(dbCapStickData);
            } else if (elmId === 'customer-complaint-content') {
                var compaintCountStickData = {};
                var bossCompaintSum = {};
                var compaintDealData = {};
                var compaintRecallData = {};
                var mainPiontData = {};
                var mainReasonData = {};
                bossCompaintSum.data = ['业务支撑网投诉量'];
                compaintCountStickData.data = ['万用户投诉率'];
                compaintDealData.data = ['客户投诉解决平均时长'];
                compaintRecallData.data = ['客户投诉回复及时率'];
                if (angular.isDefined(data.compaint.curCompaintCount) || angular.isDefined(data.compaint.lastCompaintCount)) {
                    bossCompaintSum.legendData = ['上期', '本期'];
                    bossCompaintSum.series = [{ name: '上期', type: 'bar', data: [data.compaint.lastCompaintCount || 0] },
                        { name: '本期', type: 'bar', data: [data.compaint.curCompaintCount || 0] }

                    ];
                    if (angular.isDefined(angular.isDefined(data.boss.curBossSum) || angular.isDefined(data.boss.lastBossSum))) {
                        compaintCountStickData.legendData = ['上期', '本期'];
                        compaintCountStickData.series = [{
                            name: '上期',
                            type: 'bar',
                            data: [((data.compaint.lastCompaintCount / data.boss.lastBossSum * 10000).toFixed(2)) || 0]
                        }, {
                            name: '本期',
                            type: 'bar',
                            data: [((data.compaint.curCompaintCount / data.boss.curBossSum * 10000).toFixed(2)) || 0]
                        }];
                        if (data.boss.lastBossSum == 0) {
                            compaintCountStickData.series[0].data[0] = 0;
                        }
                        if (data.boss.curBossSum == 0) {
                            compaintCountStickData.series[1].data[0] = 0;
                        }
                    }
                }
                if (angular.isDefined(data.recalltime) && (angular.isDefined(data.recalltime.cur) || angular.isDefined(data.recalltime.last))) {
                    compaintDealData.legendData = ['上期', '本期'];
                    compaintDealData.series = [
                        { name: '上期', type: 'bar', data: [data.recalltime.last || 0] }, {
                            name: '本期',
                            type: 'bar',
                            data: [data.recalltime.cur || 0]
                        }
                    ];
                }
                if (angular.isDefined(data.recallpercent) && (angular.isDefined(data.recallpercent.cur) || angular.isDefined(data.recallpercent.last))) {
                    compaintRecallData.legendData = ['上期', '本期'];
                    compaintRecallData.series = [
                        { name: '上期', type: 'bar', data: [data.recallpercent.last || 0] }, {
                            name: '本期',
                            type: 'bar',
                            data: [data.recallpercent.cur || 0]
                        }
                    ];
                }
                if (angular.isDefined(data.reason.cur)) {
                    mainReasonData.name = '主要责任原因';
                    mainReasonData.data = [];
                    var arr = sortLargeObject(data.reason.cur);
                    if (arr.length === 0) {} else if (arr.length < 3 && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            var item = {};
                            item.value = arr[i].value || 0;
                            item.name = arr[i].key;
                            mainReasonData.data.push(item);
                        }
                    } else {
                        var other = { key: '其他', value: 0 };
                        for (var i = 3; i < arr.length; i++) {
                            other.value += arr[i].value;
                        }
                        mainReasonData.data = [{ value: arr[0].value || 0, name: arr[0].key },
                            { value: arr[1].value || 0, name: arr[1].key },
                            { value: arr[2].value || 0, name: arr[2].key },
                            { value: arr[3].value || 0, name: arr[3].key },
                            { value: other.value || 0, name: other.key }
                        ];
                    }
                }
                mainPiontData.name = '主要焦点投诉';
                if (angular.isDefined(data.top.curPointTop4)) {
                    mainPiontData.data = [];
                    var sum = 0;
                    for (var p in data.top.curPointTop4) {
                        mainPiontData.data.push({ value: data.top.curPointTop4[p] || 0, name: p });
                        sum += data.top.curPointTop4[p] || 0;
                    }
                    mainPiontData.data.push({ value: data.top.curPointCount - sum, name: '其他' });
                }
                chartData.push(bossCompaintSum);
                chartData.push(compaintCountStickData);
                chartData.push(compaintDealData);
                chartData.push(compaintRecallData);
                chartData.push(mainPiontData);
                chartData.push(mainReasonData);
            } else if (elmId == 'point-complaint-content') {
                switch (data.requestCode) {
                    case requestCode.COMPLAINT_GPRS_BYMONTH:
                    case requestCode.COMPLAINT_4G_BYMONTH:
                    case requestCode.COMPLAINT_CHARGE_BYMONTH:
                        chartData.push(complaintByMonthParseFunc(data.data));
                        break;
                    case requestCode.COMPLAINT_GPRS_DISTRIBUTION:
                    case requestCode.COMPLAINT_4G_DISTRIBUTION:
                    case requestCode.COMPLAINT_CHARGE_DISTRIBUTION:
                        var config = {
                                value: 'cnt',
                                name: 'class3'
                            },
                            result;
                        result = pieChartsParseFunc(config, data.data);
                        result.name = '';
                        chartData.push(result);
                        break;
                    case requestCode.COMPLAINT_GPRS_DISTRIBUTIONBYREASON:
                    case requestCode.COMPLAINT_4G_DISTRIBUTIONBYREASON:
                    case requestCode.COMPLAINT_CHARGE_DISTRIBUTIONBYREASON:
                        var config = {
                                value: 'cnt',
                                name: 'reason'
                            },
                            result;
                        getOtherDataOfComplanit(data.data);
                        result = pieChartsParseFunc(config, data.data);
                        result.name = '';
                        chartData.push(result);
                        break;
                    default:
                        break;
                }
                var result = {
                    'requestCode': data.requestCode,
                    'chartData': chartData
                };
                return result;
            }
            return chartData;
        };

        function getOtherDataOfComplanit(data) {
            var len = data.length;
            if (len == 0) {
                return;
            }
            if (angular.isDefined(data[len - 1].all)) {
                var all = data[len - 1].all;
                for (var i = 0; i < (len - 1); i++) {
                    all -= data[i].cnt;
                }
            }
            data[len - 1] = {
                cnt: all,
                reason: '其他'
            }
        }

        function pieChartsParseFunc(config, data) {
            var result = {};
            var seriesData = [],
                legendArr = [];
            for (var i = 0; i < data.length; i++) {
                var seriesItem = {};
                seriesItem.value = data[i][config.value];
                seriesItem.name = data[i][config.name];
                seriesData.push(angular.copy(seriesItem));
                // legendArr.push[data[config.name]];
            };
            result.data = seriesData;
            // result.legendArr = legendArr;
            return result;
        }

        function complaintByMonthParseFunc(data) {
            var complaintByMonth = {};
            var barData = data.bar,
                lineData = data.line;
            var series = [],
                legendArr = [],
                xAxisArr = [];
            var seriesItem; //
            for (var i = 0; i < barData.length; i++) {
                if (i == 0 || ((legendArr.length > 0) && (legendArr[legendArr.length - 1] != barData[i].class3))) {
                    legendArr.push(barData[i].class3);
                    if (i != 0) {
                        series.push(angular.copy(seriesItem));
                    }
                    seriesItem = {
                        name: barData[i].class3,
                        type: 'bar',
                        stack: '总量',
                        data: []
                    };
                }
                seriesItem.data.push(barData[i].cnt);
            }
            series.push(angular.copy(seriesItem));
            if (lineData.length > 0) { //获取同比数组并放入series
                seriesItem = {
                    name: '上一年同期投诉量',
                    type: 'line',
                    data: []
                };
                if (series.length > 0) {
                    var item = series[0];
                    if (item.data.length != 0) {
                        var len = item.data.length;
                        seriesItem.data = new Array(len);
                        for (var i = 0; i < len; i++) {
                            //获取横坐标数组 --begin
                            xAxisArr.push(barData[i].month);
                            //获取横坐标数组 --end
                            if (i < lineData.length) {
                                seriesItem.data[len - i - 1] = lineData[lineData.length - i - 1].cnt;
                            } else {
                                seriesItem.data[len - i - 1] = undefined;
                            };
                        }
                    }
                }
                legendArr.push('上一年同期投诉量');
                series.push(angular.copy(seriesItem));
            }
            complaintByMonth.legendData = legendArr;
            complaintByMonth.data = xAxisArr;
            complaintByMonth.series = series;
            return complaintByMonth;
        }

        function generateInterruptChartData(obj, toData) {
            toData.legendData = [];
            toData.series = [];
            if (angular.isUndefined(obj) || angular.isUndefined(obj.barData)) {
                return;
            }
            //又中断的省才能加入横坐标
            for (var i = 0; i < obj.barData.provOfInterr.length; i++) {
                toData.data.push(obj.provJson[obj.barData.provOfInterr[i]].prov);
            }
            console.log(toData.data);
            for (var i = 0; i < obj.barData.rs.length; i++) {
                var item = {};
                item.name = obj.barData.rs[i].name;
                item.type = 'bar';
                item.data = obj.barData.rs[i].data;
                toData.series.push(item);
                toData.legendData.push(item.name);
            }
        }

        function parseInterrupt(obj) {
            var chartData = {};
            var index = {
                "100": 0,
                "200": 1,
                "210": 2,
                "220": 3,
                "230": 4,
                "240": 5,
                "250": 6,
                "270": 7,
                "280": 8,
                "290": 9,
                "311": 10,
                "351": 11,
                "371": 12,
                "431": 13,
                "451": 14,
                "471": 15,
                "531": 16,
                "551": 17,
                "571": 18,
                "591": 19,
                "731": 20,
                "771": 21,
                "791": 22,
                "851": 23,
                "871": 24,
                "891": 25,
                "898": 26,
                "931": 27,
                "951": 28,
                "971": 29,
                "991": 30
            };
            if (angular.isDefined(obj.bar)) {
                if (angular.isDefined(obj.bar.outReason)) {
                    chartData.barOutReason = generateInterruptArray(index, obj.bar.outReason);
                }
                if (angular.isDefined(obj.bar.outChannel)) {
                    chartData.barOutChannel = generateInterruptArray(index, obj.bar.outChannel);
                }
                if (angular.isDefined(obj.bar.outGrade)) {
                    chartData.barOutGrade = generateInterruptArray(index, obj.bar.outGrade);
                }
                if (angular.isDefined(obj.bar.inChannel)) {
                    chartData.barInChannel = generateInterruptArray(index, obj.bar.inChannel);
                }
                if (angular.isDefined(obj.bar.inReason)) {
                    chartData.barInReason = generateInterruptArray(index, obj.bar.inReason);
                }
            }
            if (angular.isDefined(obj.pie)) {
                if (angular.isDefined(obj.pie.outReason)) {
                    chartData.PieOutReason = generateInterruptPieData(obj.pie.outReason);
                }
                if (angular.isDefined(obj.pie.outChannel)) {
                    chartData.PieOutChannel = generateInterruptPieData(obj.pie.outChannel);
                }
                if (angular.isDefined(obj.pie.outGrade)) {
                    chartData.PieOutGrade = generateInterruptPieData(obj.pie.outGrade);
                }
                if (angular.isDefined(obj.pie.inChannel)) {
                    chartData.PieInChannel = generateInterruptPieData(obj.pie.inChannel);
                }
                if (angular.isDefined(obj.pie.inReason)) {
                    chartData.PieInReason = generateInterruptPieData(obj.pie.inReason);
                }
            }
            return chartData;
        }

        function generateInterruptPieData(obj) {
            var rs = {};
            rs.name = '';
            rs.data = [];
            for (var i = 0; i < obj.length; i++) {
                var item = {};
                if (angular.isDefined(obj[i].k)) {
                    item.name = obj[i].k;
                } else {
                    item.name = '';
                }
                item.value = obj[i].v || 0;
                rs.data.push(item);
            }
            return rs;
        }

        function generateInterruptArray(index, obj) {
            if (obj.length == 0) {
                return;
            }
            var rs = new Array(); // 结果数组，结构如下：[{name:'原因',data:[省A, 省B]}]
            for (var i = 0; i < obj.length; i++) { // start -0
                if (rs.length == 0) {
                    rs[0] = {};
                    rs[0].data = new Array();
                    for (var m = 0; m < 31; m++) {
                        rs[0].data[m] = 0;
                    }
                    rs[0].name = obj[i].k
                }
                var flag = true;
                for (var j = 0; j < rs.length; j++) { // 加入原因,start-1
                    // console.log(rs[j].name + " : " + obj[i].k);
                    if (rs[j].name == obj[i].k) { //  原因重复
                        rs[j].data[index[obj[i].provKey]] = obj[i].v;
                        flag = false;
                    }
                } // end-1
                if (flag) { // 原因不重复，加入原因数组
                    var size = rs.length;
                    rs[size] = {};
                    rs[size].data = new Array();
                    for (var m = 0; m < 31; m++) {
                        rs[size].data[m] = 0;
                    }
                    rs[size].name = obj[i].k;
                    rs[size].data[index[obj[i].provKey]] = obj[i].v;
                }
            } // end -0
            var provKey = []; //没有中断的省份
            var provOfInterr = [];
            for (var m = 0; m < 31; m++) {
                var sum = 0;
                for (var i = 0; i < rs.length; i++) {
                    sum += rs[i].data[m];
                }
                if (sum == 0) {
                    provKey.push(m);
                } else {
                    provOfInterr.push(m);
                }
            }
            for (var i = 0; i < provKey.length; i++) {
                for (var j = 0; j < rs.length; j++) {
                    rs[j].data.splice(provKey[provKey.length - i - 1], 1);
                }
            }
            var result = {};
            result.provOfInterr = provOfInterr;
            result.rs = rs;
            return result;
        }

        function sortLargeObject(data) {
            var arr = [];
            for (var p in data) {
                var item = {};
                item.key = p;
                item.value = data[p];
                arr.push(item);
            };
            arr.sort(function(a, b) {
                return b.value - a.value;
            })
            return arr;
        }

        monthyDataService.isMonthyPosted = function(month) {
            var d = $q.defer();
            $ionicLoading.show();
            monthyService.isMonthyPosted(month).then(function(data) {
                d.resolve(data);
                $ionicLoading.hide();
            }, function(err) {
                d.reject(err);
            });
            return d.promise;
        }

        monthyDataService.getLatestMonthy = function() {
            var d = $q.defer();
            $ionicLoading.show();
            monthyService.getLatestMonthy().then(function(data) {
                d.resolve(data);
                $ionicLoading.hide();
            }, function(err) {
                d.reject(err);
                $ionicLoading.hide();
                $ionicLoading.show({ template: '请求最新月份失败', noBackdrop: true, duration: 2000 });
            });
            return d.promise;
        }

        monthyDataService.getMonthyData = function(month, elmId) {
            var d = $q.defer();
            for (var i = 0; i < monthyParseData.length; i++) {
                if (monthyParseData[i].elmId === elmId) {
                    if (elmId === 'point-complaint-content') {
                        for (var index in monthyParseData[7].routes) { //发送N个请求
                            var config = monthyParseData[7].routes[index];
                            if (angular.isUndefined(monthyDataService.resultMap[elmId])) {
                                monthyDataService.resultMap[elmId] = {};
                            };
                            //如果请求Map里该请求有成功请求过（即成功返回了数据），进入下一轮循环
                            if (angular.isDefined(monthyDataService.resultMap[elmId][config.requestCodeName]) && monthyDataService.resultMap[elmId][config.requestCodeName] == true) {
                                continue;
                            };
                            $ionicLoading.show();
                            monthyService.getMonthyDataByRequestCode(requestCode[config.requestCodeName], config.requestCodeName, config.route, month).then(function(data) {
                                $ionicLoading.hide();
                                monthyDataService.resultMap[elmId][data.requestCodeName] = true;
                                echartsService.refreshDiv(elmId, monthyDataService.parseChartData(elmId, data));
                                // if (data.requestCode == 39) {
                                  d.notify(data);
                                // };
                            }, function(err) {
                                $ionicLoading.hide();
                                var error = {};
                                error.elmId = elmId;
                                error.requestCode = requestCode[err.requestCodeName];
                                monthyDataService.resultMap[elmId][err.requestCodeName] = false;
                                d.reject(error);
                            });
                        }
                    } else {
                        var key = monthyParseData[i].dataArr;
                        console.log(key);
                        if (monthyDataService[key] != null) {
                            d.resolve(monthyDataService.parseChartData(elmId, monthyDataService[monthyParseData[i].dataArr]));
                        } else {
                            $ionicLoading.show();
                            monthyService.getDescData(monthyParseData[i].route, month).then(function(data) {
                                $ionicLoading.hide();
                                monthyDataService[key] = data;
                                if (elmId === '') {
                                    d.resolve(data);
                                } else {
                                    d.resolve(monthyDataService.parseChartData(elmId, data));
                                }
                            }, function(err) {
                                $ionicLoading.hide();
                                $ionicLoading.show({ template: '请求数据失败', noBackdrop: true, duration: 2000 });
                                d.reject(err);
                            });
                        }
                    }
                }
            }
            return d.promise;
        };
        return monthyDataService;
    }])

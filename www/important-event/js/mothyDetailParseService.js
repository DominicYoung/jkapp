'use strict';
angular.module('impApp')
    .factory('monthyDetailParseService', ["$q", 'provkey', 'parseKey', 'DetailTitleKey', 'echartsService', function($q, provkey, parseKey, DetailTitleKey, echartsService) {
        var monthyDetailParseService = {};

        monthyDetailParseService.parseDetailComplaint = function(key, data) {
            var chartData = {},
                stickConfig = {};
            // var config = {
            //     value: 'cnt',
            //     name: 'dept',
            //     legend: ['投诉量'],
            //     doubleYaxis: true
            // };
            switch (key) {
                case 'COMPLAINT_COST_DETAIL':
                case 'COMPLAINT_4G_DETAIL':
                case 'COMPLAINT_GPRS_DETAIL':
                    stickConfig = {
                            chartId: 'comPlaintDetail-chart',
                            formatter: 'value',
                            legendTop: '3%',
                            gridTop: '13%',
                            gridLeft: '-13%',
                            // gridBottom: '20%',
                            isStack: false,
                            title: '费用类投诉量按月统计',
                            orient: 'vertical'
                        }
                        // getComplaintDetailDate(json());
                    chartData = parseHoriztialChartData(getComplaintDetailDate(data), { subname: 'class5', name: 'class6' });
                    break;
                case 'COMPLAINT_4GBYDEPT_DETAIL':
                case 'COMPLAINT_GPRSBYDEPT_DETAIL':
                case 'COMPLAINT_COSTBYDEPT_DETAIL':
                    stickConfig = {
                        chartId: 'groupByDistribution-chart',
                        formatter: 'value',
                        legendTop: '8%',
                        gridTop: '25%',
                        gridBottom: '20%',
                        isStack: false,
                        title: '费用类投诉量按月统计',
                        isDoubleYaxis: true
                    }
                    chartData = parseChartData({ value: 'cnt', name: 'dept', legend: ['投诉量'], doubleYaxis: true }, data);
                    break;
                case 'COMPLAINT_4GBYDEPTSOURCE_DETAIL':
                case 'COMPLAINT_GPRSBYDEPTSOURCE_DETAIL':
                case 'COMPLAINT_COSTBYDEPTSOURCE_DETAIL':
                    stickConfig = {
                        chartId: 'groupBySource-chart',
                        formatter: 'value',
                        legendTop: '8%',
                        gridTop: '25%',
                        gridBottom: '20%',
                        isStack: true,
                        title: '费用类投诉量按月统计'
                    }
                    chartData = parseHoriztialChartData(data, { subname: 'class3', name: 'dept', isStack: true });
                    break;
                case 'COMPLAINT_4GBYUSER_DETAIL':
                case 'COMPLAINT_GPRSBYUSER_DETAIL':
                case 'COMPLAINT_COSTBYUSER_DETAIL':
                    stickConfig = {
                        chartId: 'groupByUserAndProv-chart',
                        formatter: 'value',
                        legendTop: '8%',
                        gridTop: '25%',
                        gridBottom: '20%',
                        isStack: false,
                        title: '费用类投诉量按月统计',
                        isProv: true
                    }
                    var newData = getBillionPercentOfProv(data);
                    chartData = parseChartData({ value: 'cnt', name: 'provName', legend: ['投诉量'] }, newData);
                    break;
                case 'COMPLAINT_4GBYREASON_DETAIL':
                case 'COMPLAINT_GPRSBYREASON_DETAIL':
                case 'COMPLAINT_COSTBYREASON_DETAIL':
                    stickConfig = {
                        chartId: 'groupByReasonProv-chart',
                        formatter: 'value',
                        legendTop: '8%',
                        gridTop: '25%',
                        gridBottom: '20%',
                        isStack: true,
                        title: '费用类投诉量按月统计',
                        isProv: true
                    }
                    for (var i = 0; i < data.length; i++) {
                        data[i].provName = provkey[data[i].prov_code];
                    }
                    chartData = parseHoriztialChartData(data, { subname: 'reason', name: 'provName', isStack: true });
                    break;
                default:
                    break;
            }
            echartsService.refreshStickChartOption(stickConfig, chartData);
        }

        //投诉各省统计（每百万用户），所以要先算出百万分比
        function getBillionPercentOfProv(data) {
            var result = [];
            for (var i = 0; i < data.boss.length; i++) {
                var item = { cnt: 0, provName: '' };
                item.cnt = (data.cnt[i].cnt / data.boss[i].cnt).toFixed(2);
                item.provName = provkey[data.boss[i].prov_code];
                result.push(item);
            }
            result.sort(function(a, b) {
                return b.cnt - a.cnt;
            });
            return result;
        }

        function getComplaintDetailDate(date) {
            if (date.length <= 1) {
                return date;
            }
            for (var i = 0; i < date.length - 1; i++) {
                for (var j = i + 1; j < date.length; j++) {
                    if (date[i].class6 == date[j].class6) {
                        date[j].class6 = date[j].class4 + '->' + date[j].class6;
                        date[i].class6 = date[i].class4 + '->' + date[i].class6;
                    }
                    if (date[i].class5 == date[j].class5) {
                        date[j].class5 = date[j].class4 + '->' + date[j].class5;
                        date[i].class5 = date[i].class4 + '->' + date[i].class5;
                    }
                }
            }
            return date;
        }

        function parseHoriztialChartData(data, config) {
            var dataByCenter = {},
                legend = [],
                xAxis = [],
                subname = 'subname',
                name = 'name';
            if (angular.isDefined(config)) {
                subname = config.subname;
                name = config.name;
            }
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    legend.push(data[i][subname]);
                } else {
                    if (legend.indexOf(data[i][subname]) < 0) {
                        legend.push(data[i][subname]);
                    }
                }
                if (angular.isDefined(config.isStack)) {
                    if (xAxis.indexOf(data[i][name]) < 0) {
                        xAxis.push(data[i][name]);
                    }
                } else {
                    xAxis.push(data[i][name]);
                }
            }
            var series = new Array(legend.length);
            for (var i = 0; i < series.length; i++) {
                series[i] = {
                    name: legend[i],
                    type: 'bar',
                    data: []
                };
                series[i].data = new Array(xAxis.length);
                for (var j = 0; j < data.length; j++) {
                    if (data[j][subname] == legend[i]) {
                        if (angular.isDefined(config.isStack)) {
                            var index = xAxis.indexOf(data[j][name]);
                            if (index > 0) {
                                series[i].data[index] = data[j].cnt;
                            }
                        } else {
                            series[i].data[j] = data[j].cnt;
                        }
                    }
                }
            }
            dataByCenter.legendData = legend;
            dataByCenter.series = series;
            dataByCenter.data = xAxis;
            // console.log('the result is');
            // console.log(dataByCenter);
            return dataByCenter;
        }

        function parseChartData(config, data) {
            var complaintData = {};
            if (angular.isUndefined(config.isStack)) {
                parseUnStackChartData(config, data, complaintData);
            }
            return complaintData;
        }

        function parseUnStackChartData(config, data, complaintData) {
            //投诉量的各部门分布，因为客户原因数量级特别大，所以单独用一个Y轴
            if (angular.isDefined(config.doubleYaxis)) {
                parseDoubleYaxisChartData(config, data, complaintData);
            } else {
                debugger;
                var series = [],
                    legendArr = [],
                    xAxisArr = [];
                if (angular.isDefined(config.legend)) {
                    legendArr = config.legend;
                }
                for (var i = 0; i < legendArr.length; i++) {
                    var seriesItem = {
                        name: legendArr[i],
                        type: 'bar',
                        data: []
                    };
                    for (var i = 0; i < data.length; i++) {
                        xAxisArr.push(data[i][config.name]);
                        seriesItem.data.push(data[i][config.value]);
                    };
                    series.push(seriesItem);
                };
                complaintData.legendData = legendArr;
                complaintData.data = xAxisArr;
                complaintData.series = series;
                // console.log(complaintData);
            }
        }
        //投诉量的各部门分布，因为客户原因数量级特别大，所以单独用一个Y轴
        function parseDoubleYaxisChartData(config, data, complaintData) {
            var series = [],
                legendArr = [],
                xAxisArr = [];
            if (angular.isDefined(config.legend)) {
                legendArr = angular.copy(config.legend);
            }
            legendArr.push('客户原因');
            for (var i = 0; i < legendArr.length; i++) {
                var seriesItem = {
                    name: legendArr[i],
                    type: 'bar',
                    data: []
                };
                for (var j = 0; j < data.length; j++) {
                    xAxisArr.push(data[j][config.name]);
                    if (data[j][config.name] == legendArr[i] || ((legendArr[i] != '客户原因') && (data[j][config.name] != '客户原因'))) {
                        seriesItem.data.push(data[j][config.value]);
                    } else {
                        seriesItem.data.push(undefined);
                    }
                };
                series.push(seriesItem);
            };
            complaintData.legendData = legendArr;
            complaintData.data = xAxisArr;
            complaintData.series = series;
        }

        monthyDetailParseService.parseDeatil = function(key, data) {

            var chartsParseConfig = parseKey[key];
            var dataByMonth, dataByCenter, dataByProv, leftRaise, rightRaise, leftDrop, rightDrop;
            var chartdata = {};
            if (chartsParseConfig.dataByMonth.visiable) {
                dataByMonth = {};
                dataByMonth.formatter = chartsParseConfig.dataByMonth.formatter;
                dataByMonth.title = chartsParseConfig.dataByMonth.title;
                dataByMonth.legendData = chartsParseConfig.dataByMonth.legend;
            }
            if (angular.isDefined(chartsParseConfig.dataByCenter) && chartsParseConfig.dataByCenter.visiable) {
                dataByCenter = {};
                dataByCenter.formatter = chartsParseConfig.dataByMonth.formatter;
                dataByCenter.title = chartsParseConfig.dataByMonth.title;
            }
            if (chartsParseConfig.dataByProv.visiable) {
                dataByProv = {};
                dataByProv.formatter = chartsParseConfig.dataByProv.formatter;
                dataByProv.title = chartsParseConfig.dataByProv.title;
                dataByProv.legendData = chartsParseConfig.dataByProv.legend;
            }
            if (chartsParseConfig.leftRaise.visiable) {
                leftRaise = {};
                leftRaise.formatter = chartsParseConfig.leftRaise.formatter;
                leftRaise.legendData = chartsParseConfig.leftRaise.legend;
            }
            if (chartsParseConfig.rightRaise.visiable) {
                rightRaise = {};
                rightRaise.formatter = chartsParseConfig.rightRaise.formatter;
                rightRaise.legendData = chartsParseConfig.rightRaise.legend;
            }
            if (chartsParseConfig.leftDrop.visiable) {
                leftDrop = {};
                leftDrop.formatter = chartsParseConfig.leftDrop.formatter;
                leftDrop.legendData = chartsParseConfig.leftDrop.legend;
            }
            if (chartsParseConfig.rightDrop.visiable) {
                rightDrop = {};
                rightDrop.formatter = chartsParseConfig.rightDrop.formatter;
                rightDrop.legendData = chartsParseConfig.rightDrop.legend;
            }

            if (key == 'BearerBusinessDetail') {
                //分了实体厅和网厅
                chartdata.title = '业务承载情况';
                getChartsData(data['groupByMonth']['electronic'], data['groupByMonth']['physical'], dataByMonth, null, false);
                var keyArr = sortLargeObject(data['groupByProv']['electronic']['cur']);
                getChartsData(data['groupByProv']['electronic']['cur'], data['groupByProv']['physical']['cur'], dataByProv, keyArr, true);
                // console.log(data['groupByProv']['electronic']);
                var electronicKeyArr = getSortArr(data['groupByProv']['electronic']);
                var physicalKeyArr = getSortArr(data['groupByProv']['physical']);
                getChartsDataByObj(data['groupByProv']['electronic']['cur'], data['groupByProv']['electronic']['last'], leftRaise, electronicKeyArr[electronicKeyArr.length - 1].key, {
                    category: '电子渠道',
                    raise: true,
                    unit: 'wan'
                });
                getChartsDataByObj(data['groupByProv']['physical']['cur'], data['groupByProv']['physical']['last'], rightRaise, physicalKeyArr[physicalKeyArr.length - 1].key, {
                    category: '实体厅',
                    raise: true,
                    unit: 'wan'
                });
                getChartsDataByObj(data['groupByProv']['electronic']['cur'], data['groupByProv']['electronic']['last'], leftDrop, electronicKeyArr[0].key, {
                    category: '电子渠道',
                    raise: false,
                    unit: 'wan'
                });
                getChartsDataByObj(data['groupByProv']['physical']['cur'], data['groupByProv']['physical']['last'], rightDrop, physicalKeyArr[0].key, {
                    category: '实体厅',
                    raise: false,
                    unit: 'wan'
                });
            } else if (key == 'BillSystemDetail') {
                chartdata.title = '业务承载情况';
                var electronicKeyArr = getSortArr(data['groupByProv']);
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftRaise, electronicKeyArr[electronicKeyArr.length - 1].key, {
                    category: '计费话单量',
                    raise: true,
                    unit: 'wan'
                });
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftDrop, electronicKeyArr[0].key, {
                    category: '计费话单量',
                    raise: false,
                    unit: 'wan'
                });
                getChartsData(data['groupByProv']['cur'], null, dataByProv, sortLargeObject(data['groupByProv']['cur']), true);
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
            } else if (key == 'ComplaintOverall') {
                chartdata.title = '业务支撑网投诉量';
                getChartsData(data['ProvCompaintAndBossCount']['ProvComplainCountByMonth'], null, dataByProv, sortLargeObject(data['ProvCompaintAndBossCount']['ProvComplainCountByMonth']), true);
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
                var descriptionData = {
                    beginStr: '业务支撑网投诉量为',
                    afterStr: ';该业务网厅均值为',
                    units: '件',
                    unitsStr: '件',
                    toFixed: 0
                };
                getDescription(chartdata, dataByMonth, descriptionData);

            } else if (key == 'ComplaintReason') {
                chartdata.title = '投诉主要原因';
                var cnt = [];
                dataByMonth.data = [];
                dataByMonth.xAxis = [];
                dataByMonth.config = {
                    gridBottom: '30%',
                    gridLeft: '17%',
                    rotate: '35'
                };
                for (var i = 0; i < data['getDetailCompaintReasonTop4'].length; i++) {
                    dataByMonth.xAxis.push(data['getDetailCompaintReasonTop4'][i]['reason']);
                    cnt.push(data['getDetailCompaintReasonTop4'][i]['cnt']);
                }
                dataByMonth.data.push(cnt);
                getChartsData(data['groupByProv'], null, dataByProv, sortLargeObject(data['groupByProv']), true);

            } else if (key == 'ComplaintPoint') {
                chartdata.title = '主要焦点投诉';
                var cnt = [];
                dataByMonth.data = [];
                dataByMonth.xAxis = [];
                dataByMonth.config = {
                    gridBottom: '18%'
                };
                for (var i = 0; i < data['DetailMainComplaintcountAll'].length; i++) {
                    dataByMonth.xAxis.push(data['DetailMainComplaintcountAll'][i]['name']);
                    cnt.push(data['DetailMainComplaintcountAll'][i]['cnt']);
                }
                dataByMonth.data.push(cnt);
                getChartsData(data['groupByProv'], null, dataByProv, sortLargeObject(data['groupByProv']), true);
                var legend = [],
                    xAxis = [];
                for (var i = 0; i < data['DetailMainCompaintLevel4To5'].length; i++) {
                    if (i == 0) {
                        legend.push(data['DetailMainCompaintLevel4To5'][i].subname);
                    } else {
                        if (data['DetailMainCompaintLevel4To5'][i].subname != legend[legend.length - 1]) {
                            legend.push(data['DetailMainCompaintLevel4To5'][i].subname);
                        }
                    }
                    xAxis.push(data['DetailMainCompaintLevel4To5'][i].name);
                }
                var series = new Array(legend.length);
                for (var i = 0; i < series.length; i++) {
                    series[i] = new Array(data['DetailMainCompaintLevel4To5'].length);
                    for (var j = 0; j < data['' +
                            'DetailMainCompaintLevel4To5'].length; j++) {
                        if (data['DetailMainCompaintLevel4To5'][j].subname == legend[i]) {
                            series[i][j] = data['DetailMainCompaintLevel4To5'][j].cnt;
                        }
                    }
                }
                dataByCenter.legendData = legend;
                dataByCenter.config = {
                    legendTop: '4%'
                };
                dataByCenter.data = series;
                dataByCenter.xAxis = xAxis;
                // console.log(dataByCenter);
            } else if (key == 'ComplaintTimeAll') {
                chartdata.title = '投诉平均解决时长';
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
                getChartsData(data['groupByProv']['last'], data['groupByProv']['cur'], dataByProv, sortLargeObject(data['groupByProv']['cur']), true);
            } else if (key == 'ComplaintRecallAll') {
                chartdata.title = '投诉回复及时率';
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
                getChartsData(data['groupByProv']['last'], data['groupByProv']['cur'], dataByProv, sortLargeObject(data['groupByProv']['cur']), true);
            } else if (key == 'HostStatus' || key == 'DbStatus') {
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
                getChartsData(data['groupByProv']['last'], data['groupByProv']['cur'], dataByProv, sortLargeObject(data['groupByProv']['cur']), true);
                var curKeyArr = getSortArr(data['groupByProv'], true);
                var category;
                if (key == 'HostStatus') {
                    category = '主机可用性';
                } else {
                    category = '数据库可用性';
                }
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftRaise, curKeyArr[curKeyArr.length - 1].key, {
                    category: category,
                    raise: true,
                    unit: 'percent'
                });
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftDrop, curKeyArr[0].key, {
                    category: category,
                    raise: false,
                    unit: 'percent'
                });
                if (key == 'HostStatus') {
                    chartdata.title = '主机可用性';
                } else {
                    chartdata.title = '数据库可用性';
                }
                var descriptionData = {
                    beginStr: '该指标均值为',
                    afterStr: ';该业务网厅均值为',
                    units: '%',
                    unitsStr: '个百分点',
                    toFixed: 2
                };
                getDescription(chartdata, dataByMonth, descriptionData);
            } else if (key == 'FinancialDetail') {
                chartdata.title = '业务承载情况';
                getChartsData(data['groupByMonth']['user'], data['groupByMonth']['HLR'], dataByMonth, null, false, true);
                var keyArr = sortLargeObject(data['groupByProv']['user']['cur']);
                getChartsData(data['groupByProv']['user']['cur'], data['groupByProv']['HLR']['cur'], dataByProv, keyArr, true, true);
                var electronicKeyArr = getSortArr(data['groupByProv']['user']);
                var physicalKeyArr = getSortArr(data['groupByProv']['HLR']);
                if (electronicKeyArr.length != 0) {
                    getChartsDataByObj(data['groupByProv']['user']['cur'], data['groupByProv']['user']['last'], leftRaise, electronicKeyArr[electronicKeyArr.length - 1].key, {
                        category: '账单用户数',
                        raise: true,
                        unit: 'wan'
                    });
                    getChartsDataByObj(data['groupByProv']['user']['cur'], data['groupByProv']['user']['last'], leftDrop, electronicKeyArr[0].key, {
                        category: '账单用户数',
                        raise: false,
                        unit: 'wan'
                    });
                }
                if (physicalKeyArr.length != 0) {
                    getChartsDataByObj(data['groupByProv']['HLR']['cur'], data['groupByProv']['HLR']['last'], rightRaise, physicalKeyArr[physicalKeyArr.length - 1].key, {
                        category: 'HLR工单量',
                        raise: true,
                        unit: 'billion'
                    });
                    getChartsDataByObj(data['groupByProv']['HLR']['cur'], data['groupByProv']['HLR']['last'], rightDrop, physicalKeyArr[0].key, {
                        category: 'HLR工单量',
                        raise: false,
                        unit: 'billion'
                    });
                }
            } else if (key.substring(key.length - 6, key.length) == 'Detect') {
                if (key.indexOf('Payment') < 0 && key.indexOf('InfoChange') < 0) {
                    getChartsData(data['groupByMonth']['usabilityByMonthForWT'], data['groupByMonth']['usabilityByMonthForST'], dataByMonth, null, false);
                    var keyArr = sortLargeObject(data['groupByProv']['usability_st']['cur']);
                    getChartsData(data['groupByProv']['usability_wt']['cur'], data['groupByProv']['usability_st']['cur'], dataByProv, keyArr, true);
                } else {
                    getChartsData(data['groupByMonth']['usabilityByMonthForST'], null, dataByMonth, null, false);
                    var keyArr = sortLargeObject(data['groupByProv']['usability_st']['cur']);
                    getChartsData(data['groupByProv']['usability_st']['cur'], null, dataByProv, keyArr, true);
                }

                chartdata.title = DetailTitleKey[key];
                var descriptionData = {
                    beginStr: '该业务实体厅均值为',
                    afterStr: ';该业务网厅均值为',
                    units: '%',
                    unitsStr: '个百分点',
                    toFixed: 2
                };
                getDescription(chartdata, dataByMonth, descriptionData);
                var stKeyArr = getSortArr(data['groupByProv']['usability_st'], true);
                if (key.indexOf('Payment') < 0 && key.indexOf('InfoChange') < 0) {
                    var wtKeyArr = getSortArr(data['groupByProv']['usability_wt'], true);
                    getChartsDataByObj(data['groupByProv']['usability_wt']['cur'], data['groupByProv']['usability_wt']['last'], rightRaise, wtKeyArr[wtKeyArr.length - 1].key, {
                        category: '网厅',
                        raise: true,
                        unit: 'percent'
                    });
                    getChartsDataByObj(data['groupByProv']['usability_wt']['cur'], data['groupByProv']['usability_wt']['last'], rightDrop, wtKeyArr[0].key, {
                        category: '网厅',
                        raise: false,
                        unit: 'percent'
                    });
                }
                getChartsDataByObj(data['groupByProv']['usability_st']['cur'], data['groupByProv']['usability_st']['last'], leftRaise, stKeyArr[stKeyArr.length - 1].key, {
                    category: '实厅',
                    raise: true,
                    unit: 'percent'
                });
                getChartsDataByObj(data['groupByProv']['usability_st']['cur'], data['groupByProv']['usability_st']['last'], leftDrop, stKeyArr[0].key, {
                    category: '实厅',
                    raise: false,
                    unit: 'percent'
                });
            } else if (key.substring(key.length - 6, key.length) == 'detect') {
                if (key.indexOf('Payment') < 0 && key.indexOf('InfoChange') < 0) {
                    getChartsData(data['groupByMonth']['capabilityByMonthForWT'], data['groupByMonth']['capabilityByMonthForST'], dataByMonth, null, false);
                    var keyArr = sortLargeObject(data['groupByProv']['capability_st']['cur']);
                    getChartsData(data['groupByProv']['capability_wt']['cur'], data['groupByProv']['capability_st']['cur'], dataByProv, keyArr, true);
                } else {
                    getChartsData(data['groupByMonth']['capabilityByMonthForST'], null, dataByMonth, null, false);
                    var keyArr = sortLargeObject(data['groupByProv']['capability_st']['cur']);
                    getChartsData(data['groupByProv']['capability_st']['cur'], null, dataByProv, keyArr, true);
                }

                chartdata.title = DetailTitleKey[key];
                var descriptionData = {
                    isUnPercent: true,
                    beginStr: '该业务实体厅均值为',
                    afterStr: ';该业务网厅均值为',
                    units: '秒',
                    unitsStr: '%',
                    toFixed: 2
                };
                getDescription(chartdata, dataByMonth, descriptionData);
                var stKeyArr = getSortArr(data['groupByProv']['capability_st']);
                if (key.indexOf('Payment') < 0 && key.indexOf('InfoChange') < 0) {
                    var wtKeyArr = getSortArr(data['groupByProv']['capability_wt']);
                    getChartsDataByObj(data['groupByProv']['capability_wt']['cur'], data['groupByProv']['capability_wt']['last'], rightRaise, wtKeyArr[wtKeyArr.length - 1].key, {
                        category: '网厅',
                        raise: true,
                        unit: 'second'
                    });
                    getChartsDataByObj(data['groupByProv']['capability_wt']['cur'], data['groupByProv']['capability_wt']['last'], rightDrop, wtKeyArr[0].key, {
                        category: '网厅',
                        raise: false,
                        unit: 'second'
                    });
                }
                getChartsDataByObj(data['groupByProv']['capability_st']['cur'], data['groupByProv']['capability_st']['last'], leftRaise, stKeyArr[stKeyArr.length - 1].key, {
                    category: '实厅',
                    raise: true,
                    unit: 'second'
                });
                getChartsDataByObj(data['groupByProv']['capability_st']['cur'], data['groupByProv']['capability_st']['last'], leftDrop, stKeyArr[0].key, {
                    category: '实厅',
                    raise: false,
                    unit: 'second'
                });
            } else if (key == 'ZC_03_KSF_02_01c_MON' || key == 'ZC_03_KSF_02_01e_MON' || key == 'ZC_03_KSF_01_03a_MON' || key == 'ZC_03_KSF_01_13_MON' || key == 'ZC_03_KSF_01_08_MON' || key == 'ZC_04_KSF_01_01a_MON' || key == 'ZC_04_KSF_01_01b_MON' || key == 'ZC_04_KSF_01_01e_MON' || key == 'ZC_04_KSF_01_01f_MON' || key == 'ZC_04_KSF_01_01c_MON' || key == 'ZC_04_KSF_01_01d_MON' || key == 'ZC_04_KSF_02_01_MON' || key == 'MO_04_KSF_02_08_01_MON' || key == 'ZC_04_KSF_02_03_MON' || key === 'ZC_04_KSF_02_02_MON' || key === 'ZC_04_KSF_02_04_MON') {
                getChartsData(data['groupByMonth'], null, dataByMonth, null, false);
                var keyArr = sortLargeObject(data['groupByProv']['cur']);
                getChartsData(data['groupByProv']['last'], data['groupByProv']['cur'], dataByProv, keyArr, true);
                var arr = dataByMonth.data[0];
                var curKeyArr;
                dataByProv.legendAverage = true;
                dataByProv.curData = arr[arr.length - 1];
                if (arr.length > 1) {
                    dataByProv.lastData = arr[arr.length - 2];
                }
                var unit1, unit2, unitValue, unitJudge; //unitJudge用来区分时长和百分比
                if (key == 'ZC_04_KSF_02_01_MON' || key == 'ZC_04_KSF_02_03_MON' || key == 'ZC_04_KSF_02_02_MON' || key == 'ZC_04_KSF_02_04_MON') {
                    unitJudge = false;
                    unit1 = '分钟';
                    unit2 = '%';
                    curKeyArr = getSortArr(data['groupByProv']);
                    unitValue = 'second';
                } else {
                    unitJudge = true;
                    unit1 = '%';
                    unit2 = '个百分点';
                    curKeyArr = getSortArr(data['groupByProv'], true);
                    unitValue = 'originpercent';
                };
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftRaise, curKeyArr[curKeyArr.length - 1].key, {
                    category: '',
                    raise: true,
                    unit: unitValue
                });
                getChartsDataByObj(data['groupByProv']['cur'], data['groupByProv']['last'], leftDrop, curKeyArr[0].key, {
                    category: '',
                    raise: false,
                    unit: unitValue
                });

                chartdata.title = DetailTitleKey[key];
                chartdata.description = '该指标均值为';
                var currentMonth = arr[arr.length - 1];
                chartdata.description += currentMonth + unit1;
                if (arr.length > 1) {
                    var lastMonth = (arr[arr.length - 2]).toFixed(2);
                    if (currentMonth > lastMonth) {
                        var value = unitJudge ? (currentMonth - lastMonth).toFixed(2) : ((currentMonth - lastMonth) * 100 / lastMonth).toFixed(2)
                        chartdata.description += ',环比增长' + value + unit2;
                    } else if (currentMonth < lastMonth) {
                        var value = unitJudge ? (lastMonth - currentMonth).toFixed(2) : ((lastMonth - currentMonth) * 100 / lastMonth).toFixed(2)
                        chartdata.description += ',环比减少' + value + unit2;
                    } else {
                        chartdata.description += ',与上期持平。';
                    }
                } else {
                    chartdata.description += '。';
                }
            } else if (key == 'InterruptIn' || key == 'InterruptOut') {
                chartdata.title = '中断业务中断情况';
                getMultiChartsData(data['groupByMonth'], dataByMonth);

                var keyArr = sortLargeObject(data['groupByProv'][0]);
                getChartsData(data['groupByProv'][0], null, dataByProv, keyArr, false);
                //descripton 部分代码,好长啊
                var recentMonth = [],
                    lastMonth = [];
                var recentMonthSum = 0,
                    lastMonthSum = 0,
                    index = 0,
                    largest = 0,
                    provName = '';
                for (var i = 0; i < dataByMonth.data.length; i++) {
                    var dataByI = dataByMonth.data[i];
                    recentMonth.push(dataByI[dataByI.length - 1]);
                    recentMonthSum += dataByI[dataByI.length - 1];
                    if (dataByI.length > 1) {
                        lastMonth.push(dataByI[dataByI.length - 2]);
                        lastMonthSum += dataByI[dataByI.length - 2];
                    }
                }
                chartdata.description = '客服渠道服务计划外中断' + recentMonthSum.toFixed(2) + '分钟，';
                if (recentMonthSum > lastMonthSum) {
                    chartdata.description += '环比增加' + (recentMonthSum - lastMonthSum).toFixed(2) + '分钟。';
                } else if (recentMonthSum < lastMonthSum) {
                    chartdata.description += '环比减少' + (lastMonthSum - recentMonthSum).toFixed(2) + '分钟。';
                } else {
                    chartdata.description += '与上期持平。';
                }
                for (var i = 0; i < recentMonth.length; i++) {
                    if (largest < recentMonth[i]) {
                        largest = recentMonth[i];
                        index = i;
                    }
                }
                chartdata.description += '中断时长最长的渠道是' + dataByMonth.legendData[index] + '，中断' + largest.toFixed(2) + '分钟。';
                largest = 0;
                for (var p in data['groupByProv'][0]) {
                    if (largest < data['groupByProv'][0][p]) {
                        largest = data['groupByProv'][0][p];
                        provName = p;
                    }
                }
                chartdata.description += '中断时长最长的省公司是' + provName + '，中断' + largest.toFixed(2) + '分钟。';
            }
            if (chartsParseConfig.dataByMonth.visiable) {
                chartdata.dataByMonth = dataByMonth;
            }
            if (chartsParseConfig.dataByProv.visiable) {
                chartdata.dataByProv = dataByProv;
            }
            if (chartsParseConfig.leftRaise.visiable) {
                chartdata.leftRaise = leftRaise;
            }
            if (chartsParseConfig.rightRaise.visiable) {
                chartdata.rightRaise = rightRaise;
            }
            if (chartsParseConfig.leftDrop.visiable) {
                chartdata.leftDrop = leftDrop;
            }
            if (chartsParseConfig.rightDrop.visiable) {
                chartdata.rightDrop = rightDrop;
            }
            if (angular.isDefined(chartsParseConfig.dataByCenter) && chartsParseConfig.dataByCenter.visiable) {
                chartdata.dataByCenter = dataByCenter;
            }
            return chartdata;
        }

        function getSortArr(data, isPercent) {
            var result = [];
            var loopArr = {};
            if (isEmptyObject(data.cur)) {
                loopArr = data.last;
            } else if (isEmptyObject(data.last)) {
                loopArr = data.cur;
            } else {
                loopArr = data.cur;
            }
            for (var key in loopArr) {
                var item = {};
                item.key = key;
                if (angular.isDefined(isPercent) && isPercent) {
                    item.value = (data.cur[key] || 0) - (data.last[key] || 0);
                } else {
                    item.value = ((data.cur[key] || 0) - (data.last[key] || 0)) / data.last[key];
                };
                result.push(item);
            }
            result.sort(function(a, b) {
                return a.value - b.value;
            });
            return result;
        }

        function getChartsDataByObj(cur, last, data, key, config) {
            data.data = [];
            data.xAxis = [];
            var curData = [];
            var lastData = [];

            curData.push(cur[key] || 0);
            lastData.push(last[key] || 0);
            data.data.push(lastData);
            data.data.push(curData);
            //省份编码转换
            if (angular.isDefined(config)) {
                var unit = '';
                // var denominator = 1;
                if (config.unit === 'wan') {
                    unit = '%';
                    // denominator = 1 / 10000;
                } else if (config.unit === 'percent') {
                    unit = '个百分点';
                    // denominator = 100;
                } else if (config.unit === 'originpercent') {
                    unit = '个百分点';
                    // denominator = 1;
                } else if (config.unit === 'second') {
                    unit = '%';
                } else if (config.unit === 'billion') {
                    unit = '%';
                }
                if (config.category != '') {
                    config.category += ':';
                }
                if (config.raise) {
                    if (config.unit === 'percent' || config.unit === 'originpercent') {
                        data.xAxis.push(config.category + provkey[key] + '\n增加' + ((cur[key] || 0) - (last[key] || 0)).toFixed(2) + unit);
                    } else {
                        data.xAxis.push(config.category + provkey[key] + '\n增加' + (((cur[key] || 0) - (last[key] || 0)) * 100 / last[key]).toFixed(2) + unit);
                    }
                } else {
                    if (config.unit === 'percent' || config.unit === 'originpercent') {
                        data.xAxis.push(config.category + provkey[key] + '\n减少' + ((last[key] || 0) - (cur[key] || 0)).toFixed(2) + unit);
                    } else {
                        data.xAxis.push(config.category + provkey[key] + '\n减少' + (((last[key] || 0) - (cur[key] || 0)) * 100 / last[key]).toFixed(2) + unit);
                    }
                }
            } else {
                data.xAxis.push(provkey[key]);
            }
        }

        function isEmptyObject(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }

        //获取横坐标为12个月或者省份的坐标轴数据
        function getChartsData(electroinc, physical, data, keyArr, isProv, isFinancial) {
            data.data = [];
            data.xAxis = [];
            if (angular.isDefined(isFinancial) && isFinancial) {
                data.isFinancial = true;
            }
            var electronicData = [];
            var physicalData = [];
            var xAxisArr;
            if (isEmptyObject(electroinc)) {
                xAxisArr = physical;
            } else {
                xAxisArr = electroinc;
            }
            if (keyArr == null || keyArr.length == 0) {
                for (var p in xAxisArr) {
                    if (isProv) {
                        data.xAxis.push(provkey[p]);
                    } else {
                        data.xAxis.push(p);
                    }
                    if (electroinc != null) {
                        electronicData.push(electroinc[p] || 0);
                    }
                    if (physical != null) {
                        physicalData.push(physical[p] || 0);
                    }
                }
            } else {
                for (var i = 0; i < keyArr.length; i++) {
                    if (isProv) {
                        data.xAxis.push(provkey[keyArr[i].key]);
                    } else {
                        data.xAxis.push(keyArr[i].key);
                    }
                    if (electroinc != null) {
                        electronicData.push(electroinc[keyArr[i].key] || 0);
                    }
                    if (physical != null) {
                        physicalData.push(physical[keyArr[i].key] || 0);
                    }
                }
            }
            data.data.push(electronicData);
            data.data.push(physicalData);
        }

        //中断月份的xAxis数组,因为会少数据,要处理
        function getMonth12(data) {
            var json = {};
            var arr = [];
            for (var k in data.IWP[0]) {
                json[k] = k;
                arr.push(k);
            }
            for (var k in data.short[0]) {
                if (angular.isUndefined(json[k])) {
                    json[k] = k;
                    arr.push(k);
                }
            }
            for (var k in data.network[0]) {
                if (angular.isUndefined(json[k])) {
                    json[k] = k;
                    arr.push(k);
                }
            }
            for (var k in data.physical[0]) {
                if (angular.isUndefined(json[k])) {
                    json[k] = k;
                    arr.push(k);
                }
            }
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    var vi = arr[i];
                    var vj = arr[j];
                    if (vi < vj) {
                        var temp = vi;
                        arr[i] = vj;
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }

        //获取横坐标为12个月或者省份的坐标轴数据
        function getMultiChartsData(electroinc, data) {
            data.data = [];
            data.xAxis = getMonth12(electroinc);
            var IWPArr = [],
                networkArr = [],
                physicalArr = [],
                shortArr = [];
            for (var p in data.xAxis) {
                IWPArr.push(electroinc.IWP[0][data.xAxis[p]] || 0);
                networkArr.push(electroinc.network[0][data.xAxis[p]] || 0);
                physicalArr.push(electroinc.physical[0][data.xAxis[p]] || 0);
                shortArr.push(electroinc.short[0][data.xAxis[p]] || 0);
            }
            data.data.push(physicalArr);
            data.data.push(networkArr);
            data.data.push(shortArr);
            data.data.push(IWPArr);
        }

        //对象里的value排序,从大到小
        function sortLargeObject(data) {
            var arr = [];
            for (var p in data) {
                var item = {};
                item.key = p;
                item.value = data[p];
                arr.push(item);
            }
            arr.sort(function(a, b) {
                return b.value - a.value;
            });
            return arr;
        }

        function getDescription(chartdata, dataByMonth, descriptionData) {
            chartdata.description = '';
            for (var i = 0; i < dataByMonth.data.length; i++) {
                var arr = dataByMonth.data[i];
                if (arr.length > 0) {
                    if (i == 0) {
                        chartdata.description += descriptionData.beginStr;
                    } else {
                        chartdata.description += descriptionData.afterStr;
                    }
                    chartdata.description += (arr[arr.length - 1]).toFixed(descriptionData.toFixed) + descriptionData.units;
                    if (arr.length > 1) {
                        if (arr[arr.length - 1] > arr[arr.length - 2]) {
                            if (angular.isUndefined(descriptionData.isUnPercent)) {
                                chartdata.description += ',环比增长了' + (arr[arr.length - 1] - arr[arr.length - 2]).toFixed(descriptionData.toFixed) + descriptionData.unitsStr;
                            } else {
                                chartdata.description += ',环比增长了' + ((arr[arr.length - 1] - arr[arr.length - 2]) * 100 / arr[arr.length - 2]).toFixed(descriptionData.toFixed) + descriptionData.unitsStr;
                            };

                        } else if (arr[arr.length - 1] < arr[arr.length - 2]) {
                            if (angular.isUndefined(descriptionData.isUnPercent)) {
                                chartdata.description += ',环比减少了' + (arr[arr.length - 2] - arr[arr.length - 1]).toFixed(descriptionData.toFixed) + descriptionData.unitsStr;
                            } else {
                                chartdata.description += ',环比减少了' + ((arr[arr.length - 2] - arr[arr.length - 1]) * 100 / arr[arr.length - 2]).toFixed(descriptionData.toFixed) + descriptionData.unitsStr;
                            }

                        } else {
                            chartdata.description += ',与上期持平';
                        }
                    }
                } else if (i == dataByMonth.data.length - 1) {
                    chartdata.description += '。';
                }
            }
            return chartdata.description;
        }

        return monthyDetailParseService;
    }]);

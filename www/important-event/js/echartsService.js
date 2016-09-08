'use strict';
angular.module('impApp')
    .factory('echartsService', ['echartsconfig', 'echartsColor', 'requestCode', '$state','$rootScope',function(echartsconfig, echartsColor, requestCode,$state,$rootScope) {
        var echartsService = {};

        function getDefaultOption() {
            return {
                title: {
                    text: '',
                    textStyle: {
                        color: '#000',
                        fontWeight: 'lighter',
                        fontSize: 15
                    },
                    top: 'top',
                    left: 'center'
                },
                tooltip: {
                    position: ['50%', '50%'],
                    formatter: "{a}<br>{b}:{c}"
                },
                legend: {
                    data: [''],
                    top: '1%'
                },
                grid: {
                    show: true,
                    left: '1%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    },
                    textStyle: {
                        fontSize: 10
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {}
                },
                series: [{
                    name: '',
                    type: 'bar',
                    data: []
                }]
            };
        }

        echartsService.importantEvent = [];
        // echartsService.chartsGenerate = function () {
        //   var chartIdObj = [];
        //   for (var i = 0; i < echartsconfig.length; i++) {
        //     chartIdObj[i] = {
        //       charts: echartsconfig[i].chartsconfig
        //     };
        //   }
        //   for (var i = 0; i < chartIdObj.length; i++) {
        //     var chartIds = chartIdObj[i].charts;
        //     for (var j = 0; j < chartIds.length; j++) {
        //       if (chartIds[j].type == 'pie') {
        //         getPieCharts(chartIds[j].chartId);
        //       } else {
        //         getCategoryCharts(chartIds[j].chartId);
        //       }
        //     }
        //   }
        // };
        //月报简版charts刷新
        echartsService.refreshDiv = function(elmId, data) {
            if (elmId == 'bearer-business-content') {
                refreshChartOption(echartsconfig[0], data);
            } else if (elmId == 'interrupt-business-content') {
                refreshChartOption(echartsconfig[1], data);
            } else if (elmId == 'client-sense-content') {
                refreshChartOption(echartsconfig[2], data);
            } else if (elmId == 'business-operate-content') {
                refreshChartOption(echartsconfig[3], data);
            } else if (elmId == 'system-operate-content') {
                refreshChartOption(echartsconfig[4], data);
            } else if (elmId == 'customer-complaint-content') {
                refreshChartOption(echartsconfig[5], data);
            } else if (elmId == 'point-complaint-content') {
                var stickConfig = {
                    chartId: 'complaint-pointbymonth-stickcharts',
                    formatter: 'wan',
                    legendTop: '8%',
                    gridTop: '40%',
                    isStack: true,
                    isComplaint: true,
                    title: '费用类投诉量按月统计'
                };
                var pieConfig = {
                    chartId: 'complaint-pointdistribution-piecharts',
                    outsideLabel: true,
                    formatter: 'value',
                    radius: '55%',
                    center: ['60%', '60%'],
                    title: '费用类投诉分布'
                };
                switch (data.requestCode) {
                    case requestCode.COMPLAINT_CHARGE_BYMONTH:
                        refreshStickChartOption(stickConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_CHARGE_DISTRIBUTION:
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_CHARGE_DISTRIBUTIONBYREASON:
                        pieConfig.title = '费用类投诉责任原因分布';
                        pieConfig.chartId = 'complaint-pointdistributionbyreason-piecharts';
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_4G_BYMONTH:
                        stickConfig.title = '4G业务投诉量按月统计';
                        stickConfig.chartId = 'complaint-4Gbymonth-stickcharts';
                        refreshStickChartOption(stickConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_4G_DISTRIBUTION:
                        pieConfig.title = '4G业务投诉分布';
                        pieConfig.chartId = 'complaint-4Gdistribution-piecharts';
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_4G_DISTRIBUTIONBYREASON:
                        pieConfig.title = '4G业务投诉责任原因分布';
                        pieConfig.chartId = 'complaint-4Gdistributionbyreason-piecharts';
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_GPRS_BYMONTH:
                        stickConfig.title = '流量业务投诉量按月统计';
                        stickConfig.chartId = 'complaint-GPRSbymonth-stickcharts';
                        refreshStickChartOption(stickConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_GPRS_DISTRIBUTION:
                        pieConfig.title = '流量业务投诉分布';
                        pieConfig.chartId = 'complaint-GPRSdistribution-piecharts';
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    case requestCode.COMPLAINT_GPRS_DISTRIBUTIONBYREASON:
                        pieConfig.title = '流量业务投诉责任原因分布';
                        pieConfig.chartId = 'complaint-GPRSdistributionbyreason-piecharts';
                        refreshPieChartOption(pieConfig, data.chartData[0]);
                        break;
                    default:
                        break;
                }
            } else if (elmId == '') {
                echartsService.importantEvent = data.rows;
            }
        };
        //生成详版全屏坐标系
        echartsService.generateHorizontalChart = function(chart, data) {
            var option = getDefaultOption();
            var series = [];
            for (var i = 0; i < data.legendData.length; i++) {
                var item = {};
                item.name = data.legendData[i];
                item.type = 'bar';
                item.data = data.data[i];
                series.push(item);
            }
            var yAxisName = getYAxisName(data.formatter);
            option.title.text = data.title;
            option.title.top = 'top';
            option.title.left = 'middle';
            option.legend.data = data.legendData;
            option.legend.top = '9%';
            option.left = 'middle';
            option.xAxis.data = data.xAxis;
            option.yAxis.name = yAxisName;
            option.series = series;
            if (data.formatter == 'percent' || data.formatter == 'originpercent') {
                setPercentYaxisOption(option, data.formatter, series);
            } else {
                option.yAxis.max = undefined;
                option.yAxis.min = undefined;
            }
            chart.setOption(option);
        };
        //月报简版chart刷新
        function refreshChartOption(arr, data) {
            var chartsconfig = arr.chartsconfig;
            // console.log(chartsconfig);
            for (var i = 0; i < chartsconfig.length; i++) {
                if (chartsconfig[i].type === "pie") {
                    refreshPieChartOption(chartsconfig[i], data[i]);
                } else {
                    refreshStickChartOption(chartsconfig[i], data[i]);
                }
            }
        }

        //月报简版饼状图chart刷新
        function refreshPieChartOption(config, data) {
            var pieChart = echarts.init(document.getElementById(config.chartId));
            pieChart.hideLoading();
            if (angular.isUndefined(data.data)) {
                data.data = [];
            }
            var legendData = [];
            for (var i = 0; i < data.data.length; i++) {
                legendData.push(data.data[i].name);
            }
            if (angular.isDefined(data.secondData)) {
                for (var i = 0; i < data.secondData.length; i++) {
                    legendData.push(data.secondData[i].name);
                }
            }
            var series = [];
            var innerItem = {
                name: '',
                type: 'pie',
                radius: '75%',
                center: ['60%', '55%'],
                label: {
                    normal: {
                        position: 'outside',
                        formatter: "{d}%" //标签内容格式器
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            var outterItem = {
                name: '',
                type: 'pie',
                radius: '65%',
                center: ['70%', '50%'],
                label: {
                    normal: {
                        position: 'outside', //文字在图标中的位置
                        formatter: "{d}%" //标签内容格式器
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            if (angular.isDefined(config.outsideLabel) && config.outsideLabel) {
                innerItem.label.normal.position = 'outside';
                outterItem.label.normal.position = 'outside';
            } else {
                innerItem.label.normal.position = 'inner';
                outterItem.label.normal.position = 'inner';
            }
            if (!angular.isDefined(data.secondData)) {
                innerItem.data = data.data;
                series.push(innerItem);
                if (angular.isDefined(config.radius)) {
                    innerItem.radius = config.radius;
                }
                if (angular.isDefined(config.center)) {
                    innerItem.center = config.center;
                }
            } else { //双饼图
                innerItem.radius = [0, '50%'];
                outterItem.radius = [0, "50%"];
                innerItem.center = ['33%', "65%"];
                outterItem.center = ['73%', "65%"];
                innerItem.data = data.data;
                outterItem.data = data.secondData;
                series.push(innerItem);
                series.push(outterItem);
            }
            var dataUnit = getPieUnit(config.formatter);
            var pieOption = {
                title: {
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    position: ['50%', '50%'],
                    formatter: "{a}{b}:<br> {c} " + dataUnit + " ({d}%)"
                },
                grid: {
                    top: '20%',
                    left: '1%',
                    right: '10%',
                    containLabel: true
                },
                legend: {
                    data: legendData
                },
                series: series,
                color: echartsColor.pie
            };
            if (angular.isDefined(config.title)) {
                pieOption.title.text = config.title;
            }
            if (angular.isDefined(config.legendX) && config.legendX == 'top') {
                pieOption.legend = {
                    //itemWidth: 10,
                    x: 'top',
                    //textStyle: {
                    //  fontSize: 3
                    //},
                    data: legendData
                };
            } else {
                pieOption.legend = {
                    //itemWidth: 10,
                    x: 'left',
                    y: 'middle',
                    orient: 'vertical',
                    //textStyle: {
                    //  fontSize: 6
                    //},
                    data: legendData
                };
            }
            pieChart.setOption(pieOption);
        }

        function generateCategoryOption(config, data) {
            if (angular.isUndefined(config)) {
                return getDefaultOption();
            };
            var option = getDefaultOption();
            option.legend.data = angular.copy(data.legendData);
            //横坐标去掉
            if (angular.isDefined(config.xAxixLabelShow) && !config.xAxixLabelShow) {
                option.xAxis.axisLabel.show = false;
            } else {
                option.xAxis.axisLabel.show = true;
            }
            // option.yAxis.name = getYAxisName(config.formatter);
            // option.yAxis.nameGap = 2;
            //如果是简版或者详版的增加幅度
            if (config.isSimple || angular.isDefined(config.raise)) {
                option.tooltip.formatter = '{a}:<br>{c}';
            }
            if (angular.isDefined(config.raise)) {
                //如果是增降幅,颜色单独设置
                if (config.raise) {
                    option.color = echartsColor.raise;
                } else {
                    option.color = echartsColor.drop;
                }
            } else {
                option.color = echartsColor.stick;
            }
            if (angular.isDefined(config.legendTop)) {
                option.legend.top = config.legendTop;
            }
            if (angular.isDefined(config.gridBottom)) {
                option.grid.bottom = config.gridBottom;
            } else {
                option.grid.bottom = '5%';
            }
            if (angular.isDefined(config.gridTop)) {
                option.grid.top = config.gridTop;
            }
            if (angular.isDefined(config.gridLeft)) {
                option.grid.left = config.gridLeft;
            }
            if (angular.isDefined(config.isProv) && config.isProv) {
                option.dataZoom = [{
                    show: true,
                    startValue: 0,
                    endValue: 10,
                    handleSize: 0
                }, {
                    type: 'inside',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                }];
                option.grid.bottom = '15%';
            }
            if (angular.isDefined(config.rotate)) {
                option.xAxis.axisLabel.rotate = config.rotate;
            } else {
                if (angular.isDefined(config.orient)) {
                    option.yAxis.axisLabel.rotate = 45;
                    option.xAxis.axisLabel.rotate = 45;
                } else {
                    option.xAxis.axisLabel.rotate = 30;
                }
            }
            return option;
        }

        echartsService.refreshStickChartOption = function(config, data) {
            refreshStickChartOption(config, data);
        }

        //月报简版柱状图chart刷新
        function refreshStickChartOption(config, data) {
            var stickChart = echarts.init(document.getElementById(config.chartId));
            stickChart.hideLoading();
            var yAxisName = getYAxisName(config.formatter);
            var legendData;
            if (angular.isDefined(data.legendData)) {
                legendData = data.legendData;
            }
            if (angular.isUndefined(data.data)) {
                data.data = [];
            }
            if (angular.isUndefined(data.series)) {
                data.series = [];
            }
            var stickOption = generateCategoryOption(config, data);
            if (angular.isDefined(config.title)) {
                stickOption.title.text = config.title;
            };
            stickOption.legend.data = legendData;
            stickOption.xAxis.data = data.data;
            stickOption.yAxis.name = yAxisName;
            stickOption.yAxis.nameGap = 2;
            stickOption.series = data.series;
            stickOption.tooltip.formatter = '{a}:<br>{c}';
            //横坐标去掉
            // if (angular.isDefined(config.xAxixLabelShow) && !config.xAxixLabelShow) {
            //   stickOption.xAxis.axisLabel.show = false;
            // } else {
            //   stickOption.xAxis.axisLabel.show = true;
            // }
            if (config.formatter == 'percent' || config.formatter == 'originpercent') {
                setPercentYaxisOption(stickOption, config.formatter, data.series);
            } else {
                stickOption.yAxis.max = undefined;
                stickOption.yAxis.min = undefined;
            }
            if (angular.isDefined(config) && angular.isDefined(config.orient)) {
                //横向坐标系
                stickOption.yAxis = {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        splitLine: {
                            show: false
                        }
                    },
                    textStyle: {
                        fontSize: 10
                    }
                };
                stickOption.yAxis.data = data.data;
                stickOption.xAxis = {
                    type: 'value',
                    axisLabel: {
                        rotate: 45
                    },
                    splitLine: {
                        show: false
                    }
                };
                stickOption.xAxis.name = yAxisName;
            }
            // if (angular.isDefined(config.gridBottom)) {
            //   stickOption.grid.bottom = config.gridBottom;
            // } else {
            //   stickOption.grid.bottom = '5%';
            // }
            // if (angular.isDefined(config.isProv) && config.isProv) {
            //   stickOption.dataZoom = [{
            //     show: true,
            //     startValue: 0,
            //     endValue: 10,
            //     handleSize: 0
            //   }, {
            //     type: 'inside',
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 1,
            //     end: 35
            //   }];
            //   stickOption.grid.bottom = '15%';
            // } else {
            //   stickOption.dataZoom = undefined;
            // }
            if (angular.isDefined(config.isStack) && config.isStack) {
                for (var i = 0; i < data.series.length; i++) {
                    stickOption.series[i].stack = '总量';
                    //堆叠图不显示数值
                    stickOption.series[i].label = {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    };
                    stickOption.series[i].barMaxWidth = 28;
                }
                var item = {};
                //item.stack = '总量';
                item.name = '总量';
                item.type = 'line';
                item.label = {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                };
                if (angular.isDefined(config.isComplaint)) {
                    item.label.normal.show = false;
                }
                item.data = new Array(stickOption.xAxis.data.length);
                for (var i = 0; i < stickOption.xAxis.data.length; i++) {
                    item.data[i] = 0;
                    var len = data.legendData.length;
                    if (angular.isDefined(config.isComplaint)) {
                        len = len - 1;
                    };
                    for (var j = 0; j < len; j++) {
                        if (angular.isDefined(data.series[j].data) && angular.isDefined(data.series[j].data[i])) {
                            item.data[i] += data.series[j].data[i] || 0;
                        } else {
                            item.data[i] += 0;
                        }
                    }
                }
                stickOption.legend.data.push(item.name);
                stickOption.series.push(item);
            } else {
                //数值显示在条形图条形上方
                var position = 'top';
                //如果转向了，数字的位置也要变化
                if (angular.isDefined(config.orient)) {
                    position = 'right';
                };
                for (var i = 0; i < data.series.length; i++) {
                    stickOption.series[i].label = {
                        normal: {
                            show: true,
                            position: position
                        }
                    }
                    stickOption.series[i].barMaxWidth = 28;
                }
            }
            if (angular.isDefined(config.isDoubleYaxis) && config.isDoubleYaxis) { //双坐标轴
                stickOption.yAxis = [{
                    type: 'value',
                    name: '件',
                    nameGap: 8
                }, {
                    type: 'value',
                    name: '客户原因:件',
                    nameGap: 8
                }];
                data.series[1].yAxisIndex = 1;
            }
            // console.log(stickOption);
            stickOption.color = echartsColor.stick;
            // if (angular.isDefined(config) && angular.isDefined(config.rotate)) {
            //   stickOption.xAxis.axisLabel.rotate = config.rotate;
            // } else {
            //   stickOption.xAxis.axisLabel.rotate = 30;
            // }

            stickOption.title.subtext = undefined;
            // stickOption.legend.top = '1%';
            stickOption.subtextStyle = undefined;
            stickChart.setOption(stickOption);
            stickChart.on('click', function(param) {
                param.chartId = config.chartId;
                $rootScope.$broadcast('detailclick', param);
            });
        }

        //生成月报详版坐标系
        function generateMonthyDetailChart(chart, data, config) {
            var option = generateCategoryOption(config, data);
            if (angular.isUndefined(option)) {
                return;
            }
            if (angular.isUndefined(data.data)) {
                return;
            }
            var series = [];
            // option.legend.data = [];
            // for (var i = 0; i < data.legendData.length; i++) {
            //   option.legend.data.push(data.legendData[i]);
            // }
            for (var i = 0; i < data.legendData.length; i++) {
                var item = {};
                item.name = data.legendData[i];
                item.type = 'bar';
                if (angular.isDefined(config) && config.isStack) {
                    item.stack = '总量';
                }
                item.barMaxWidth = 28;
                item.data = data.data[i];
                if (angular.isDefined(config) && config.label) {
                    item.label = {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    };
                }
                series.push(item);
            }
            if (angular.isDefined(config) && config.isStack) {
                var item = {};
                item.stack = '总时长';
                item.name = '总时长';
                item.type = 'line';
                item.label = {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                };
                item.data = new Array(data.xAxis.length);
                for (var i = 0; i < data.xAxis.length; i++) {
                    item.data[i] = 0;
                    for (var j = 0; j < data.legendData.length; j++) {
                        if (angular.isDefined(series[j].data) && angular.isDefined(series[j].data[i])) {
                            item.data[i] += series[j].data[i] || 0;
                        } else {
                            item.data[i] += 0;
                        }
                    }
                }
                option.legend.data.push(item.name);
                series.push(item);
            }
            // if (angular.isDefined(config) && angular.isDefined(config.raise)) {
            //   //如果是增降幅,tooltip也要单独设置
            //   option.tooltip.formatter = '{a}:<br>{c}';
            //   //如果是增降幅,颜色单独设置
            //   if (config.raise) {
            //     option.color = echartsColor.raise;
            //   } else {
            //     option.color = echartsColor.drop;
            //   }
            // } else {
            //   option.color = echartsColor.stick;
            // }
            var yAxisName = getYAxisName(data.formatter);
            //如果是百分百需要截纵坐标
            option.title.text = data.title;
            // if (angular.isDefined(config) && angular.isDefined(config.legendTop)) {
            //   option.legend.top = config.legendTop;
            //   option.grid.top = '25%';
            // }
            if (angular.isDefined(data.legendAverage) && data.legendAverage) {
                var arr = new Array(2);
                arr[0] = data.lastData;
                arr[1] = data.curData;
                for (var i = 0; i < 2; i++) {
                    var item = {};
                    item.data = [];
                    item.type = 'line';
                    for (var j = 0; j < series[i].data.length; j++) {
                        item.data.push(arr[i]);
                    }
                    item.name = series[i].name + '平均值:' + arr[i];
                    option.legend.data.push(item.name);
                    series.push(item);
                }
            }
            if (angular.isDefined(config) && angular.isDefined(config.orient)) {
                //横向坐标系
                option.yAxis = {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        rotate: 45
                    },
                    textStyle: {
                        fontSize: 10
                    }
                };
                option.yAxis.data = data.xAxis;
                option.xAxis = {
                    type: 'value',
                    axisLabel: {}
                };
                option.xAxis.name = yAxisName;
            } else {
                // option.xAxis = {
                //   type: 'category',
                //   axisLabel: {
                //     interval: 0,
                //     rotate: 45
                //   }
                // };
                option.xAxis.data = data.xAxis;
                if (angular.isDefined(data.isFinancial) && data.isFinancial) { //财务系统是双坐标轴
                    option.yAxis = [{
                        type: 'value',
                        name: '用户数:万',
                        nameGap: 8
                    }, {
                        type: 'value',
                        name: '工单量:亿',
                        nameGap: 8
                    }];
                    series[1].yAxisIndex = 1;
                } else {
                    option.yAxis = {
                        type: 'value',
                        axisLabel: {}
                    };
                    option.yAxis.name = yAxisName;
                    option.yAxis.nameGap = 2;
                }
                if (angular.isDefined(config) && config.label) {
                    //如果是增幅降幅,不显示Y轴
                    option.yAxis.axisLabel.show = false;
                    option.grid.left = '-5%';
                } else {
                    option.grid.left = '3%';
                }
            }
            if (data.formatter == 'percent' || data.formatter == 'originpercent') {
                setPercentYaxisOption(option, data.formatter, series);
            }
            // if (angular.isDefined(config) && angular.isDefined(config.isProv) && config.isProv) {
            //   option.dataZoom = [{
            //     show: true,
            //     startValue: 0,
            //     endValue: 10,
            //     handleSize: 0
            //   }, {
            //     type: 'inside',
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 1,
            //     end: 35
            //   }];
            //   option.grid.bottom = '15%';
            // } else {
            //   //非省份,下面空隙要小
            //   option.grid.bottom = '5%';
            //   option.dataZoom = undefined;
            // }
            // if (angular.isDefined(config) && angular.isDefined(config.rotate)) {
            //   option.xAxis.axisLabel.rotate = config.rotate;
            // } else {
            //   if (angular.isDefined(config) && angular.isDefined(config.orient)) {
            //     option.yAxis.axisLabel.rotate = 30;
            //   } else {
            //     option.xAxis.axisLabel.rotate = 30;
            //   }
            // }
            if (angular.isDefined(data.config)) {
                if (angular.isDefined(data.config.gridBottom)) {
                    option.grid.bottom = data.config.gridBottom;
                }
                if (angular.isDefined(data.config.gridLeft)) {
                    option.grid.left = data.config.gridLeft;
                }
                if (angular.isDefined(data.config.rotate)) {
                    option.xAxis.axisLabel.rotate = data.config.rotate;
                }
                if (angular.isDefined(data.config.legendTop)) {
                    option.legend.top = data.config.legendTop;
                }
            }
            option.series = series;
            chart.setOption(option);
        }

        function setPercentYaxisOption(option, formatter, series) {
            option.yAxis.max = 100;
            option.yAxis.scale = true;
            var min = 100;
            var max = 0;
            for (var i = 0; i < series.length; i++) {
                var arr = series[i].data;
                for (var j = 0; j < arr.length; j++) {
                    if (min > arr[j]) {
                        min = arr[j];
                    }
                    if (max < arr[j]) {
                        max = arr[j];
                    }
                }
            }
            min -= 0.1;
            max += 0.015;
            if (max < 100) {
                max = max.toFixed(2);
            } else {
                max = 100;
            }
            if (min > 0) {
                min = min.toFixed(2);
            } else {
                min = 0;
            }
            option.yAxis.min = min;
            option.yAxis.max = max;
        }

        function getYAxisName(value) {
            var yAxisName;
            if (value == 'billion') {
                yAxisName = '亿';
            } else if (value == 'percent') {
                yAxisName = '%';
            } else if (value == 'value') {
                yAxisName = '';
            } else if (value == 'wan') {
                yAxisName = '万';
            } else if (value == 'minute') {
                yAxisName = '分';
            } else if (value == 'second') {
                yAxisName = '秒';
            } else if (value == 'originpercent') {
                yAxisName = '%';
            } else if (value == 'wanpercent') {
                yAxisName = '万分之';
            } else if (value == 'ci') {
                yAxisName = '次';
            } else if (value == 'jian') {
                yAxisName = '件';
            } else {
                yAxisName = '';
            }
            return yAxisName;
        }

        function getPieUnit(formatter) {
            if ('billion' == formatter) {
                return '亿';
            } else if ('value' == formatter) {
                return '';
            } else if ('wan' == formatter) {
                return '万';
            } else if ('minute' == formatter) {
                return '分';
            } else {
                return '';
            }
        }

        echartsService.refreshTemplate = function(index, data, $scope) {

            $scope.monthShow = true;
            $scope.centerShow = true;
            $scope.provShow = true;
            $scope.raise_leftShow = true;
            $scope.raise_rightShow = true;
            $scope.drop_leftShow = true;
            $scope.drop_rightShow = true;
            switch (index) {
                case 0:
                    try {
                        $scope.description = '';
                        $scope.detailTitle = '';
                        var month_chart = echarts.init(document.getElementById('month-chart'));
                        var prov_chart = echarts.init(document.getElementById('prov-chart'));
                        var raise_leftcharts = echarts.init(document.getElementById('raise-leftcharts'));
                        var raise_rightcharts = echarts.init(document.getElementById('raise-rightcharts'));
                        var drop_leftcharts = echarts.init(document.getElementById('drop-leftcharts'));
                        var drop_rightcharts = echarts.init(document.getElementById('drop-rightcharts'));
                        var center_charts = echarts.init(document.getElementById('center-chart'));
                        month_chart.setOption(getDefaultOption());
                        prov_chart.setOption(getDefaultOption());
                        raise_leftcharts.setOption(getDefaultOption());
                        raise_rightcharts.setOption(getDefaultOption());
                        drop_leftcharts.setOption(getDefaultOption());
                        drop_rightcharts.setOption(getDefaultOption());
                        center_charts.setOption(getDefaultOption());
                    } catch (exception) {
                        // console.log(exception);
                    }
                    break;
                case 1:
                    //除中断以外的详版
                    var month_chart = echarts.init(document.getElementById('month-chart'));
                    var prov_chart = echarts.init(document.getElementById('prov-chart'));


                    if (angular.isDefined(data.leftRaise)) {
                        var raise_leftcharts = echarts.init(document.getElementById('raise-leftcharts'));
                        generateMonthyDetailChart(raise_leftcharts, data.leftRaise, { rotate: 0, label: true, raise: true });
                    } else {
                        $scope.raise_leftShow = false;
                    }
                    if (angular.isDefined(data.rightRaise)) {
                        var raise_rightcharts = echarts.init(document.getElementById('raise-rightcharts'));
                        generateMonthyDetailChart(raise_rightcharts, data.rightRaise, { rotate: 0, label: true, raise: true });
                    } else {
                        $scope.raise_rightShow = false;
                    }
                    if (angular.isDefined(data.leftDrop)) {
                        var drop_leftcharts = echarts.init(document.getElementById('drop-leftcharts'));
                        generateMonthyDetailChart(drop_leftcharts, data.leftDrop, { rotate: 0, label: true, raise: false });
                    } else {
                        $scope.drop_leftShow = false;
                    }

                    if (angular.isDefined(data.rightDrop)) {
                        var drop_rightcharts = echarts.init(document.getElementById('drop-rightcharts'));
                        generateMonthyDetailChart(drop_rightcharts, data.rightDrop, { rotate: 0, label: true, raise: false });
                    } else {
                        $scope.drop_rightShow = false;
                    }
                    generateMonthyDetailChart(month_chart, data.dataByMonth);
                    generateMonthyDetailChart(prov_chart, data.dataByProv, { isProv: true, provName: $scope.userInfo.provName });
                    if (angular.isDefined(data.dataByCenter)) {
                        $scope.centerShow = true;
                        var center_charts = echarts.init(document.getElementById('center-chart'));
                        generateMonthyDetailChart(center_charts, data.dataByCenter, { orient: 'vertical' });
                    } else {
                        $scope.centerShow = false;
                    }
                    break;
                case 2:
                    //中断的详版
                    $scope.centerShow = false;
                    var month_chart = echarts.init(document.getElementById('month-chart'));
                    var prov_chart = echarts.init(document.getElementById('prov-chart'));
                    if (angular.isDefined(data.leftRaise)) {
                        var raise_leftcharts = echarts.init(document.getElementById('raise-leftcharts'));
                        generateMonthyDetailChart(raise_leftcharts, data.leftRaise);
                    } else {
                        $scope.raise_leftShow = false;
                    }
                    if (angular.isDefined(data.rightRaise)) {
                        var raise_rightcharts = echarts.init(document.getElementById('raise-rightcharts'));
                        generateMonthyDetailChart(raise_rightcharts, data.rightRaise);
                    } else {
                        $scope.raise_rightShow = false;
                    }
                    if (angular.isDefined(data.leftDrop)) {
                        var drop_leftcharts = echarts.init(document.getElementById('drop-leftcharts'));
                        generateMonthyDetailChart(drop_leftcharts, data.leftDrop);
                    } else {
                        $scope.drop_leftShow = false;
                    }
                    if (angular.isDefined(data.rightDrop)) {
                        var drop_rightcharts = echarts.init(document.getElementById('drop-rightcharts'));
                        generateMonthyDetailChart(drop_rightcharts, data.rightDrop);
                    } else {
                        $scope.drop_rightShow = false;
                    }
                    generateMonthyDetailChart(month_chart, data.dataByMonth, { isStack: true, legendTop: '12%' });
                    generateMonthyDetailChart(prov_chart, data.dataByProv, { isProv: true, provName: $scope.userInfo.provName });
                    break;
                default:
                    break;
            }
        };
        return echartsService;
    }])

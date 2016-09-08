'use strict';
angular.module('impApp')
    .constant('requestCode', {
        COMPLAINT_SUM_BYMONTH: 39,
        COMPLAINT_CHARGE_BYMONTH: 40,
        COMPLAINT_CHARGE_DISTRIBUTION: 41,
        COMPLAINT_CHARGE_DISTRIBUTIONBYREASON: 42,
        COMPLAINT_4G_BYMONTH: 43,
        COMPLAINT_4G_DISTRIBUTION: 44,
        COMPLAINT_4G_DISTRIBUTIONBYREASON: 45,
        COMPLAINT_GPRS_BYMONTH: 46,
        COMPLAINT_GPRS_DISTRIBUTION: 47,
        COMPLAINT_GPRS_DISTRIBUTIONBYREASON: 48
    })
    .constant('echartsconfig', [{
        elmId: 'bearer-business-content',
        chartsconfig: [{
            chartId: 'operate-piecharts',
            type: 'pie',
            formatter: 'wan',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'operate-stickcharts',
            formatter: 'billion',
            type: 'category',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'billing-piecharts',
            type: 'pie',
            legendX: 'top',
            outsideLabel: true,
            formatter: 'billion',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'billing-stickcharts1',
            type: 'category',
            formatter: 'billion',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'billing-stickcharts2',
            type: 'category',
            formatter: 'billion',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'finaniel-piecharts',
            type: 'pie',
            formatter: 'billion',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'finaniel-stickcharts',
            type: 'category',
            formatter: 'billion',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'finaniel2-piecharts',
            type: 'pie',
            formatter: 'billion',
            legendX: 'top',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'finaniel2-stickcharts',
            type: 'category',
            formatter: 'billion',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }]
    }, {
        elmId: 'interrupt-business-content',
        chartsconfig: [{
            chartId: 'interlevel-piecharts',
            type: 'pie',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'interlevel-stickcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            formatter: 'ci',
            isProv: true,
            isStack: true,
            yAxix: []
        }, {
            chartId: 'intercause-piecharts',
            type: 'pie',
            outsideLabel: true,
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'intercause-stickcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            formatter: 'ci',
            isProv: true,
            isStack: true,
            yAxix: []
        }, {
            chartId: 'intertime-piecharts',
            type: 'pie',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'intertime-stickcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            formatter: 'minute',
            isProv: true,
            isStack: true,
            yAxix: []
        }, {
            chartId: 'interincause-piecharts',
            type: 'pie',
            outsideLabel: true,
            xAxix: [],
            yAxix: []

        }, {
            chartId: 'interincause-stickcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            formatter: 'ci',
            isProv: true,
            isStack: true,
            yAxix: []
        }, {
            chartId: 'interinchannel-piecharts',
            type: 'pie',
            outsideLabel: true,
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'interinchannel-stickcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            formatter: 'minute',
            isProv: true,
            isStack: true,
            yAxix: []
        }]
    }, {
        elmId: 'client-sense-content',
        chartsconfig: [{
            chartId: 'essentialbussiness-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'percent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'pricequery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'percent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_pricequery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'second',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'billquery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'percent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_billquery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'second',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'detailquery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'percent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_detailquery-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'second',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'materialquery-stickcharts',
            type: 'category',
            formatter: 'percent',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_materialquery-stickcharts',
            type: 'category',
            formatter: 'second',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'payment-stickcharts',
            type: 'category',
            formatter: 'percent',
            rotate: 0,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_payment-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'second',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'materialchange-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'percent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 't_materialchange-stickcharts',
            type: 'category',
            rotate: 0,
            formatter: 'second',
            xAxix: ['上期', '本期'],
            yAxix: []
        }]
    }, {
        elmId: 'business-operate-content',
        chartsconfig: [{
            chartId: '5minute-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            rotate: 0,
            xAxixLabelShow: false,
            yAxix: []
        }, {
            chartId: '10minute-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            rotate: 0,
            xAxixLabelShow: false,
            yAxix: []
        }, {
            chartId: 'qianfei-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            rotate: 0,
            xAxixLabelShow: false,
            yAxix: []
        }, {
            chartId: 'gprs-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            rotate: 0,
            xAxixLabelShow: false,
            yAxix: []
        }, {
            chartId: 'daozhang-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            rotate: 0,
            xAxixLabelShow: false,
            yAxix: []
        }, {
            chartId: 'remind-pay-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'remind-bank-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'remind-hlr-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'remind-kefu-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'remind-msn-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'remind-online-stickcharts',
            type: 'category',
            formatter: 'originpercent',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'dealtime-huafei-stickcharts',
            type: 'category',
            formatter: 'minute',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'dealtime-kaiji-stickcharts',
            type: 'category',
            formatter: 'minute',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'dealtime-tingji-stickcharts',
            type: 'category',
            formatter: 'minute',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'dealtime-gfkaiji-stickcharts',
            type: 'category',
            formatter: 'minute',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }, {
            chartId: 'dealtime-gftingji-stickcharts',
            type: 'category',
            formatter: 'minute',
            xAxixLabelShow: false,
            rotate: 0,
            yAxix: []
        }]
    }, {
        elmId: 'system-operate-content',
        chartsconfig: [{
            chartId: 'hostcapability-stickcharts',
            type: 'category',
            formatter: 'percent',
            rotate: 0,
            xAxixLabelShow: false,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'dbcapability-stickcharts',
            type: 'category',
            formatter: 'percent',
            rotate: 0,
            xAxixLabelShow: false,
            xAxix: ['上期', '本期'],
            yAxix: []
        }]
    }, {
        elmId: 'customer-complaint-content',
        chartsconfig: [{
            chartId: 'businesscomplaint-stickcharts',
            type: 'category',
            formatter: 'jian',
            rotate: 0,
            xAxixLabelShow: false,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'complaintpercent-stickcharts',
            type: 'category',
            formatter: 'wanpercent',
            rotate: 0,
            xAxixLabelShow: false,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'complaintdeal-stickcharts',
            type: 'category',
            formatter: 'minute',
            rotate: 0,
            xAxixLabelShow: false,
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'complaintrecall-stickcharts',
            type: 'category',
            rotate: 0,
            xAxixLabelShow: false,
            formatter: 'originpercent',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            chartId: 'pointcomplaint-piecharts',
            type: 'pie',
            legendX: 'top',
            xAxix: [],
            yAxix: []
        }, {
            chartId: 'mainreason-piecharts',
            type: 'pie',
            legendX: 'top',
            xAxix: [],
            yAxix: []
        }]
    }])
    .constant('echartsDetail', [{
        index: 0,
        modal: 'horizontal',
        url: 'important-event/templates/chart-horizontal.html',
        chartsconfig: [{
            chartId: 'chart-horizontal',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }]

    }, {
        index: 1,
        modal: 'bearer',
        url: 'important-event/templates/bearer-detail.html',
        chartsconfig: [{
            chartId: 'month-chart',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            hartId: 'prov-chart',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            hartId: 'raise-leftcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            hartId: 'raise-rightcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            hartId: 'drop-leftcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }, {
            hartId: 'drop-rightcharts',
            type: 'category',
            xAxix: ['上期', '本期'],
            yAxix: []
        }]
    }])
    .constant('monthyParseData', [{
        elmId: '',
        dataArr: 'importantEvents',
        route: '/all/decr?pageCur=1&pageSize=5&date='
    }, {
        elmId: 'bearer-business-content',
        dataArr: 'bearerBusinessarr',
        route: '/bearer/all/all/month?date='
    }, {
        elmId: 'interrupt-business-content',
        dataArr: 'interruptdataarr',
        route: '/interrupt/all/month?date='
    }, {
        elmId: 'client-sense-content',
        dataArr: 'clientsensearr',
        route: '/detect/all/month?date='
    }, {
        elmId: 'business-operate-content',
        dataArr: 'businessoperatearr',
        route: '/opreation/all/month?date='
    }, {
        elmId: 'system-operate-content',
        dataArr: 'systemoperatearr',
        route: '/system/usability/month?date='
    }, {
        elmId: 'customer-complaint-content',
        dataArr: 'complaintarr',
        route: '/complaint/all/month?date='
    }, {
        elmId: 'point-complaint-content',
        dataArr: 'pointconlaintarr',
        routes: [{
            requestCodeName: 'COMPLAINT_SUM_BYMONTH',
            route: '/point/all/sum?date='
        }, {
            requestCodeName: 'COMPLAINT_CHARGE_BYMONTH',
            route: '/point/cost/combination?date='
        }, {
            requestCodeName: 'COMPLAINT_CHARGE_DISTRIBUTION',
            route: '/point/cost/pie?date='
        }, {
            requestCodeName: 'COMPLAINT_CHARGE_DISTRIBUTIONBYREASON',
            route: '/point/cost/histogram?date='
        }, {
            requestCodeName: 'COMPLAINT_4G_BYMONTH',
            route: '/point/4g/combination?date='
        }, {
            requestCodeName: 'COMPLAINT_4G_DISTRIBUTION',
            route: '/point/4g/pie?date='
        }, {
            requestCodeName: 'COMPLAINT_4G_DISTRIBUTIONBYREASON',
            route: '/point/4g/histogram?date='
        }, {
            requestCodeName: 'COMPLAINT_GPRS_BYMONTH',
            route: '/point/flow/combination?date='
        }, {
            requestCodeName: 'COMPLAINT_GPRS_DISTRIBUTION',
            route: '/point/flow/pie?date='
        }, {
            requestCodeName: 'COMPLAINT_GPRS_DISTRIBUTIONBYREASON',
            route: '/point/flow/histogram?date='
        }]
    }])

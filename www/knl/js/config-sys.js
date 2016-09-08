'use strict';
if(!config){
    var config = angular.module('config',['ionic']);
}
config.constant('sysTypes', [{
    name: 'BOSS系统',
    ID: '112',
    child: [{
            name: '产品管理',
            ID: '32'
        }, {
            name: '服务开通',
            ID: '33'
        }, {
            name: '综合采集',
            ID: '34'
        }, {
            name: '融合控制',
            ID: '35'
        }, {
            name: '融合计费',
            ID: '36'
        }, {
            name: '综合账务',
            ID: '37'
        }, {
            name: '综合结算',
            ID: '38'
        }, {
            name: '合作伙伴管理',
            ID: '39'
        }, {
            name: '基础管理',
            ID: '40'
        }, {
            name: '统计报表',
            ID: '41'
        }, {
            name: '一级BOSS',
            ID: '42'
        }, {
            name: '局数据管理与发布',
            ID: '43'
        }, {
            name: '信息管理',
            ID: '44'
        }, {
            name: '采集预处理',
            ID: '45'
        }, {
            name: '其它',
            ID: '46'
        }

    ]
}, {
    name: 'CRM系统',
    ID: '113',
    child: [{
        name: '市场营销',
        ID: '47'
    }, {
        name: '销售管理',
        ID: '48'
    }, {
        name: '渠道管理',
        ID: '49'
    }, {
        name: '客户服务',
        ID: '50'
    }, {
        name: '客户管理',
        ID: '51'
    }, {
        name: '资源管理',
        ID: '52'
    }, {
        name: '产品管理',
        ID: '53'
    }, {
        name: '系统管理',
        ID: '54'
    }, {
        name: '其它',
        ID: '55'
    }]
}, {
    name: 'BASS系统',
    ID: '114',
    child: [{
        name: 'BASS系统',
        ID: '114'
    }]
}, {
    name: '容灾系统',
    ID: '115',
    child: [{
        name: '容灾系统',
        ID: '115'
    }]
}, {
    name: 'BOMC系统',
    ID: '116',
    child: [{
        name: '集中控制中心',
        ID: '147'
    }, {
        name: '综合运营门户',
        ID: '148'
    }, {
        name: '监控管理中心',
        ID: '149'
    }, {
        name: '业务管理中心',
        ID: '150'
    }, {
        name: '运维管理中心',
        ID: '151'
    }, {
        name: '运营分析中心',
        ID: '152'
    }, {
        name: '资源管理',
        ID: '153'
    }, {
        name: '指标管理',
        ID: '154'
    }, {
        name: '知识管理',
        ID: '155'
    }, {
        name: '云管理',
        ID: '156'
    }, {
        name: '控制平台',
        ID: '157'
    }, {
        name: '采集平台',
        ID: '158'
    }]
}, {
    name: 'P-BOSS系统',
    ID: '117',
    child: [{
        name: 'P-BOSS系统',
        ID: '117'
    }]
}, {
    name: '其他系统',
    ID: '118',
    child: [{
        name: '其他系统',
        ID: '118'
    }]
}, {
    name: 'VGOP系统',
    ID: '160',
    child: [{
        name: 'VGOP系统',
        ID: '160'
    }]
}, {
    name: 'ESOP系统',
    ID: '161',
    child: [{
        name: 'ESOP系统',
        ID: '161'
    }]
}, {
    name: '4A系统',
    ID: '162',
    child: [{
        name: '4A系统',
        ID: '162'
    }]
}, {
    name: 'SMP系统',
    ID: '163',
    child: [{
        name: 'SMP系统',
        ID: '163'
    }]
}]);
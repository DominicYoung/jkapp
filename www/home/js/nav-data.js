angular.module('homeApp')
    .constant('navData', [{
        label: '首页',
        state: 'home',
    name:'tab-home',
        items: []
    }, {
        label: '知识共享',
        state: 'knl',
    name:'tab-knl',
        items: []
    }, {
        label: '掌上网管',
        state: 'management',
    name:'tab-management',
        items: []
    }, {
        label: '考核',
        state: 'assess',
    name:'tab-assess',
        items: []
    },{
        label: '我的',
        state: 'user',
    name:'tab-user',
        items: []
    }]);

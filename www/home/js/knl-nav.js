'use strict';
angular.module('homeApp')
    .constant('knlNav', [{
        id: 0,
        label: '经验案例',
        state: 'case',
        ion: 'ion-ios-compose-outline',
        active: false
    }, {
        id: 2,
        label: '技术文档',
        state: 'doc',
        ion: 'ion-ios-book-outline',
        active: false
    }, {
        id: 1,
        label: '问答园地',
        state: 'question',
        ion: 'ion-help',
        active: false
    }, {
        id: 4,
        label: '已知问题',
        state: 'problem',
        ion: 'ion-information',
        active: false
    },{
        id: 3,
        label: '词条',
        state: 'vocabular',
        ion: 'ion-ios-paper-outline',
        active: false
    }]);
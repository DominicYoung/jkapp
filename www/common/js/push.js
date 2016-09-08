'use strict';
angular.module('push', ['ionic', 'ngCordova']).factory('Push', function() {
    var push;
    var onGetRegistrationID = function(data) {
        try {
            console.info('push:registrationID:' + data);
        } catch(e){
            console.log(e);
        }
    };
    return {
        setBadge: function(badge) {
            if (push) {
                console.log('jpush: set badge', badge);
                push.setBadge(badge);
            }
        },
        setAlias: function(alias) {
            if (push) {
                console.log('jpush: set alias', alias);
                push.setAlias(alias);
            }
        },
        check: function() {
            if (window.jpush && push) {
                push.receiveNotificationIniOSCallback(window.jpush);
                window.jpush = null;
            }
        },
        init: function(notificationCallback) {
            console.log('jpush: start init-----------------------');
            console.log(ionic.Platform.platform());
            push = window.plugins && window.plugins.jPushPlugin;
            if (push) {
                console.log('jpush: init');
                push.init();
                push.getRegistrationID(onGetRegistrationID);
                push.setDebugMode(true);
                push.openNotificationInAndroidCallback = notificationCallback;
                push.receiveNotificationIniOSCallback = notificationCallback;
            }
        }
    };
});
"use strict";

angular.module('investApp', ['ionic', 'ngCordova','commonDirective'])
    .run(['$ionicPlatform', '$rootScope', '$location', '$timeout', '$ionicHistory', '$ionicPopup',
        function($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $ionicPopup) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                };
            });

        }
    ]);
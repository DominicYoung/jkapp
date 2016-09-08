'use strict';
angular.module('impApp')
    .directive('subShow', ['$ionicScrollDelegate', function($ionicScrollDelegate) {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            replace: true,
            // scope: {
            // 	elmId: '=elmId',
            // 	hcb : '&hideCallBack',
            // 	scb : '&showCallBack'
            // },
            link: function($scope, iElm, iAttrs, controller) {
                var subElm = iElm.next();
                iElm.on('click', function(event) {
                    if (subElm.css('display') === 'none' || subElm.css('display') === '') {
                        // console.log(scope.elmId);
                        // $scope.scb(subElm.attr('id'));
                        goToTop();
                        $scope.$emit('elmId', subElm.attr('id'));
                        subElm.css('display', 'block');
                    } else {
                        subElm.css('display', 'none');
                    }
                });

                function goToTop() {
                    var scrollElm = angular.element(document.getElementsByTagName('ion-content')[0] || document.getElementsByTagName('ion-scroll')[0]);

                    var delegateHandle = scrollElm.attr('delegate-handle');

                    var scrollToTop = iElm[0].scrollTop + iElm[0].offsetTop;
                    // console.log($ionicScrollDelegate.$getByHandle(delegateHandle).scrollTop());
                    $ionicScrollDelegate.$getByHandle(delegateHandle).scrollTo(0, scrollToTop, true);
                }
            }
        };
    }]);
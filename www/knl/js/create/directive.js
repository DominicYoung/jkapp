'use strict';

createApp.directive('mySelect', ['$parse', function($parse) {
	// Runs during compile
	return {
		priority: 11,
		restrict: 'AE',
		scope: {
			lists: '=lists',
			choiceObj: '=choiceObj'
		},
		template: '<div class="pst-re" ng-mouseleave="selectShow = false">' 
					+ '<input ng-click="selectShow = true" ng-model="choiceObj.name" is-list="lists" filter-arr="listFilter">' 
					+ '<div data-is-show = "selectShow" class="select-list" data-multi-radiu data-box-datas="listFilter" data-check-data="choiceObj">' 
					+ '</div>' 
					+ '</div>',
		replace: false,
		transclude: true,
		controller: function($scope, $element, $attrs, $transclude) {
			var listsParse = $parse($attrs.lists),
				lists = listsParse($scope.$parent),
				choiceObjParse = $parse($attrs.choiceObj);

			function findObj(arr, name) {
				if (!angular.isArray(arr)) {
					throw new Error('findObj need arrary arguments!');
					return;
				}
				var hasChild = angular.isArray(arr[0].child),
					found = null;
				if (hasChild) {
					for (var i = 0, il = arr.length; i < il; i++) {
						if (found) {
							return found;
						}
					}
				} else {
					for (var i = 0,il = arr.length; i < il; i++) {
						if (arr[i].name === name || arr[i].name === angular.uppercase(name)) {
							var choiceObj = angular.copy(arr[i]);
							return choiceObjParse.assign($scope.$parent, choiceObj);
						}
					}
				}
				return;
			}
			this.findObj = findObj;
		},
		compile: function(tElement, tAttrs, transclude) {
			var inputModel = tElement.find('input')[0],
				listModel = tElement.children('.select-list');
			inputModel.setAttribute('name', tAttrs.name);
			return function link(scope) {

			};
		}
	};
}]);
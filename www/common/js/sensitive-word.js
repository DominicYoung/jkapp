'use strict';
/**
 * module......sensitiveWord
 * 进行敏感词查找。
 *
 * USE
 *  
 * APP
 * module('',['sensitiveWord'])
 * CONTROLLER
 * controller('',['sensitiveServ',function(sensitiveServ)
 *{
 *  sensitiveServ.sensitiveFn(sensitiveWord,content); 
 *}
 * ])
 * 
 * 
 * 
 */
angular.module('sensitiveWord',[])
.factory('sensitiveServ', function($http) {
	var factory = {
		senstWords : []
	};
	var baseUrl = window.localStorage['baseUrl'],
        url = baseUrl + 'rest/sensitive/list/content';
	$http.get(url).success(function(data){
		factory.senstWords = data;
	});
	/**
	 * [buildMap 生成敏感词图形]
	 * @param  {[array]} wordList [敏感词数组]
	 * @return {[type]}          [返回生成的敏感词图形]
	 */
	function buildMap(wordList) {
		var result = {},
			count = wordList.length;
		for (var i = 0; i < count; ++i) {
			var map = result;
			var word = wordList[i];
			for (var j = 0; j < word.length; ++j) {
				var ch = word.charAt(j);
				if (typeof(map[ch]) != "undefined") {
					map = map[ch];
					console.log('formap: ' + map);
					if (map["empty"]) {
						break;
					}
				} else {
					if (map["empty"]) {
						delete map["empty"];
					}
					map[ch] = {
						"empty": true
					};
					map = map[ch];
				}
			}
		}
		return result;
	};
	/**
	 * [check 根据敏感词首字符，开始敏感词匹配，返回匹配结果]
	 * @param  {[object]} map     [敏感词地图]
	 * @param  {[string]} content [文本内容]
	 * @return {[boolean]}         [匹配结果]
	 */
	function check(map, content) {
		var result = false,
		    point = map,
			count = content.length;
			if(count === 0){
				return result;
			}
		for (var i = 0; i < count; ++i) {
			var ch = content.charAt(i);
			var item = point[ch];
			if (typeof(item) == "undefined") {
				continue;
			} else if (item["empty"]) {
				result = true;
				return result;
			} else {
				point = item;
			}
		}
		return result;
	};
	/**
	 * [sensitiveFn 敏感词匹配]
	 * @param  {[string]} content         [文本内容]
	 * @return {[boolean]}                 [有敏感词返回true]
	 */
	factory.sensitiveFn = function (content) {
			var map = buildMap(factory.senstWords.sort());
			var has_sen = check(map, content);
			console.log(has_sen);
			return has_sen;
		};
	return factory;
})
.directive('hasSensitive', ['sensitiveServ','$ionicPopup', '$timeout', function(sensitiveServ, $ionicPopup, $timeout){
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function($scope, iElm, attrs, ngModel) {
			$scope.$watch(attrs.ngModel, function(n) {
				if(!n) return;
				var str = n;
				if(sensitiveServ.sensitiveFn(str)){
					ngModel.$setValidity('hasSensitive',false);
				    var alertPopup = $ionicPopup.alert({
					     title: '敏感词',
					     template: '当前信息包含敏感词，请修改！'
					   });
					   alertPopup.then(function(res) {
					        $timeout(function() {
							    alertPopup.close();
							}, 2000);
					   });
				}else{
					ngModel.$setValidity('hasSensitive',true);
				}
		    });
		}
	};
}]);
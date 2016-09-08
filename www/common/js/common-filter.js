'use strict';

/**
 * 常用的过滤，
 * to_trusted 对数据安全性的过滤，转化为HTML显示
 * 
 * hide_html  过滤html标签 不显示标签
 * 
 * 
 * 
 */
angular.module('commonFilter',[])
	.filter('to_trusted', ['$sce',
		function($sce) {
			return function(data) {
				return  $sce.trustAsHtml(data);
			};
		}
	])
	.filter('hide_html',function(){
		return function(data){
			var HTML_REGEXP = new RegExp('</{0,1}[^>]+>','g');
			return data.replace(HTML_REGEXP,'').replace(/\&lt;/g,'<').replace(/\&gt;/g,'>');
		};
	});
	